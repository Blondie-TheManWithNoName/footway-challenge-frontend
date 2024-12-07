import "./App.css";

import { MappingsProvider } from "./contexts/MappingContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Mapping from "./Mapping";
import Home from "./components/ui/Home";

function App() {
  return (
    <MappingsProvider>
      <main className="w-screen h-screen">
        <Router>
          <nav>
            <Link to="/">Home</Link> | <Link to="/mapping">Mapping</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapping" element={<Mapping />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
        {/* <div className="md:hidden flex flex-col items-center w-full">
          <Tabs defaultValue="account" className="max-w-xl w-full">
            <TabsList className="w-full">
              <TabsTrigger value="digital" className="w-full">
                Digital Products
              </TabsTrigger>
              <TabsTrigger value="physical" className="w-full">
                Physical Products
              </TabsTrigger>
            </TabsList>
            <TabsContent value="digital" className="flex flex-col items-center">
              <h2 className="text-xl font-medium">Digital Products</h2>
              <Input className="max-w-sm mt-8" placeholder="Search" />
              <div className="max-w-[22rem] mt-8">
                <ProductPreview />
              </div>
            </TabsContent>
            <TabsContent
              value="physical"
              className="flex flex-col items-center"
            >
              <h2 className="text-xl font-medium">Physical Products</h2>
              <Input className="max-w-sm mt-8" placeholder="Search" />
              <div className="max-w-[22rem] mt-8">
                <ProductPreview />
              </div>
            </TabsContent>
          </Tabs>
        </div> */}
      </main>
    </MappingsProvider>
  );
}

export default App;
