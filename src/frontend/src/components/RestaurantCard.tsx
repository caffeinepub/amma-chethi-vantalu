import { Badge } from "@/components/ui/badge";
import { Bike, Clock, Star } from "lucide-react";
import type { Restaurant } from "../data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({
  restaurant,
  onClick,
}: RestaurantCardProps) {
  return (
    <button
      type="button"
      className="w-full text-left bg-white rounded-xl overflow-hidden shadow-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3 bg-white text-foreground border border-border text-xs font-medium">
          {restaurant.cuisine}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base" style={{ color: "#1F1F1F" }}>
          {restaurant.name}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: "#4A4A4A" }}>
          {restaurant.area}, Hyderabad
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span
              className="text-sm font-semibold"
              style={{ color: "#1F1F1F" }}
            >
              {restaurant.rating}
            </span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "#4A4A4A" }}>
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "#4A4A4A" }}>
            <Bike className="w-3.5 h-3.5" />
            <span className="text-xs">₹{restaurant.deliveryFee} delivery</span>
          </div>
        </div>
      </div>
    </button>
  );
}
