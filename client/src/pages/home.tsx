import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import LocationModal from "@/components/location-modal";
import HeroSection from "@/components/hero-section";
import DeliveryForm from "@/components/delivery-form";
import LiveTracking from "@/components/live-tracking";
import OrderDashboard from "@/components/order-dashboard";
import Footer from "@/components/footer";
import { wsClient } from "@/lib/websocket";

export default function Home() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  } | null>(null);

  useEffect(() => {
    // Connect WebSocket for real-time updates
    wsClient.connect();

    return () => {
      wsClient.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation userLocation={userLocation} />
      
      {!locationGranted && (
        <LocationModal
          onLocationGranted={(location) => {
            setUserLocation(location);
            setLocationGranted(true);
          }}
        />
      )}

      <HeroSection userLocation={userLocation} />
      
      <DeliveryForm userLocation={userLocation} />
      
      <LiveTracking />
      
      <OrderDashboard />
      
      <Footer />
    </div>
  );
}
