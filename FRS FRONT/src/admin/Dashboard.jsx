import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { handleLogout } from "../functions/userAuth";
import AdminHeader from "./components/AdminHeader";
import { useEffect, useState } from "react";
import { getCookie, isCookieExpired } from "../functions/cookie";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function logout() {
    handleLogout();
    setIsLoggedIn(false);
  }

  const checkLogin = () => {
    if (isCookieExpired("auth_token").expired || !getCookie("auth_token")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please Login!!");
      navigate("/admin");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="flex h-lvh">
        <div className="bg-zinc-300 px-4 py-6 basis-1/6">
          <ul className="font-sans text-lg">
            <li className="py-2">
              <NavLink
                to="rental-lists"
                className={({ isActive }) =>
                  isActive ? "text-slate-700 underline underline-offset-4" : ""
                }
              >
                Rental Lists
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink
                to="catering-lists"
                className={({ isActive }) =>
                  isActive ? "text-slate-700 underline underline-offset-4" : ""
                }
              >
                Catering Lists
              </NavLink>
            </li>
            <li className="py-2">
              <button onClick={logout}>
                Log Out <LogoutTwoToneIcon />
              </button>
            </li>
          </ul>
        </div>
        <div className="basis-5/6 pt-6 px-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
