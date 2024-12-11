import { MappingsProvider } from "./contexts/MappingContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import Mapping from "./pages/Mapping";
import Home from "./pages/Home";
import DigitalProducts from "./pages/DigitalProducts";
import Navigation from "./components/layout/Navigation";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import CheckOut from "./pages/CheckOut";
import Footer from "./components/layout/Footer";
import PhysicalProducts from "./pages/PhysicalProducts";

function App() {
  return (
    <MappingsProvider>
      <main className="w-screen pl-[7vw] min-h-screen relative">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/orders/:id/mapping" element={<Mapping />} />
            <Route path="/orders/:id/checkout" element={<CheckOut />} />
            <Route path="/digital-products" element={<DigitalProducts />} />
            <Route path="/physical-products" element={<PhysicalProducts />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          <Footer />
        </Router>
        <Toaster duration={2500} position="bottom-left" />
      </main>
    </MappingsProvider>
  );
}

export default App;
