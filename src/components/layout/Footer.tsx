
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-school-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Campus Digital Gateway</h3>
            <p className="mb-4 text-sm text-gray-300">
              Empowering young minds with quality education and holistic development since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-school-accent">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-school-accent">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-school-accent">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-school-accent">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white">Academic Programs</Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-white">Admissions</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white">Events & News</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/programs#technical" className="hover:text-white">Technical Stream (IX-XII)</Link>
              </li>
              <li>
                <Link to="/programs#science" className="hover:text-white">Science Stream (XI-XII)</Link>
              </li>
              <li>
                <Link to="/programs#general" className="hover:text-white">General Stream (XI-XII)</Link>
              </li>
              <li>
                <Link to="/programs#primary" className="hover:text-white">Primary School (I-V)</Link>
              </li>
              <li>
                <Link to="/programs#secondary" className="hover:text-white">Secondary School (VI-X)</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <span>123 Education Road, Academic District, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>info@campusgateway.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Campus Digital Gateway. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
