import { Button } from "@/components/ui/button";
import { Check, X, Receipt, Crown, Building } from "lucide-react";
import { SiStripe, SiVisa, SiMastercard, SiAmericanexpress, SiApplepay, SiGooglepay } from "react-icons/si";

export default function SubscriptionPlans() {
  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 gradient-text">Choose Your Plan</h2>
          <p className="text-xl text-muted-foreground">Save more with our subscription plans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-8 hover-lift">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pay As You Go</h3>
              <p className="text-muted-foreground mb-6">No commitment, pay per delivery</p>
              
              <div className="mb-6">
                <div className="text-4xl font-black gradient-text mb-1">$0</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">$15 per 11-min delivery</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Standard support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Real-time tracking</span>
                </li>
                <li className="flex items-start opacity-30">
                  <X className="text-muted-foreground mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Priority delivery</span>
                </li>
              </ul>

              <Button className="w-full bg-secondary hover:bg-muted" data-testid="button-plan-free">
                Continue Free
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 border-2 border-primary shadow-cyan-glow-lg relative hover-lift">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-muted-foreground mb-6">Best value for regular users</p>
              
              <div className="mb-6">
                <div className="text-4xl font-black gradient-text mb-1">$49</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">10 free deliveries/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">$8 per additional delivery</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Priority delivery queue</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">24/7 premium support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">5% cashback on all orders</span>
                </li>
              </ul>

              <Button className="w-full bg-primary text-primary-foreground hover:shadow-cyan-glow-lg font-bold" data-testid="button-plan-pro">
                Subscribe Now
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 hover-lift">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For businesses and teams</p>
              
              <div className="mb-6">
                <div className="text-4xl font-black gradient-text mb-1">$199</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Unlimited deliveries</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-sm">10% cashback on all orders</span>
                </li>
              </ul>

              <Button className="w-full bg-secondary hover:bg-muted" data-testid="button-plan-enterprise">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-card rounded-xl p-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-3">
            <SiStripe className="text-3xl text-primary" />
            <SiVisa className="text-3xl text-muted-foreground" />
            <SiMastercard className="text-3xl text-muted-foreground" />
            <SiAmericanexpress className="text-3xl text-muted-foreground" />
            <SiApplepay className="text-3xl text-muted-foreground" />
            <SiGooglepay className="text-3xl text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Secure payments powered by Stripe. All major cards accepted.
          </p>
        </div>
      </div>
    </section>
  );
}
