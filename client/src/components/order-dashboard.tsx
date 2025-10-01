import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle, Calendar, PiggyBank, Phone, MapPin } from "lucide-react";

export default function OrderDashboard() {
  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black mb-2 gradient-text">Your Dashboard</h2>
            <p className="text-muted-foreground">Manage your deliveries and account</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:shadow-cyan-glow" data-testid="button-new-delivery">
            <Plus className="mr-2" size={20} />
            New Delivery
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Orders</span>
              <Clock className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-active-orders">2</div>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completed</span>
              <CheckCircle className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-completed-orders">47</div>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">This Month</span>
              <Calendar className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-month-orders">12</div>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Savings</span>
              <PiggyBank className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-savings">$84</div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Clock className="text-primary mr-3" size={28} />
            Active Deliveries
          </h3>

          <div className="space-y-4">
            <div className="bg-card rounded-xl p-6 hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg font-bold" data-testid="text-order-id-11247">Order #11247</span>
                    <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary text-xs font-semibold rounded-full">
                      EN ROUTE
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    From: <span className="text-foreground">Whole Foods Market</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    To: <span className="text-foreground">123 Oak Street, Apt 4B</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black gradient-text mb-1" data-testid="text-eta-order-11247">5 min</div>
                  <div className="text-xs text-muted-foreground">ETA</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-sm font-bold">
                    SK
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Sarah Kim</div>
                    <div className="text-xs text-muted-foreground">Your driver</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="icon" className="w-10 h-10 bg-secondary hover:bg-muted" data-testid="button-call-sk">
                    <Phone size={16} />
                  </Button>
                  <Button size="icon" className="w-10 h-10 bg-secondary hover:bg-muted" data-testid="button-track-sk">
                    <MapPin size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <CheckCircle className="text-primary mr-3" size={28} />
            Recent Deliveries
          </h3>

          <div className="bg-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary bg-opacity-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">From</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-secondary hover:bg-opacity-30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold" data-testid="text-order-11245">#11245</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      Jan 28, 2024
                    </td>
                    <td className="px-6 py-4 text-sm">
                      Starbucks Coffee
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary text-xs font-semibold rounded-full">
                        DELIVERED
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      $17.50
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary hover:text-accent transition-colors text-sm font-semibold" data-testid="button-view-11245">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-secondary bg-opacity-30 border-t border-border flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing recent orders
              </div>
              <button className="text-sm font-semibold text-primary hover:text-accent transition-colors" data-testid="button-view-all-orders">
                View All Orders →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
