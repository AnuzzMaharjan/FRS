import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Catering from "./components/Catering";
import Rental from "./components/Rental";
import TermsConditions from "./pages/TermsConditions";
import Test from "./pages/test";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import RentalLists from "./admin/components/RentalLists";
import CateringLists from "./admin/components/CateringLists";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Subpackage from "./admin/components/Subpackage";


function PageRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isProfile = location.pathname.startsWith("/profile");

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="services/" element={<Services />}>
            <Route index element={<Catering />} />
            <Route path="rental" element={<Rental />} />
          </Route>

          <Route path="/terms&conditions" element={<TermsConditions />} />

          <Route path="/test" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<Contact />} />
        </Route>
        {/* admin routes */}
        <Route path="admin/" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<Dashboard />}>
          <Route path="rental-lists" element={<RentalLists />} />
          <Route path="catering-lists" element={<CateringLists />} >
            <Route path=":pkgId" element={<Subpackage/>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        {/* for url that is not mentioned in the navbar */}
      </Routes>
      {!isAdminRoute &&! isProfile && <Footer />}
    </>
  )
}

function App() {

  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

export default App;
