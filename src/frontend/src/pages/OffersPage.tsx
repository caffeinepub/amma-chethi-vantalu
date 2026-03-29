import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

const OFFERS = [
  {
    code: "AMMA50",
    title: "50% off on first order",
    desc: "Use code AMMA50 on your first order. Max discount ₹100.",
    category: "New User",
    color: "#D9772A",
  },
  {
    code: "HYDER20",
    title: "20% off on Biryani",
    desc: "Get 20% off on all biryani orders above ₹300.",
    category: "Biryani",
    color: "#2AA6A1",
  },
  {
    code: "WEEKEND30",
    title: "30% off this weekend",
    desc: "Valid Sat & Sun only. Min order ₹200. All cuisines.",
    category: "Weekend",
    color: "#D9772A",
  },
  {
    code: "ANDHRA15",
    title: "₹75 off Andhra meals",
    desc: "On Andhra thali and meals above ₹150.",
    category: "Andhra",
    color: "#2AA6A1",
  },
  {
    code: "FREESHIP",
    title: "Free delivery",
    desc: "Free delivery on all orders above ₹250 today.",
    category: "Delivery",
    color: "#D9772A",
  },
  {
    code: "TEA10",
    title: "10% off at Nimrah Cafe",
    desc: "Enjoy your chai with 10% off all day.",
    category: "Cafe",
    color: "#2AA6A1",
  },
];

export default function OffersPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1
          className="font-display font-bold text-3xl"
          style={{ color: "#1F1F1F" }}
        >
          Offers & Deals
        </h1>
        <p className="text-sm mt-1" style={{ color: "#4A4A4A" }}>
          Exclusive offers for Hyderabad food lovers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OFFERS.map((offer, idx) => (
          <div
            key={offer.code}
            className="rounded-2xl border border-border bg-white p-5 hover:shadow-card transition-shadow"
            data-ocid={`offer.item.${idx + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${offer.color}18` }}
              >
                <Tag className="w-5 h-5" style={{ color: offer.color }} />
              </div>
              <Badge variant="outline" className="text-xs">
                {offer.category}
              </Badge>
            </div>
            <h3
              className="font-semibold text-base mb-1"
              style={{ color: "#1F1F1F" }}
            >
              {offer.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: "#4A4A4A" }}>
              {offer.desc}
            </p>
            <div className="flex items-center gap-3">
              <code
                className="flex-1 text-center py-2 rounded-lg font-mono font-bold text-sm border-2 border-dashed"
                style={{
                  borderColor: offer.color,
                  color: offer.color,
                  backgroundColor: `${offer.color}0d`,
                }}
              >
                {offer.code}
              </code>
              <Button
                size="sm"
                className="text-xs px-3"
                style={{ backgroundColor: offer.color, color: "white" }}
                data-ocid={`offer.primary_button.${idx + 1}`}
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
