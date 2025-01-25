import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo';

function footer() {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link to='/' className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <Logo width={150} />
          </Link>
          <p className="mt-2 text-sm text-gray-500">Empowering Connections. Igniting Innovation. Join the ultimate networking platform where ideas thrive, connections grow, and opportunities emerge.</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Explore</h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-400 hover:text-white">Our Upcoming Events</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">Success Projects</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Connect</h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">Membership</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Legal</h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-400 hover:text-white">Terms & Conditions</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">Cookies Policy</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">Follow Us</h2>
            <nav className="list-none mb-10">
              <li>
                <Link className="text-gray-400 hover:text-white">Instagram</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">LinkedIn</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white">Twitter</Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-400 text-sm text-center sm:text-left">© 2025 Red Pill Coders —
            <Link href="#" rel="noopener noreferrer" className="text-gray-500 ml-1" target="_blank">@networQ</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default footer