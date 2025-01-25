import React from "react";
import { useLoader } from "~/hooks/useLoader";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export const LoaderWrapper: React.FC = () => {
  const { showLoader } = useLoader();
  return showLoader ? <Loader /> : null;
};
