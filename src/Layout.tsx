import React, { ReactNode } from "react";
import Nav from "./components/Layout/Navigation/Nav";
import "./global.css";

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
