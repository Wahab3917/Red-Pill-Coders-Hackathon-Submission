import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "../ui/button";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setIsLoggedIn(!!userData?.token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "Events", slug: "/events", active: true },
    { name: "Projects", slug: "/projects", active: true },
  ];

  return (
    <header className="flex justify-between items-center py-6 px-8 bg-background text-foreground shadow-md">
      <div>
        <Link to="/">
          <Logo width={150} />
        </Link>
      </div>

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

      <div>
        {isLoggedIn ? (
          <Button
            variant="outline"
            onClick={handleLogout}
            className="py-2 px-6 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Logout
          </Button>
          ) : (
          <Link to="/login">
            <Button
              variant="outline"
              className="py-2 px-6 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Login
            </Button>
          </Link>
          )}
      </div>
    </header>
  );
}

export default Header;
