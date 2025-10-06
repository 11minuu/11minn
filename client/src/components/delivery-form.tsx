import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Store, MapPin, Package, MessageSquare } from "lucide-react";

interface DeliveryFormProps {
  userLocation: {
    lat: number;
    lng: number;
    address: string;
    accuracy: number;
  } | null;
}

export default function DeliveryForm({ userLocation }: DeliveryFormProps) {
  const [pickupLocation, setPickupLocation] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [packageSize, setPackageSize] = useState("small");
  const [urgency, setUrgency] = useState("express");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deliveryMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/deliveries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Delivery Requested",
        description: "Your delivery has been submitted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/deliveries"] });
      // Reset form
      setPickupLocation("");
      setItemDescription("");
      setSpecialInstructions("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location services first",
        variant: "destructive",
      });
      return;
    }

    const fees = {
      express: { delivery: 15, service: 2.5 },
      standard: { delivery: 10, service: 2 },
      economy: { delivery: 7, service: 1.5 },
    };

    const selectedFees = fees[urgency as keyof typeof fees];
    const total = selectedFees.delivery + selectedFees.service;

    deliveryMutation.mutate({
      pickupLocation: {
        lat: 37.7749,
        lng: -122.4194,
        address: pickupLocation,
      },
      deliveryLocation: {
        lat: userLocation.lat,
        lng: userLocation.lng,
        address: userLocation.address,
      },
      itemDescription,
      packageSize,
      urgency,
      specialInstructions,
      deliveryFee: selectedFees.delivery.toString(),
      serviceFee: selectedFees.service.toString(),
      totalAmount: total.toString(),
    });
  };

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 gradient-text">Request a Delivery</h2>
          <p className="text-xl text-muted-foreground">Tell us what you need, and we'll get it to you in 11 minutes</p>
        </div>

        <div className="bg-card rounded-2xl shadow-cyan-glow p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center">
                <Store className="text-primary mr-2" size={20} />
                Pickup Location
              </label>
              <Input
                type="text"
                placeholder="Enter store or address"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="bg-input border-border"
                required
                data-testid="input-pickup-location"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center">
                <MapPin className="text-primary mr-2" size={20} />
                Delivery Location
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={userLocation ? `${userLocation.address} (GPS Locked)` : "Please enable location"}
                  className="bg-input border-primary font-semibold pr-12"
                  readOnly
                  data-testid="input-delivery-location"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-primary rounded-full tracking-dot"></div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center">
                <Package className="text-primary mr-2" size={20} />
                What do you need delivered?
              </label>
              <Textarea
                rows={4}
                placeholder="Describe the item(s) you need delivered. Be as specific as possible..."
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                className="bg-input border-border resize-none"
                required
                data-testid="textarea-item-description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Package Size</label>
                <Select value={packageSize} onValueChange={setPackageSize}>
                  <SelectTrigger className="bg-input border-border" data-testid="select-package-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (&lt; 5 lbs)</SelectItem>
                    <SelectItem value="medium">Medium (5-20 lbs)</SelectItem>
                    <SelectItem value="large">Large (20-50 lbs)</SelectItem>
                    <SelectItem value="xlarge">Extra Large (50+ lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Urgency</label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger className="bg-input border-border" data-testid="select-urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="express">11 MIN Express - $15</SelectItem>
                    <SelectItem value="standard">30 MIN Standard - $10</SelectItem>
                    <SelectItem value="economy">1 HOUR Economy - $7</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center">
                <MessageSquare className="text-primary mr-2" size={20} />
                Special Instructions (Optional)
              </label>
              <Input
                type="text"
                placeholder="e.g., Ring doorbell twice, leave at door, etc."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="bg-input border-border"
                data-testid="input-special-instructions"
              />
            </div>

            <div className="bg-secondary bg-opacity-50 rounded-xl p-6 border border-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-semibold" data-testid="text-delivery-fee">
                  ${urgency === 'express' ? '15.00' : urgency === 'standard' ? '10.00' : '7.00'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-semibold" data-testid="text-service-fee">
                  ${urgency === 'express' ? '2.50' : urgency === 'standard' ? '2.00' : '1.50'}
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Estimated Total</span>
                  <span className="text-3xl font-black gradient-text" data-testid="text-total">
                    ${urgency === 'express' ? '17.50' : urgency === 'standard' ? '12.00' : '8.50'}
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={deliveryMutation.isPending}
              className="w-full py-6 bg-primary text-primary-foreground hover:shadow-cyan-glow-lg transition-all text-lg font-bold"
              data-testid="button-submit-delivery"
            >
              {deliveryMutation.isPending ? "Submitting..." : "Request Delivery Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
