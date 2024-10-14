import { useState } from "react";
import Logo from "../assets/Logo.png";
import HamMenu from "../assets/images/right.png";
import user from "../assets/images/user.png";
import {Outlet, NavLink,Link } from "react-router-dom";

export default function Header() {
  const [shown, setShown] = useState(false);

  function showMenu() {
    setShown(!shown);
  }

  return (
    <>
      <div className="hidden lg:block">
        <header className="absolute top-4 left-1/2 translate-x-[-50%] z-10">
          <nav className="flex items-center">
            <div className="w-40 p-4 bg-white shadow-2xl rounded-xl">
              <NavLink to="/">
                <img src={Logo} className="w-full" />
              </NavLink>
            </div>
            <div className="bg-zinc-50 p-4 shadow-2xl rounded-r-full">
              <ul className="flex text-sm xl:text-xl font-semibold">
                <li className="px-5">
                  <NavLink to="/" className={({isActive})=>isActive?'text-red-600':''}>Home</NavLink>
                </li>
                <li className="border-x px-5">
                  <NavLink to="/aboutus" className={({isActive})=>isActive?'text-red-600':''}>About Us</NavLink>
                </li>
                <NavLink to='/services' className={({isActive})=>isActive?'text-red-600':''}><li className="px-5">Services</li></NavLink>
                <li className="border-x px-5">Blog</li>
                <li className="px-5">Contact Us</li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="w-10 absolute right-6 top-16 z-10 cursor-pointer">
          <Link to="/profile"><img src={user} alt="" className="invert" /></Link>
        </div>
      </div>
      <div className="block lg:hidden">
        <header className="absolute z-10 w-full p-2 md:p-4">
          <nav className="flex items-center justify-between w-full">
            <div className="bg-white w-20 p-2 shadow-2xl rounded-xl md:p-3 md:w-36">
              <Link to="/">
                <img src={Logo} alt="logo" className="w-full" />
              </Link>
            </div>
            <div className="relative">
              <div
                className="bg-white w-7 p-1 shadow-2xl rounded-xl md:w-10"
                onClick={showMenu}
              >
                <img src={HamMenu} alt="menu" className="w-full" />
              </div>
              <div
                className={`absolute bg-white right-0 rounded-lg shadow-lg z-10 ${
                  shown ? "h-auto" : "h-0"
                }`}
              >
                <ul
                  className={`text-sm xl:text-xl font-semibold w-max mt-4 ${
                    shown ? "visible" : "invisible"
                  }`}
                >
                  <li className="px-4 border-b-2 py-2 border-slate-100">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="px-4 border-b-2 py-2 border-slate-100">
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li className="px-4 border-b-2 py-2 border-slate-100">
                    Services
                  </li>
                  <li className="px-4 border-b-2 py-2 border-slate-100">
                    Blog
                  </li>
                  <li className="px-4 border-b-2 py-2 border-slate-100">
                    Contact Us
                  </li>
                  <li className="p-4">
                    <div className="cursor-pointer w-6 mx-auto">
                     <Link to="/profile"> <img src={user} alt="" className="w-full" /></Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
}
