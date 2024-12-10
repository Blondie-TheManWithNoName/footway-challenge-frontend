import { MappingsProvider } from "./contexts/MappingContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import Mapping from "./Mapping";
import Home from "./components/ui/Home";
import DigitalProducts from "./components/ui/DigitalProducts";
import Navigation from "./components/ui/Navigation";
import Orders from "./components/ui/Orders";
import Order from "./components/ui/Order";
import CheckOut from "./components/ui/CheckOut";
import Footer from "./components/ui/Footer";
import PhysicalProducts from "./components/ui/PhysicalProducts";

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
