import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { HYDERABAD_AREAS } from "../data/restaurants";

interface CartPageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, cartTotal, removeFromCart, updateQuantity, placeOrder } =
    useCart();
  const [area, setArea] = useState("");
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!area) {
      toast.error("Please select your delivery area in Hyderabad");
      return;
    }
    setPlacing(true);
    const order = placeOrder(area);
    toast.success("Order placed successfully! 🎉");
    setPlacing(false);
    onNavigate("tracking", order);
  };

  if (items.length === 0) {
    return (
      <main
        className="max-w-2xl mx-auto px-6 py-20 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2
          className="font-display font-bold text-2xl mb-2"
          style={{ color: "#1F1F1F" }}
        >
          Your cart is empty
        </h2>
        <p className="text-sm mb-6" style={{ color: "#4A4A4A" }}>
          Add some delicious food from our kitchens!
        </p>
        <Button
          onClick={() => onNavigate("home")}
          style={{ backgroundColor: "#D9772A", color: "white" }}
          data-ocid="cart.primary_button"
        >
          Explore Restaurants
        </Button>
      </main>
    );
  }

  const deliveryFee = 30;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + tax;

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 text-sm mb-6 hover:text-primary transition-colors"
        style={{ color: "#4A4A4A" }}
        data-ocid="cart.link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <h1
        className="font-display font-bold text-2xl mb-6"
        style={{ color: "#1F1F1F" }}
      >
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-3" data-ocid="cart.list">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex gap-3 p-4 rounded-xl border border-border bg-white"
              data-ocid={`cart.item.${idx + 1}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-14 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#1F1F1F" }}
                >
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: "#4A4A4A" }}>
                  {item.restaurantName}
                </p>
                <p
                  className="font-bold text-sm mt-1"
                  style={{ color: "#D9772A" }}
                >
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between gap-2">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  data-ocid={`cart.delete_button.${idx + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm hover:border-primary hover:text-primary transition-colors"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    data-ocid={`cart.secondary_button.${idx + 1}`}
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm hover:border-primary hover:text-primary transition-colors"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    data-ocid={`cart.primary_button.${idx + 1}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-72 space-y-4">
          <div className="rounded-xl border border-border bg-white p-5">
            <h3 className="font-semibold mb-4" style={{ color: "#1F1F1F" }}>
              Order Summary
            </h3>

            <div className="mb-4">
              <p
                className="text-sm font-medium mb-1.5"
                style={{ color: "#1F1F1F" }}
              >
                Delivery Area (Hyderabad)
              </p>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger data-ocid="cart.select">
                  <SelectValue placeholder="Select your area" />
                </SelectTrigger>
                <SelectContent>
                  {HYDERABAD_AREAS.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}, Hyderabad
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-3" />
            <div className="space-y-2 text-sm">
              <div
                className="flex justify-between"
                style={{ color: "#4A4A4A" }}
              >
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div
                className="flex justify-between"
                style={{ color: "#4A4A4A" }}
              >
                <span>Delivery fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div
                className="flex justify-between"
                style={{ color: "#4A4A4A" }}
              >
                <span>Taxes & fees</span>
                <span>₹{tax}</span>
              </div>
            </div>
            <Separator className="my-3" />
            <div
              className="flex justify-between font-bold text-base"
              style={{ color: "#1F1F1F" }}
            >
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <Button
              className="w-full mt-4 h-11 font-semibold"
              style={{ backgroundColor: "#D9772A", color: "white" }}
              onClick={handlePlaceOrder}
              disabled={placing}
              data-ocid="cart.submit_button"
            >
              {placing ? "Placing Order..." : `Place Order · ₹${grandTotal}`}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
