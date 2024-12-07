import "./App.css";

import { MappingsProvider } from "./contexts/MappingContext";
import Mapping from "./Mapping";

function App() {
  return (
    <MappingsProvider>
      <main className="w-screen h-screen">
        <Mapping />

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
