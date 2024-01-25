import React, { ReactNode } from "react";
import Nav from "./components/Layout/Navigation/Nav";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
