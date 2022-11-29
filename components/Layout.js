import React from "react";
import BottomNav from "../components/BottomNav";
import Header from "../components/Header";

const Layout = (props) => {
  return (
    <div className="container">
      <Header />
      {props.children}
      <BottomNav />
    </div>
  );
};

export default Layout;
