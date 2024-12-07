import { useMappings } from "@/hooks/useMappings";
import React, { createContext, useContext, ReactNode, useState } from "react";

type MappingsContextType = ReturnType<typeof useMappings> & {
  userMapping: any | undefined;
  setUserMapping: React.Dispatch<React.SetStateAction<any | undefined>>;
};

const MappingsContext = createContext<MappingsContextType | undefined>(
  undefined
);

// Create a provider component
export const MappingsProvider = ({ children }: { children: ReactNode }) => {
  const mappingsHook = useMappings();
  const [userMapping, setUserMapping] = useState<any | undefined>(undefined);

  return (
    <MappingsContext.Provider
      value={{ ...mappingsHook, userMapping, setUserMapping }}
    >
      {children}
    </MappingsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useMappingsContext = () => {
  const context = useContext(MappingsContext);

  if (!context) {
    throw new Error(
      "useMappingsContext must be used within a MappingsProvider"
    );
  }

  return context;
};
function getRecomendation(ean: any) {
  throw new Error("Function not implemented.");
}
