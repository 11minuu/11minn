import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle, Calendar, PiggyBank, Phone, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Delivery } from "@shared/schema";

export default function OrderDashboard() {
  const { user } = useAuth();

  const { data: deliveries = [], isLoading } = useQuery<Delivery[]>({
    queryKey: ["/api/deliveries/user", user?.id],
    enabled: !!user,
  });

  const { data: activeDeliveries = [] } = useQuery<Delivery[]>({
    queryKey: ["/api/deliveries/user", user?.id, "active"],
    enabled: !!user,
  });

  const completedCount = deliveries.filter((d) => d.status === "delivered").length;
  const thisMonthCount = deliveries.filter((d) => {
    const deliveryDate = new Date(d.createdAt);
    const now = new Date();
    return deliveryDate.getMonth() === now.getMonth() && deliveryDate.getFullYear() === now.getFullYear();
  }).length;

  if (isLoading) {
    return (
      <section id="dashboard" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black mb-2 gradient-text">Your Dashboard</h2>
            <p className="text-muted-foreground">Manage your deliveries and account</p>
          </div>
          <Button 
            className="bg-primary text-primary-foreground hover:shadow-cyan-glow" 
            data-testid="button-new-delivery"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
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
            <div className="text-3xl font-black gradient-text" data-testid="text-active-orders">
              {activeDeliveries.length}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completed</span>
              <CheckCircle className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-completed-orders">
              {completedCount}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">This Month</span>
              <Calendar className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-month-orders">
              {thisMonthCount}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Orders</span>
              <PiggyBank className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-black gradient-text" data-testid="text-total-orders">
              {deliveries.length}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Clock className="text-primary mr-3" size={28} />
            Active Deliveries
          </h3>

          {activeDeliveries.length === 0 ? (
            <div className="bg-card rounded-xl p-8 text-center">
              <p className="text-muted-foreground">No active deliveries at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-card rounded-xl p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-lg font-bold" data-testid={`text-order-id-${delivery.id}`}>
                          Order #{delivery.id.slice(0, 8)}
                        </span>
                        <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary text-xs font-semibold rounded-full uppercase">
                          {delivery.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        From: <span className="text-foreground">{delivery.pickupLocation.address}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        To: <span className="text-foreground">{delivery.deliveryLocation.address}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black gradient-text mb-1">
                        {delivery.estimatedDeliveryTime ? new Date(delivery.estimatedDeliveryTime).toLocaleTimeString() : 'N/A'}
                      </div>
                      <div className="text-xs text-muted-foreground">ETA</div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mt-2">
                    <strong>Item:</strong> {delivery.itemDescription}
                  </div>
                </div>
              ))}
            </div>
          )}
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
