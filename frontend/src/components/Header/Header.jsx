import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { Button } from "../ui/button";

function Header() {
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Events",
      slug: "/events",
      active: true,
    },
    {
      name: "Projects",
      slug: "/projects",
      active: true,
    },
    // {
    //   name: "Add Event",
    //   slug: "/add-event",
    //   active: true,
    // },
    // {
    //   name: "Add Project",
    //   slug: "/add-project",
    //   active: true,
    // }
  ]

  return (
    <header className="flex justify-between items-center py-8 px-8">
      <div>
        <Link to='/'>
          <Logo width={150} />
        </Link>
      </div>
      <nav className="bg-slate-600 p-4 rounded-full">
          {navItems.map((item) => 
            item.active ? (
              <Link to={item.slug} key={item.name}>
                {/* <Button
                  onClick={() => navigate(item.slug)}
                  className='' varient='link'
                >{item.name}</Button> */}
                <Button variant="link">{item.name}</Button>
              </Link>
            ) : null
          )}
        </nav>
      <div>
        <Link to='/login'>
          <Button variant="outline" className="py-6 px-10 rounded-full">Login</Button>
        </Link>
      </div>
    </header>
  )
}

export default Header