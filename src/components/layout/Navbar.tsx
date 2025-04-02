import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Main navigation items
  const mainNavItems = [
    { name: 'Home', path: '/' },
    // About, Programs and Events are handled separately as dropdowns
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  // About Us dropdown sections
  const aboutUsDropdown = [
    {
      title: 'History of School',
      path: '/about#history',
      description: 'Learn about our founding and key milestones'
    },
    {
      title: 'Messages from Leadership',
      path: '/about#leadership',
      description: 'Messages from our Principal, Vice Principal, MD, and Chairman'
    },
    {
      title: 'Our Teams',
      path: '/about#teams',
      description: 'Meet our administrative and support staff'
    },
    {
      title: 'Our Faculty',
      path: '/about#faculty',
      description: 'Explore our teaching departments and faculty members'
    },
  ];

  // Programs dropdown sections
  const programsDropdown = [
    {
      title: 'Technical Stream (IX-XII)',
      path: '/programs#technical',
      description: 'IT, Engineering Basics, and technical subjects'
    },
    {
      title: 'Science Stream (XI-XII)',
      path: '/programs#science',
      description: 'Physics, Chemistry, Biology, Mathematics'
    },
    {
      title: 'General Stream (XI-XII)',
      path: '/programs#general',
      description: 'Humanities, Commerce, and Languages'
    },
    {
      title: 'Primary School (I-V)',
      path: '/programs#primary',
      description: 'Foundational learning through play-based methods'
    },
    {
      title: 'Secondary School (VI-X)',
      path: '/programs#secondary',
      description: 'Intermediate learning and board exam preparation'
    },
  ];

  // Events & News dropdown sections
  const eventsDropdown = [
    {
      title: 'Latest News',
      path: '/events#news',
      description: 'School achievements, announcements, and initiatives'
    },
    {
      title: 'Event Calendar',
      path: '/events#calendar',
      description: 'Upcoming events, dates, and registration links'
    },
    {
      title: 'Photo/Video Gallery',
      path: '/events#gallery',
      description: 'Media highlights from recent school events'
    },
    {
      title: 'Newsletter',
      path: '/events#newsletter',
      description: 'Subscribe to our regular school updates'
    },
  ];

  // Custom component for NavigationMenuLink
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-school-primary">Campus</span>
            <span className="text-2xl font-display font-medium text-school-secondary">Gateway</span>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home Link */}
                <NavigationMenuItem>
                  <Link 
                    to="/" 
                    className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-school-accent ${
                      location.pathname === '/' 
                        ? 'text-school-primary font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* About Us Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-school-accent ${
                      location.pathname === '/about' 
                        ? 'text-school-primary font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {aboutUsDropdown.map((item) => (
                        <ListItem
                          key={item.path}
                          title={item.title}
                          href={item.path}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Programs Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-school-accent ${
                      location.pathname === '/programs' 
                        ? 'text-school-primary font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[600px] md:grid-cols-2">
                      {programsDropdown.map((item) => (
                        <ListItem
                          key={item.path}
                          title={item.title}
                          href={item.path}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Events & News Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-school-accent ${
                      location.pathname === '/events' 
                        ? 'text-school-primary font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    Events & News
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {eventsDropdown.map((item) => (
                        <ListItem
                          key={item.path}
                          title={item.title}
                          href={item.path}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Regular links */}
                {mainNavItems.slice(1).map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      to={item.path}
                      className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-school-accent ${
                        location.pathname === item.path 
                          ? 'text-school-primary font-semibold' 
                          : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/login" className="ml-4 btn-primary">
              Login
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-school-primary hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Simplified for mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Home Link */}
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-school-accent ${
                  location.pathname === '/' 
                    ? 'text-school-primary font-semibold' 
                    : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* About Us with sub-sections */}
              <div className="space-y-1">
                <Link
                  to="/about"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-school-accent ${
                    location.pathname === '/about' 
                      ? 'text-school-primary font-semibold' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <div className="pl-4 space-y-1">
                  {aboutUsDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 py-1 text-sm text-gray-600 hover:text-school-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Programs with sub-sections */}
              <div className="space-y-1">
                <Link
                  to="/programs"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-school-accent ${
                    location.pathname === '/programs' 
                      ? 'text-school-primary font-semibold' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Programs
                </Link>
                <div className="pl-4 space-y-1">
                  {programsDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 py-1 text-sm text-gray-600 hover:text-school-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Events & News with sub-sections */}
              <div className="space-y-1">
                <Link
                  to="/events"
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-school-accent ${
                    location.pathname === '/events' 
                      ? 'text-school-primary font-semibold' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events & News
                </Link>
                <div className="pl-4 space-y-1">
                  {eventsDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 py-1 text-sm text-gray-600 hover:text-school-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Other main nav items */}
              {mainNavItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-school-accent ${
                    location.pathname === item.path 
                      ? 'text-school-primary font-semibold' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Login link */}
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-school-primary hover:bg-school-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
