import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bike, Clock, Minus, Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { MenuItem, Restaurant } from "../data/restaurants";

interface RestaurantPageProps {
  restaurant: Restaurant;
  onNavigate: (page: string, data?: unknown) => void;
}

export default function RestaurantPage({
  restaurant,
  onNavigate,
}: RestaurantPageProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    "all",
    ...Array.from(new Set(restaurant.menu.map((i) => i.category))),
  ];

  const filtered =
    activeCategory === "all"
      ? restaurant.menu
      : restaurant.menu.filter((i) => i.category === activeCategory);

  const getItemQty = (itemId: string) => {
    const cartItem = items.find((i) => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAdd = (item: MenuItem) => {
    addToCart(item, restaurant);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Back */}
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 text-sm mb-6 hover:text-primary transition-colors"
        style={{ color: "#4A4A4A" }}
        data-ocid="restaurant.link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Hero */}
      <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden mb-6">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }}
        />
        <div className="absolute bottom-4 left-5">
          <h1 className="font-display font-bold text-2xl text-white">
            {restaurant.name}
          </h1>
          <p className="text-white/80 text-sm">{restaurant.area}, Hyderabad</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm font-semibold">
                {restaurant.rating}
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/80">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 text-white/80">
              <Bike className="w-3.5 h-3.5" />
              <span className="text-xs">
                ₹{restaurant.deliveryFee} delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            data-ocid="restaurant.tab"
          >
            <Badge
              variant={activeCategory === cat ? "default" : "outline"}
              className={`cursor-pointer capitalize text-xs py-1.5 px-3 ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              {cat === "all" ? "All Items" : cat}
            </Badge>
          </button>
        ))}
      </div>

      {/* Menu */}
      <div className="space-y-3" data-ocid="menu.list">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex gap-4 p-4 rounded-xl border border-border bg-white hover:shadow-card transition-shadow"
            data-ocid={`menu.item.${idx + 1}`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-20 rounded-lg object-cover shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center ${
                        item.isVeg ? "border-green-600" : "border-red-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.isVeg ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                    </span>
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "#1F1F1F" }}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#4A4A4A" }}
                  >
                    {item.description}
                  </p>
                  <p
                    className="font-bold text-sm mt-2"
                    style={{ color: "#1F1F1F" }}
                  >
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex items-end">
              {getItemQty(item.id) === 0 ? (
                <Button
                  size="sm"
                  className="h-8 px-4 text-xs"
                  style={{ backgroundColor: "#D9772A", color: "white" }}
                  onClick={() => handleAdd(item)}
                  data-ocid={`menu.primary_button.${idx + 1}`}
                >
                  + Add
                </Button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full border border-primary flex items-center justify-center hover:bg-primary/10"
                    onClick={() =>
                      updateQuantity(item.id, getItemQty(item.id) - 1)
                    }
                    data-ocid={`menu.secondary_button.${idx + 1}`}
                  >
                    <Minus className="w-3 h-3 text-primary" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">
                    {getItemQty(item.id)}
                  </span>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full border border-primary flex items-center justify-center hover:bg-primary/10"
                    onClick={() => handleAdd(item)}
                    data-ocid={`menu.primary_button.${idx + 1}`}
                  >
                    <Plus className="w-3 h-3 text-primary" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
