import { createContext, useContext, useState } from "react";
import type { MenuItem, Restaurant } from "../data/restaurants";

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryArea: string;
  status: "Placed" | "Preparing" | "Out for Delivery" | "Delivered";
  placedAt: Date;
  estimatedDelivery: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem, restaurant: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (deliveryArea: string) => Order;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: MenuItem, restaurant: Restaurant) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        },
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const placeOrder = (deliveryArea: string): Order => {
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: [...items],
      total: cartTotal,
      deliveryArea,
      status: "Placed",
      placedAt: new Date(),
      estimatedDelivery: "35-45 min",
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    // Simulate status progression
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: "Preparing" } : o,
        ),
      );
    }, 5000);
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: "Out for Delivery" } : o,
        ),
      );
    }, 15000);
    return order;
  };

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
