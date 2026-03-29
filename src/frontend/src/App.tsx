import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import type { Order } from "./context/CartContext";
import type { Restaurant } from "./data/restaurants";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import RestaurantPage from "./pages/RestaurantPage";
import TrackingPage from "./pages/TrackingPage";

type Page =
  | "home"
  | "explore"
  | "restaurant"
  | "cart"
  | "tracking"
  | "offers"
  | "admin";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleNavigate = (newPage: string, data?: unknown) => {
    if (newPage === "restaurant" && data) {
      setSelectedRestaurant(data as Restaurant);
    }
    if (newPage === "tracking" && data) {
      setSelectedOrder(data as Order);
    }
    setPage(newPage as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col font-body">
        <Header currentPage={page} onNavigate={handleNavigate} />

        <div className="flex-1">
          {page === "home" && <HomePage onNavigate={handleNavigate} />}
          {page === "explore" && <ExplorePage onNavigate={handleNavigate} />}
          {page === "restaurant" && selectedRestaurant && (
            <RestaurantPage
              restaurant={selectedRestaurant}
              onNavigate={handleNavigate}
            />
          )}
          {page === "cart" && <CartPage onNavigate={handleNavigate} />}
          {page === "tracking" && (
            <TrackingPage
              order={selectedOrder ?? undefined}
              onNavigate={handleNavigate}
            />
          )}
          {page === "offers" && <OffersPage />}
          {page === "admin" && <AdminPage onNavigate={handleNavigate} />}
        </div>

        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </CartProvider>
  );
}
