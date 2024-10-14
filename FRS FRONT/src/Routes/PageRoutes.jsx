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

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />}>
          <Route index element={ <Catering />} />
          <Route path="/services/rental" element={ <Rental />} />
        </Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} /> {/* for url that is not mentioned in the navbar */ }
    </Routes>
  );
}
