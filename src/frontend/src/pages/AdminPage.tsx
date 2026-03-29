import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ChevronDown, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { Order } from "../context/CartContext";
import { RESTAURANTS } from "../data/restaurants";

const ORDER_STATUSES = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
] as const;

const STATUS_COLORS: Record<string, string> = {
  Placed: "bg-blue-100 text-blue-700",
  Preparing: "bg-yellow-100 text-yellow-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function AdminPage({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const { orders } = useCart();
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);

  const updateStatus = (orderId: string, status: Order["status"]) => {
    setLocalOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-display font-bold text-2xl"
            style={{ color: "#1F1F1F" }}
          >
            Admin Panel
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#4A4A4A" }}>
            Manage orders and restaurants
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => onNavigate("home")}
          data-ocid="admin.link"
        >
          ← Back to App
        </Button>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="mb-6" data-ocid="admin.tab">
          <TabsTrigger value="orders" data-ocid="admin.tab">
            Orders
          </TabsTrigger>
          <TabsTrigger value="restaurants" data-ocid="admin.tab">
            Restaurants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          {localOrders.length === 0 ? (
            <div className="text-center py-16" data-ocid="admin.empty_state">
              <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="font-semibold" style={{ color: "#1F1F1F" }}>
                No orders yet
              </p>
              <p className="text-sm" style={{ color: "#4A4A4A" }}>
                Orders will appear here once customers place them.
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl border border-border overflow-hidden"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Delivery Area</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Update Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localOrders.map((order, idx) => (
                    <TableRow key={order.id} data-ocid={`admin.row.${idx + 1}`}>
                      <TableCell className="font-mono text-xs">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-xs">
                        {order.items
                          .map((i) => `${i.name} ×${i.quantity}`)
                          .join(", ")}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.deliveryArea}, Hyderabad
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{order.total}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(val) =>
                            updateStatus(order.id, val as Order["status"])
                          }
                        >
                          <SelectTrigger
                            className="h-8 text-xs w-44"
                            data-ocid={`admin.select.${idx + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="restaurants">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="admin.list"
          >
            {RESTAURANTS.map((r, idx) => (
              <div
                key={r.id}
                className="rounded-xl border border-border bg-white p-4"
                data-ocid={`admin.item.${idx + 1}`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-16 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "#1F1F1F" }}
                    >
                      {r.name}
                    </h3>
                    <p className="text-xs" style={{ color: "#4A4A4A" }}>
                      {r.area}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {r.cuisine}
                    </Badge>
                  </div>
                </div>
                <div
                  className="mt-3 flex items-center justify-between text-xs"
                  style={{ color: "#4A4A4A" }}
                >
                  <span>{r.menu.length} menu items</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />{" "}
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
