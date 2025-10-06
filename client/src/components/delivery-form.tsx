import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
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
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { toast } = useToast();

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

    const deliveryFee = 15;
    const serviceFee = 2.5;
    const total = deliveryFee + serviceFee;

    const packageSizeText = packageSize === 'small' ? 'Small (< 5 lbs)' : packageSize === 'medium' ? 'Medium (5-20 lbs)' : packageSize === 'large' ? 'Large (20-50 lbs)' : 'Extra Large (50+ lbs)';

    const mapLink = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;

    const message = `🚚 *NEW DELIVERY REQUEST*

📍 *Pickup Location:*
${pickupLocation}

📍 *Delivery Location:*
${userLocation.address}

🗺️ *View on Map:*
${mapLink}

📦 *Item Description:*
${itemDescription}

📏 *Package Size:* ${packageSizeText}

${specialInstructions ? `📝 *Special Instructions:*\n${specialInstructions}\n\n` : ''}💰 *Fees:*
• Delivery Fee: $${deliveryFee.toFixed(2)}
• Service Fee: $${serviceFee.toFixed(2)}
• Total: $${total.toFixed(2)}`;

    const whatsappNumber = '96171294697';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: "Opening WhatsApp",
      description: "Your delivery details are ready to send!",
    });

    setPickupLocation("");
    setItemDescription("");
    setSpecialInstructions("");
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
                  $15.00
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-semibold" data-testid="text-service-fee">
                  $2.50
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Estimated Total</span>
                  <span className="text-3xl font-black gradient-text" data-testid="text-total">
                    $17.50
                  </span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-primary text-primary-foreground hover:shadow-cyan-glow-lg transition-all text-lg font-bold"
              data-testid="button-submit-delivery"
            >
              Start Delivery
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
