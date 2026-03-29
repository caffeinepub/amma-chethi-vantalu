import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer style={{ backgroundColor: "#EFE6DA" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div
              className="font-display font-bold text-lg mb-1"
              style={{ color: "#1F1F1F" }}
            >
              Amma Chethi Vantalu
            </div>
            <div className="text-sm mb-3" style={{ color: "#4A4A4A" }}>
              అమ్మ చేతి వంటలు
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>
              Bringing the taste of home-cooked Telugu food to your doorstep
              across Hyderabad.
            </p>
          </div>

          {/* Site Links */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#1F1F1F" }}
            >
              Site
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#4A4A4A" }}>
              {[
                "Home",
                "Explore Food",
                "Offers",
                "Order Tracking",
                "Admin Panel",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#1F1F1F" }}
            >
              Resources
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#4A4A4A" }}>
              {[
                "About Us",
                "Partner With Us",
                "Careers",
                "Blog",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#1F1F1F" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "#4A4A4A" }}>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>Hyderabad, Telangana – 500001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 6309646188</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@ammachethi.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#D9C8B8" }}>
        <div
          className="max-w-7xl mx-auto px-6 py-4 text-center text-xs"
          style={{ color: "#4A4A4A" }}
        >
          © {year}. Built with ❤️ using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
