import { type User, type InsertUser, type Driver, type InsertDriver, type Delivery, type InsertDelivery, users, drivers, deliveries } from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, notInArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLocation(userId: string, location: { lat: number; lng: number; address: string; accuracy: number }): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;

  // Driver operations
  getDriver(id: string): Promise<Driver | undefined>;
  getAllActiveDrivers(): Promise<Driver[]>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriverLocation(driverId: string, location: { lat: number; lng: number }): Promise<Driver>;

  // Delivery operations
  getDelivery(id: string): Promise<Delivery | undefined>;
  getDeliveriesByUser(userId: string): Promise<Delivery[]>;
  getActiveDeliveriesByUser(userId: string): Promise<Delivery[]>;
  getDeliveriesByDriver(driverId: string): Promise<Delivery[]>;
  createDelivery(delivery: InsertDelivery): Promise<Delivery>;
  updateDeliveryStatus(deliveryId: string, status: string, driverId?: string): Promise<Delivery>;
  updateDeliveryDriver(deliveryId: string, driverId: string): Promise<Delivery>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserLocation(userId: string, location: { lat: number; lng: number; address: string; accuracy: number }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ currentLocation: location })
      .where(eq(users.id, userId))
      .returning();
    
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId, 
        stripeSubscriptionId 
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!user) throw new Error("User not found");
    return user;
  }

  // Driver operations
  async getDriver(id: string): Promise<Driver | undefined> {
    const [driver] = await db.select().from(drivers).where(eq(drivers.id, id));
    return driver || undefined;
  }

  async getAllActiveDrivers(): Promise<Driver[]> {
    return await db
      .select()
      .from(drivers)
      .where(eq(drivers.isActive, true));
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const [driver] = await db
      .insert(drivers)
      .values(insertDriver)
      .returning();
    return driver;
  }

  async updateDriverLocation(driverId: string, location: { lat: number; lng: number }): Promise<Driver> {
    const [driver] = await db
      .update(drivers)
      .set({ currentLocation: location })
      .where(eq(drivers.id, driverId))
      .returning();
    
    if (!driver) throw new Error("Driver not found");
    return driver;
  }

  // Delivery operations
  async getDelivery(id: string): Promise<Delivery | undefined> {
    const [delivery] = await db.select().from(deliveries).where(eq(deliveries.id, id));
    return delivery || undefined;
  }

  async getDeliveriesByUser(userId: string): Promise<Delivery[]> {
    return await db
      .select()
      .from(deliveries)
      .where(eq(deliveries.userId, userId))
      .orderBy(desc(deliveries.createdAt));
  }

  async getActiveDeliveriesByUser(userId: string): Promise<Delivery[]> {
    return await db
      .select()
      .from(deliveries)
      .where(
        and(
          eq(deliveries.userId, userId),
          notInArray(deliveries.status, ['delivered', 'cancelled'])
        )
      )
      .orderBy(desc(deliveries.createdAt));
  }

  async getDeliveriesByDriver(driverId: string): Promise<Delivery[]> {
    return await db
      .select()
      .from(deliveries)
      .where(eq(deliveries.driverId, driverId))
      .orderBy(desc(deliveries.createdAt));
  }

  async createDelivery(insertDelivery: InsertDelivery): Promise<Delivery> {
    const [delivery] = await db
      .insert(deliveries)
      .values({
        ...insertDelivery,
        specialInstructions: insertDelivery.specialInstructions || null,
      })
      .returning();
    return delivery;
  }

  async updateDeliveryStatus(deliveryId: string, status: string, driverId?: string): Promise<Delivery> {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };
    
    if (driverId) {
      updateData.driverId = driverId;
    }

    const [delivery] = await db
      .update(deliveries)
      .set(updateData)
      .where(eq(deliveries.id, deliveryId))
      .returning();
    
    if (!delivery) throw new Error("Delivery not found");
    return delivery;
  }

  async updateDeliveryDriver(deliveryId: string, driverId: string): Promise<Delivery> {
    const [delivery] = await db
      .update(deliveries)
      .set({
        driverId,
        status: "assigned",
        estimatedDeliveryTime: new Date(Date.now() + 11 * 60 * 1000), // 11 minutes from now
        updatedAt: new Date(),
      })
      .where(eq(deliveries.id, deliveryId))
      .returning();
    
    if (!delivery) throw new Error("Delivery not found");
    return delivery;
  }
}

export const storage = new DatabaseStorage();
