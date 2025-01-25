import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "../ui/button";

function Header() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "Events", slug: "/event", active: true },
    { name: "Projects", slug: "/projects", active: true },
  ];

  return (
    <header className="flex justify-between items-center py-6 px-8 bg-background text-foreground shadow-md">
      {/* Logo Section */}
      <div>
        <Link to="/">
          <Logo width={150} />
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex gap-6">
        {navItems.map(
          (item) =>
            item.active && (
              <Link
                to={item.slug}
                key={item.name}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
        )}
      </nav>

      {/* Actions Section */}
      <div>
        <Link to="/login">
          <Button
            variant="outline"
            className="py-2 px-6 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
