import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertDeliverySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time tracking
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'driver_location_update') {
          // Update driver location
          await storage.updateDriverLocation(data.driverId, {
            lat: data.lat,
            lng: data.lng,
          });

          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'driver_location',
                driverId: data.driverId,
                lat: data.lat,
                lng: data.lng,
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  // Delivery endpoints
  app.post("/api/deliveries", async (req, res) => {
    try {
      const validation = insertDeliverySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          message: fromZodError(validation.error).toString(),
        });
      }

      const delivery = await storage.createDelivery(validation.data);

      // Auto-assign available driver
      const drivers = await storage.getAllActiveDrivers();
      if (drivers.length > 0) {
        const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
        await storage.updateDeliveryDriver(delivery.id, randomDriver.id);
      }

      res.json(delivery);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/deliveries/:id", async (req, res) => {
    try {
      const delivery = await storage.getDelivery(req.params.id);
      if (!delivery) {
        return res.status(404).json({ message: "Delivery not found" });
      }

      // Include driver info if assigned
      let driverInfo = null;
      if (delivery.driverId) {
        driverInfo = await storage.getDriver(delivery.driverId);
      }

      res.json({ ...delivery, driver: driverInfo });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/deliveries/user/:userId", async (req, res) => {
    try {
      const deliveries = await storage.getDeliveriesByUser(req.params.userId);
      res.json(deliveries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/deliveries/user/:userId/active", async (req, res) => {
    try {
      const deliveries = await storage.getActiveDeliveriesByUser(req.params.userId);
      
      // Enrich with driver info
      const enrichedDeliveries = await Promise.all(
        deliveries.map(async (delivery) => {
          if (delivery.driverId) {
            const driver = await storage.getDriver(delivery.driverId);
            return { ...delivery, driver };
          }
          return delivery;
        })
      );

      res.json(enrichedDeliveries);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/deliveries/:id/status", async (req, res) => {
    try {
      const { status, driverId } = req.body;
      const delivery = await storage.updateDeliveryStatus(req.params.id, status, driverId);
      res.json(delivery);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // User endpoints
  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/users/:id/location", async (req, res) => {
    try {
      const { lat, lng, address, accuracy } = req.body;
      const user = await storage.updateUserLocation(req.params.id, {
        lat,
        lng,
        address,
        accuracy,
      });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe subscription endpoint
  app.post('/api/get-or-create-subscription', async (req, res) => {
    try {
      const { userId, email, username } = req.body;

      if (!userId || !email) {
        return res.status(400).json({ message: "User ID and email are required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId, {
          expand: ['latest_invoice.payment_intent'],
        });
        const invoice = subscription.latest_invoice as any;
        const paymentIntent = invoice?.payment_intent;

        return res.json({
          subscriptionId: subscription.id,
          clientSecret: paymentIntent?.client_secret || null,
        });
      }

      const customer = await stripe.customers.create({
        email: email,
        name: username || email,
      });

      // Create subscription with price from env or use a default price
      const priceId = process.env.STRIPE_PRICE_ID || 'price_1234567890'; // Replace with actual price ID
      
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      await storage.updateUserStripeInfo(userId, customer.id, subscription.id);

      const invoice = subscription.latest_invoice as any;
      const paymentIntent = invoice.payment_intent;

      res.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      return res.status(400).json({ error: { message: error.message } });
    }
  });

  // Stripe payment intent for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Driver endpoints
  app.get("/api/drivers", async (req, res) => {
    try {
      const drivers = await storage.getAllActiveDrivers();
      res.json(drivers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/drivers/:id", async (req, res) => {
    try {
      const driver = await storage.getDriver(req.params.id);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.json(driver);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
