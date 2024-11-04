import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Test from "../pages/test";
import Profile from "../pages/Profile";
import Header from "../components/Header";
import NotFound from "../pages/NotFound";
import Services from "../pages/Services";
import Catering from "../components/Catering";
import Rental from "../components/Rental";
import Contact from "../pages/Contact";
import Dashboard from "../admin/Dashboard";
import AdminLogin from "../admin/AdminLogin";
import RentalLists from "../admin/components/RentalLists";
import CateringLists from "../admin/components/CateringLists";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="services/" element={<Services />}>
          <Route index element={ <Catering />} />
          <Route path="rental" element={ <Rental />} />
        </Route>

        <Route path="/test" element={<Test />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/contact-us" element={<Contact />} />
      </Route>
      
      {/* admin routes */}
      <Route path="admin/" element={<AdminLogin />} />
      <Route path="admin/dashboard" element={<Dashboard />} >
        <Route path="rental-lists" element={<RentalLists />} />
        <Route path="catering-lists" element={<CateringLists />} />
      </Route>
      
      <Route path="*" element={<NotFound />} /> {/* for url that is not mentioned in the navbar */ }
    </Routes>
  );
}
