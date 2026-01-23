import { Link } from "react-router-dom";
import {  Twitter, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">THEBREAKPOINT</h3>
            <p className="text-gray-400 text-sm mb-4">
              Premium website development for growing brands.
            </p>
            <p className="text-gray-400 text-xs">
              Creating exceptional digital experiences with cutting-edge design and technology.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              SERVICES
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/web-design"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  to="/development"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Development
                </Link>
              </li>
              <li>
                <Link
                  to="/branding"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Branding
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              SUPPORT
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              CONNECT
            </h4>
            <div className="flex space-x-4">

                            <a
                href="https://x.com/breakpoint31411"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>

              <a
                href="https://wa.me/918329761217"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="thebreakpoint.inc@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} THEBREAKPOINT. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;