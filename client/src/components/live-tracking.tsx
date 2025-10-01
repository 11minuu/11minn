import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { wsClient } from "@/lib/websocket";
import { Phone, MessageCircle, Star, MapPin, Plus, Minus, Crosshair } from "lucide-react";

export default function LiveTracking() {
  const [driverLocation, setDriverLocation] = useState({ lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    const handleDriverUpdate = (data: any) => {
      if (data.type === 'driver_location') {
        setDriverLocation({ lat: data.lat, lng: data.lng });
      }
    };

    wsClient.on('driver_location', handleDriverUpdate);

    return () => {
      wsClient.off('driver_location', handleDriverUpdate);
    };
  }, []);

  return (
    <section id="tracking" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 gradient-text">Track Your Delivery</h2>
          <p className="text-xl text-muted-foreground">Real-time updates with centimeter-level precision</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-cyan-glow overflow-hidden">
            <div className="h-[500px] bg-secondary relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-6xl text-primary mb-4 opacity-50 mx-auto" size={80} />
                  <p className="text-muted-foreground">Map integration</p>
                  <p className="text-sm text-muted-foreground mt-2">Real-time tracking active</p>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-cyan-glow tracking-dot">
                    <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                    </svg>
                  </div>
                  <div className="absolute top-0 left-0 w-12 h-12 bg-primary rounded-full opacity-30 animate-ping"></div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <Button size="icon" className="w-10 h-10 bg-card hover:bg-secondary shadow-lg" data-testid="button-zoom-in">
                  <Plus size={20} />
                </Button>
                <Button size="icon" className="w-10 h-10 bg-card hover:bg-secondary shadow-lg" data-testid="button-zoom-out">
                  <Minus size={20} />
                </Button>
                <Button size="icon" className="w-10 h-10 bg-card hover:bg-secondary shadow-lg" data-testid="button-recenter">
                  <Crosshair size={20} />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-secondary bg-opacity-50 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full tracking-dot"></div>
                  <span className="text-sm font-semibold">High-Precision GPS Active</span>
                </div>
                <span className="text-xs text-muted-foreground">Accuracy: ±0.5m</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-cyan-glow">
              <h3 className="text-xl font-bold mb-4" data-testid="text-order-number">Order #11245</h3>
              
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-black">
                  MJ
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg" data-testid="text-driver-name">Marcus Johnson</div>
                  <div className="text-sm text-muted-foreground">Your driver</div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-primary" size={12} fill="currentColor" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">5.0</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary bg-opacity-10 rounded-xl p-4 mb-6">
                <div className="text-sm text-muted-foreground mb-1">Estimated arrival</div>
                <div className="text-4xl font-black gradient-text" data-testid="text-eta">8 min</div>
                <div className="text-sm text-muted-foreground mt-1">2.3 miles away</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold">Order Confirmed</div>
                    <div className="text-xs text-muted-foreground">2:45 PM</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center tracking-dot">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-primary">En Route</div>
                    <div className="text-xs text-muted-foreground">Currently delivering</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-secondary hover:bg-muted" data-testid="button-call-driver">
                  <Phone className="mr-2" size={16} />
                  Call
                </Button>
                <Button className="bg-secondary hover:bg-muted" data-testid="button-message-driver">
                  <MessageCircle className="mr-2" size={16} />
                  Message
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-cyan-glow">
              <h3 className="text-lg font-bold mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">Our support team is available 24/7</p>
              <Button className="w-full bg-primary text-primary-foreground hover:shadow-cyan-glow" data-testid="button-contact-support">
                <Phone className="mr-2" size={16} />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
