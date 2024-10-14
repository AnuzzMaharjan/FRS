import logo from "../assets/logo.png";
import Contents from "./Contents";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

export default function Footer() {
  function newsletterHandler(event) {
    event.preventDefault();
  }

  return (
    <>
      <footer className="px-12 bg-slate-950 pt-24 mt-16">
        <div className="container flex flex-wrap p-4">
          <div className="grow-0 shrink-0 basis-[100%] sm:basis-1/2 xl:basis-1/4">
            <div className="w-44 bg-white p-3 rounded-lg">
              <Link to="/">
                <img src={logo} alt="logo" className="w-full" />
              </Link>
            </div>
            <div className="text-white mt-7">
              Your partner in making your feast, functions and parties
              phenomenal and successfull! Remember us to organize your
              feasts,parties and functions without hassle!!
            </div>
          </div>
          <div className="grow-0 shrink-0 text-white mt-10 sm:mt-0 sm:pl-16 basis-[100%] sm:basis-1/2 xl:basis-1/4">
            <h3 className="text-3xl font-semibold text-red-600">Quick Links</h3>
            <div className="mt-4">
              <ul className="space-y-3">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>Services</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="grow-0 shrink-0 text-white basis-[100%] mt-10 sm:mt-16 sm:basis-1/2 xl:mt-0 xl:pl-6 xl:basis-1/4">
            <h3 className="text-3xl font-semibold text-red-600">Contact Us</h3>
            <div className="mt-4">
              <ul className="space-y-3">
                <li>
                  <LocationOnIcon className="mr-2" />
                  {Contents.ContactContents.address}
                </li>
                <li>
                  <CallIcon className="mr-2" />
                  <a href={`tel:${Contents.ContactContents.contact1}`}>
                    {Contents.ContactContents.contact1}
                  </a>
                  ,&nbsp;
                  <a href={`tel:${Contents.ContactContents.contact2}`}>
                    {Contents.ContactContents.contact2}
                  </a>
                </li>
                <li>
                  <a href={Contents.ContactContents.facebook}>
                    <FacebookIcon className="mr-2" /> facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grow-0 shrink-0 text-white basis-[100%] sm:mt-16 md:pl-16 xl:mt-0 xl:pl-10 sm:basis-1/2 xl:basis-1/4">
            <h3 className="text-3xl font-semibold text-red-600">&nbsp;</h3>
            <div className="mt-4">
              <p>Stay updated of our news and offers!!</p>
              <form onSubmit={newsletterHandler} className="mt-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-2 text-black text-lg rounded-md focus:outline-none"
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="text-red-600 cursor-pointer p-2 transition hover:text-red-700 visited:text-red-700"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="container p-4 text-white flex justify-center gap-10 underline underline-offset-4 text-sm">
          <a href="">Terms & conditions</a>
          <a href="">Privacy Policies</a>
        </div>
        <div className="container p-4 text-white">
          <div className="w-fit mx-auto text-xs">
            All rights reserved | &copy; Friendship Rental Service
          </div>
        </div>
      </footer>
    </>
  );
}
