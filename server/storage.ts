import { type User, type InsertUser, type Driver, type InsertDriver, type Delivery, type InsertDelivery } from "@shared/schema";
import { randomUUID } from "crypto";

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

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private drivers: Map<string, Driver>;
  private deliveries: Map<string, Delivery>;

  constructor() {
    this.users = new Map();
    this.drivers = new Map();
    this.deliveries = new Map();

    // Initialize with sample drivers
    this.initializeDrivers();
  }

  private initializeDrivers() {
    const sampleDrivers: InsertDriver[] = [
      { name: "Marcus Johnson", phone: "+1234567890" },
      { name: "Sarah Kim", phone: "+1234567891" },
      { name: "David Lee", phone: "+1234567892" },
    ];

    sampleDrivers.forEach(driver => {
      const id = randomUUID();
      this.drivers.set(id, {
        ...driver,
        id,
        rating: "5.00",
        isActive: "true",
        currentLocation: {
          lat: 37.7749 + (Math.random() - 0.5) * 0.1,
          lng: -122.4194 + (Math.random() - 0.5) * 0.1,
        },
        createdAt: new Date(),
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      currentLocation: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserLocation(userId: string, location: { lat: number; lng: number; address: string; accuracy: number }): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, currentLocation: location };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, stripeCustomerId, stripeSubscriptionId };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getDriver(id: string): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }

  async getAllActiveDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values()).filter(driver => driver.isActive === "true");
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const id = randomUUID();
    const driver: Driver = {
      ...insertDriver,
      id,
      rating: "5.00",
      isActive: "true",
      currentLocation: null,
      createdAt: new Date(),
    };
    this.drivers.set(id, driver);
    return driver;
  }

  async updateDriverLocation(driverId: string, location: { lat: number; lng: number }): Promise<Driver> {
    const driver = this.drivers.get(driverId);
    if (!driver) throw new Error("Driver not found");
    
    const updatedDriver = { ...driver, currentLocation: location };
    this.drivers.set(driverId, updatedDriver);
    return updatedDriver;
  }

  async getDelivery(id: string): Promise<Delivery | undefined> {
    return this.deliveries.get(id);
  }

  async getDeliveriesByUser(userId: string): Promise<Delivery[]> {
    return Array.from(this.deliveries.values())
      .filter(delivery => delivery.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getActiveDeliveriesByUser(userId: string): Promise<Delivery[]> {
    return Array.from(this.deliveries.values())
      .filter(delivery => delivery.userId === userId && !['delivered', 'cancelled'].includes(delivery.status))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getDeliveriesByDriver(driverId: string): Promise<Delivery[]> {
    return Array.from(this.deliveries.values())
      .filter(delivery => delivery.driverId === driverId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createDelivery(insertDelivery: InsertDelivery): Promise<Delivery> {
    const id = randomUUID();
    const now = new Date();
    const delivery: Delivery = {
      ...insertDelivery,
      id,
      status: "pending",
      driverId: null,
      estimatedDeliveryTime: null,
      actualDeliveryTime: null,
      createdAt: now,
      updatedAt: now,
    };
    this.deliveries.set(id, delivery);
    return delivery;
  }

  async updateDeliveryStatus(deliveryId: string, status: string, driverId?: string): Promise<Delivery> {
    const delivery = this.deliveries.get(deliveryId);
    if (!delivery) throw new Error("Delivery not found");
    
    const updatedDelivery = {
      ...delivery,
      status,
      driverId: driverId || delivery.driverId,
      updatedAt: new Date(),
    };
    
    this.deliveries.set(deliveryId, updatedDelivery);
    return updatedDelivery;
  }

  async updateDeliveryDriver(deliveryId: string, driverId: string): Promise<Delivery> {
    const delivery = this.deliveries.get(deliveryId);
    if (!delivery) throw new Error("Delivery not found");
    
    const updatedDelivery = {
      ...delivery,
      driverId,
      status: "assigned",
      estimatedDeliveryTime: new Date(Date.now() + 11 * 60 * 1000), // 11 minutes from now
      updatedAt: new Date(),
    };
    
    this.deliveries.set(deliveryId, updatedDelivery);
    return updatedDelivery;
  }
}

export const storage = new MemStorage();
