import { Button } from "@/components/ui/button";
import { Bike, CheckCircle, Clock, Home, Package } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import type { Order } from "../context/CartContext";

interface TrackingPageProps {
  order?: Order;
  onNavigate: (page: string, data?: unknown) => void;
}

const STEPS = [
  {
    key: "Placed",
    label: "Order Placed",
    icon: Package,
    desc: "We've received your order",
  },
  {
    key: "Preparing",
    label: "Preparing",
    icon: Clock,
    desc: "Kitchen is cooking your food",
  },
  {
    key: "Out for Delivery",
    label: "Out for Delivery",
    icon: Bike,
    desc: "Delivery partner on the way",
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: Home,
    desc: "Enjoy your meal!",
  },
] as const;

const STATUS_ORDER = ["Placed", "Preparing", "Out for Delivery", "Delivered"];

export default function TrackingPage({ order, onNavigate }: TrackingPageProps) {
  const { orders } = useCart();
  const activeOrder = order || orders[0];

  if (!activeOrder) {
    return (
      <main
        className="max-w-xl mx-auto px-6 py-20 text-center"
        data-ocid="tracking.empty_state"
      >
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2
          className="font-display font-bold text-2xl mb-2"
          style={{ color: "#1F1F1F" }}
        >
          No active orders
        </h2>
        <p className="text-sm mb-6" style={{ color: "#4A4A4A" }}>
          Place an order to track it here
        </p>
        <Button
          onClick={() => onNavigate("home")}
          style={{ backgroundColor: "#D9772A", color: "white" }}
          data-ocid="tracking.primary_button"
        >
          Order Now
        </Button>
      </main>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(activeOrder.status);

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1
        className="font-display font-bold text-2xl mb-1"
        style={{ color: "#1F1F1F" }}
      >
        Order Tracking
      </h1>
      <p className="text-sm mb-8" style={{ color: "#4A4A4A" }}>
        Order ID: {activeOrder.id}
      </p>

      {/* Status timeline */}
      <div className="relative mb-10" data-ocid="tracking.card">
        {STEPS.map((step, idx) => {
          const done = idx <= currentIdx;
          const Icon = step.icon;
          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4 mb-6 last:mb-0"
            >
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    done ? "bg-primary" : "bg-muted border-2 border-border"
                  }`}
                >
                  {done && idx < currentIdx ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${done ? "text-white" : "text-muted-foreground"}`}
                    />
                  )}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-1 ${
                      idx < currentIdx ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
              <div className="pt-2">
                <p
                  className={`font-semibold text-sm ${done ? "" : "text-muted-foreground"}`}
                  style={{ color: done ? "#1F1F1F" : undefined }}
                >
                  {step.label}
                  {activeOrder.status === step.key && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-primary font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Current
                    </span>
                  )}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#4A4A4A" }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Delivery details */}
      <div className="rounded-xl border border-border bg-white p-5 mb-6">
        <h3 className="font-semibold mb-3" style={{ color: "#1F1F1F" }}>
          Delivery Details
        </h3>
        <div className="space-y-2 text-sm" style={{ color: "#4A4A4A" }}>
          <div className="flex justify-between">
            <span>Delivery to</span>
            <span className="font-medium" style={{ color: "#1F1F1F" }}>
              {activeOrder.deliveryArea}, Hyderabad
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated time</span>
            <span className="font-medium" style={{ color: "#1F1F1F" }}>
              {activeOrder.estimatedDelivery}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Order total</span>
            <span className="font-bold" style={{ color: "#D9772A" }}>
              ₹{activeOrder.total}
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl border border-border bg-white p-5">
        <h3 className="font-semibold mb-3" style={{ color: "#1F1F1F" }}>
          Order Items
        </h3>
        <div className="space-y-2">
          {activeOrder.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span style={{ color: "#4A4A4A" }}>
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium" style={{ color: "#1F1F1F" }}>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-6 w-full border-primary text-primary hover:bg-primary/5"
        onClick={() => onNavigate("home")}
        data-ocid="tracking.secondary_button"
      >
        Back to Home
      </Button>
    </main>
  );
}
