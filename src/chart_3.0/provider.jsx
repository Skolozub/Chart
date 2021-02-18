import React from "react";

export const PropsContext = React.createContext();

const ProviderComponent = ({ value, children }) => {
  return (
    <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
  );
};

export const Provider = React.memo(ProviderComponent);
