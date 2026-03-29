import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, data?: unknown) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Explore Food", page: "explore" },
    { label: "Offers", page: "offers" },
    { label: "Tracking", page: "tracking" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border"
      style={{ backgroundColor: "#F7F4EF" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">అ</span>
          </div>
          <div className="hidden sm:block">
            <div
              className="font-display font-bold text-base leading-tight"
              style={{ color: "#1F1F1F" }}
            >
              Amma Chethi Vantalu
            </div>
            <div className="text-xs" style={{ color: "#4A4A4A" }}>
              అమ్మ చేతి వంటలు
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => onNavigate(link.page)}
              data-ocid="nav.link"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Location pill */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-xs font-medium"
            style={{ color: "#4A4A4A" }}
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Hyderabad, Telangana
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={() => onNavigate("cart")}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            data-ocid="nav.link"
          >
            <ShoppingCart className="w-5 h-5" style={{ color: "#1F1F1F" }} />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white">
                {cartCount}
              </Badge>
            )}
          </button>

          {/* Admin link */}
          <Button
            size="sm"
            variant="outline"
            className="hidden md:flex text-xs"
            onClick={() => onNavigate("admin")}
            data-ocid="nav.link"
          >
            Admin
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border"
          style={{ backgroundColor: "#F7F4EF" }}
        >
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setMobileOpen(false);
                }}
                data-ocid="nav.link"
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div
              className="flex items-center gap-1.5 px-4 py-2 text-xs"
              style={{ color: "#4A4A4A" }}
            >
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Hyderabad, Telangana
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
