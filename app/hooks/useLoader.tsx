import React, { createContext, useContext, useState } from "react";
import { LoaderWrapper } from "~/components/Loader";

interface LoaderContextType {
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export const LoaderProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      <LoaderWrapper />
      {children}
    </LoaderContext.Provider>
  );
};
