import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { RESTAURANTS, TRENDING_DISHES } from "../data/restaurants";

interface HomePageProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate("explore");
    }
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[520px] flex items-center overflow-hidden"
        style={{ backgroundColor: "#1F1F1F" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/uploads/20231107_150651-019d3949-8acb-733f-b980-098d004a779d-1.jpg')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(31,31,31,0.85) 0%, rgba(31,31,31,0.45) 60%, rgba(31,31,31,0.1) 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p
              className="text-sm font-medium mb-2"
              style={{ color: "#D9772A" }}
            >
              🍛 Hyderabad's Home Kitchen
            </p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight text-white mb-3">
              Taste of Amma's
              <br />
              <span style={{ color: "#D9772A" }}>Home Cooking</span>
            </h1>
            <p className="text-white/80 text-base mb-8">
              Order authentic Telugu & Hyderabadi food from the best home
              kitchens. Delivered fresh across Hyderabad.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Search for biryani, dosa, haleem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 h-12 bg-white text-foreground placeholder:text-muted-foreground rounded-lg border-0"
                data-ocid="search.input"
              />
              <Button
                onClick={handleSearch}
                className="h-12 px-6 font-semibold rounded-lg"
                style={{ backgroundColor: "#D9772A", color: "white" }}
                data-ocid="search.primary_button"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Kitchens */}
      <section className="py-14 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-bold text-2xl sm:text-3xl"
              style={{ color: "#1F1F1F" }}
            >
              Popular Kitchens Near You
            </h2>
            <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
              Top-rated home-style restaurants delivering across Hyderabad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESTAURANTS.slice(0, 4).map((restaurant, idx) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                data-ocid={`restaurant.item.${idx + 1}`}
              >
                <RestaurantCard
                  restaurant={restaurant}
                  onClick={() => onNavigate("restaurant", restaurant)}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => onNavigate("explore")}
              className="border-primary text-primary hover:bg-primary/5"
              data-ocid="restaurant.secondary_button"
            >
              View All Restaurants
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Dishes */}
      <section className="py-14 px-6" style={{ backgroundColor: "#F7F4EF" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-bold text-2xl sm:text-3xl"
              style={{ color: "#1F1F1F" }}
            >
              Trending Home-Style Dishes
            </h2>
            <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
              What Hyderabad is loving right now
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRENDING_DISHES.map((dish, idx) => (
              <motion.button
                type="button"
                key={dish.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                onClick={() => onNavigate("explore")}
                className="group text-center rounded-xl overflow-hidden bg-white shadow-xs border border-border hover:shadow-md transition-all duration-200"
                data-ocid={`dish.item.${idx + 1}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2">
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#1F1F1F" }}
                  >
                    {dish.name}
                  </p>
                  <span
                    className={`text-[10px] mt-0.5 inline-block font-medium ${dish.tag === "Veg" ? "text-green-600" : "text-red-500"}`}
                  >
                    {dish.tag === "Veg" ? "🟢" : "🔴"} {dish.tag}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Order Tracking Section */}
      <section className="py-14 px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="font-display font-bold text-2xl sm:text-3xl"
              style={{ color: "#1F1F1F" }}
            >
              Live Order Tracking
            </h2>
            <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
              Real-time updates from kitchen to your doorstep
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Map placeholder */}
            <div
              className="flex-1 rounded-2xl overflow-hidden border border-border"
              style={{ minHeight: 300 }}
            >
              <iframe
                title="Hyderabad Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3163474624!2d78.24323041640625!3d17.412281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1699900000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ minHeight: 300, border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Tracking card */}
            <div className="lg:w-72 rounded-2xl border border-border bg-white p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#1F1F1F" }}
                >
                  Live Tracking
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { step: "Order Placed", done: true, time: "12:30 PM" },
                  { step: "Kitchen Preparing", done: true, time: "12:35 PM" },
                  { step: "Out for Delivery", done: false, time: "~12:55 PM" },
                  { step: "Delivered", done: false, time: "~1:05 PM" },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        s.done ? "bg-primary" : "bg-muted border border-border"
                      }`}
                    >
                      {s.done ? (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <title>Done</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${s.done ? "" : "text-muted-foreground"}`}
                        style={{ color: s.done ? "#1F1F1F" : undefined }}
                      >
                        {s.step}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-5"
                style={{ backgroundColor: "#D9772A", color: "white" }}
                onClick={() => onNavigate("tracking")}
                data-ocid="tracking.primary_button"
              >
                Track My Order
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
