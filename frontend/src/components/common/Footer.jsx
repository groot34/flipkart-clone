import React from 'react';
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Gift,
  TrendingUp,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-gray-300 text-sm">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">

          {/* ABOUT */}
          <div>
            <h4 className="text-gray-400 mb-3 text-xs">ABOUT</h4>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          {/* GROUP COMPANIES */}
          <div>
            <h4 className="text-gray-400 mb-3 text-xs">GROUP COMPANIES</h4>
            <ul className="space-y-2">
              <li>Myntra</li>
              <li>Cleartrip</li>
              <li>Shopsy</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="text-gray-400 mb-3 text-xs">HELP</h4>
            <ul className="space-y-2">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div>
            <h4 className="text-gray-400 mb-3 text-xs">CONSUMER POLICY</h4>
            <ul className="space-y-2">
              <li>Cancellation & Returns</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
              <li>EPR Compliance</li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="md:border-l md:border-gray-600 md:pl-6">
            <h4 className="text-gray-400 mb-3 text-xs">Mail Us:</h4>
            <p className="leading-relaxed">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road,<br />
              Bengaluru, Karnataka, India
            </p>

            <div className="flex gap-4 mt-4">
              <Facebook size={18} />
              <Twitter size={18} />
              <Youtube size={18} />
              <Instagram size={18} />
            </div>
          </div>

          {/* REGISTERED OFFICE */}
          <div>
            <h4 className="text-gray-400 mb-3 text-xs">
              Registered Office Address:
            </h4>
            <p className="leading-relaxed">
              Flipkart Internet Private Limited,<br />
              Bengaluru, Karnataka, India<br />
              CIN: U51109KA2012PTC066107<br />
              Telephone:
              <span className="text-blue-400"> 044-45614700</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Bottom Links */}
          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-1">
              <ShoppingBag size={16} /> Become a Seller
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp size={16} /> Advertise
            </span>
            <span className="flex items-center gap-1">
              <Gift size={16} /> Gift Cards
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle size={16} /> Help Center
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © 2007-2026 Flipkart.com
          </p>

          {/* Payment Icons */}
          <div className="flex gap-2">
            <img src="/payments/visa.svg" className="h-5" />
            <img src="/payments/mastercard.svg" className="h-5" />
            <img src="/payments/rupay.svg" className="h-5" />
            <img src="/payments/upi.svg" className="h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
