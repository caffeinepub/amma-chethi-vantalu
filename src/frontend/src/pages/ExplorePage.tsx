import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { RESTAURANTS } from "../data/restaurants";
import type { Cuisine, Restaurant } from "../data/restaurants";

interface ExplorePageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

const CUISINES: (Cuisine | "All")[] = [
  "All",
  "Biryani",
  "Andhra",
  "South Indian",
  "Hyderabadi",
  "Chai & Snacks",
];

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [search, setSearch] = useState("");
  const [activeCuisine, setActiveCuisine] = useState<Cuisine | "All">("All");

  const filtered = RESTAURANTS.filter((r: Restaurant) => {
    const matchesCuisine =
      activeCuisine === "All" || r.cuisine === activeCuisine;
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1
        className="font-display font-bold text-3xl mb-2"
        style={{ color: "#1F1F1F" }}
      >
        Explore Restaurants
      </h1>
      <p className="text-sm mb-6" style={{ color: "#4A4A4A" }}>
        Delivering across Hyderabad, Telangana
      </p>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants or areas..."
            className="pl-9 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="explore.search_input"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CUISINES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setActiveCuisine(c)}
              data-ocid="explore.tab"
            >
              <Badge
                variant={activeCuisine === c ? "default" : "outline"}
                className={`cursor-pointer text-xs py-1.5 px-3 ${
                  activeCuisine === c
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`}
              >
                {c}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" data-ocid="explore.empty_state">
          <p
            className="text-xl font-display font-bold"
            style={{ color: "#1F1F1F" }}
          >
            No restaurants found
          </p>
          <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
            Try a different search or cuisine filter
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          data-ocid="explore.list"
        >
          {filtered.map((r, idx) => (
            <div key={r.id} data-ocid={`explore.item.${idx + 1}`}>
              <RestaurantCard
                restaurant={r}
                onClick={() => onNavigate("restaurant", r)}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
