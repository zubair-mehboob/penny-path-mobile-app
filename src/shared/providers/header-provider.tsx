// HeaderContext.tsx
import React, { createContext, useContext, useState } from "react";

type HeaderAction = { key: string; element: React.ReactNode };

interface HeaderState {
  title?: string;
  actions?: HeaderAction[];
}

const HeaderContext = createContext({
  header: {} as HeaderState,
  setHeader: (state: HeaderState) => {},
});

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [header, setHeader] = useState<HeaderState>({});
  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
