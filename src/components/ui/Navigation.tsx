import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

export default function Navigation() {
  const location = useLocation(); // Get the current location

  // Hide nav when the route is "/"
  if (location.pathname === "/") return null;
  return (
    <nav className="fixed left-0 top-0 flex h-full min-w-20 max-w-[7vw] flex-col items-center gap-y-3 justify-center text-sm border border-r-violet-800 z-50 bg-white">
      <Link
        to="/"
        className="text-violet-800 w-full py-1 px-2 text-center hover:text-violet-900"
      >
        Home
      </Link>
      <div className="h-[0.5px] w-full bg-violet-800 "></div>
      <Link
        to="/orders"
        className="text-violet-800 w-full py-1 px-2 text-center hover:text-violet-900"
      >
        Orders
      </Link>
      <div className="h-[0.5px] w-full bg-violet-800"></div>
      <Link
        to="/digital-products"
        className="text-violet-800 w-full py-1 px-2 text-center hover:text-violet-900"
      >
        Digitals
      </Link>
      <div className="h-[0.5px] w-full bg-violet-800"></div>
      <Link
        to="/physical-products"
        className="text-violet-800 w-full py-1 px-2 text-center hover:text-violet-900"
      >
        Physicals
      </Link>
    </nav>
  );
}
