import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="container py-10 flex flex-col sm:grid sm:grid-cols-3 items-center gap-6 text-[15px] font-medium">
        <p className="text-muted-foreground order-3 sm:order-1 sm:justify-self-start">
          © 2026 NEOMART – جميع الحقوق محفوظة
        </p>

        <div className="flex gap-8 order-2 items-center sm:justify-self-center">
          <a
            href="https://www.tiktok.com/@neomart_space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
              <path d="M16.7 5.5a5.3 5.3 0 0 1-3.2-3.2h-3.1v13.2a2.7 2.7 0 1 1-2.3-2.7V9.7a5.8 5.8 0 1 0 5.5 5.8V8.8a8.3 8.3 0 0 0 4.8 1.5V7.2a5.2 5.2 0 0 1-1.7-1.7Z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/Neomart.Space/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-7 h-7" />
          </a>
          <a
            href="https://www.instagram.com/neomart_beauty/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7" />
            <span className="text-sm font-medium">Beauty</span>
          </a>
        </div>

        <p className="text-lg font-extrabold neomart-logo select-none order-1 sm:order-3 sm:justify-self-end">
          NEOMART
        </p>
      </div>
    </footer>
  );
};

export default Footer;
