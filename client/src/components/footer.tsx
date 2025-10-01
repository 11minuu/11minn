import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary bg-opacity-50 border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15L85 40L85 75L15 75L15 40L50 15Z" fill="hsl(190 100% 40%)" opacity="0.3"/>
                <path d="M50 20L80 42L80 70L20 70L20 42L50 20Z" fill="hsl(190 100% 50%)" opacity="0.5"/>
                <circle cx="50" cy="50" r="22" stroke="hsl(190 100% 70%)" strokeWidth="3" fill="hsl(197 59% 10%)"/>
                <line x1="50" y1="50" x2="50" y2="35" stroke="hsl(190 100% 70%)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="50" y1="50" x2="62" y2="50" stroke="hsl(190 100% 70%)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <div className="text-2xl font-black gradient-text">11MIN</div>
                <div className="text-xs text-muted-foreground -mt-1">Fast Delivery</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Ultra-fast delivery service with centimeter-level precision. Delivering anywhere in the city in just 11 minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-card hover:bg-primary rounded-lg flex items-center justify-center transition-all" data-testid="link-facebook">
                <Facebook size={20} className="text-foreground hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-card hover:bg-primary rounded-lg flex items-center justify-center transition-all" data-testid="link-twitter">
                <Twitter size={20} className="text-foreground hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-card hover:bg-primary rounded-lg flex items-center justify-center transition-all" data-testid="link-instagram">
                <Instagram size={20} className="text-foreground hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-card hover:bg-primary rounded-lg flex items-center justify-center transition-all" data-testid="link-linkedin">
                <Linkedin size={20} className="text-foreground hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#tracking" className="text-muted-foreground hover:text-primary transition-colors">Track Order</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Become a Driver</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 11MIN. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="text-primary" size={16} fill="currentColor" />
            <span>for fast deliveries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
