import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle } from "lucide-react";

export default function OrderDashboard() {

  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4 gradient-text">Why Choose 11MIN?</h2>
          <p className="text-xl text-muted-foreground">Ultra-fast delivery right to your location</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-8 hover-lift text-center">
            <div className="flex justify-center mb-4">
              <Clock className="text-primary" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Get your items delivered in just 11 minutes with our express service
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 hover-lift text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-primary" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">GPS Tracking</h3>
            <p className="text-muted-foreground">
              High-precision location ensures your delivery arrives exactly where you are
            </p>
          </div>

          <div className="bg-card rounded-xl p-8 hover-lift text-center">
            <div className="flex justify-center mb-4">
              <Plus className="text-primary" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Simple Process</h3>
            <p className="text-muted-foreground">
              Just fill the form and send your request via WhatsApp - it's that easy
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            className="bg-primary text-primary-foreground hover:shadow-cyan-glow px-8 py-6 text-lg" 
            data-testid="button-new-delivery"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Plus className="mr-2" size={20} />
            Start Your Delivery Now
          </Button>
        </div>
      </div>
    </section>
  );
}
