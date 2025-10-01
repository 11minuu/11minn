import { db } from "./db";
import { drivers } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const sampleDrivers = [
    { name: "Marcus Johnson", phone: "+1234567890" },
    { name: "Sarah Kim", phone: "+1234567891" },
    { name: "David Lee", phone: "+1234567892" },
  ];

  for (const driver of sampleDrivers) {
    await db.insert(drivers).values({
      ...driver,
      currentLocation: {
        lat: 37.7749 + (Math.random() - 0.5) * 0.1,
        lng: -122.4194 + (Math.random() - 0.5) * 0.1,
      },
    }).onConflictDoNothing();
  }

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
