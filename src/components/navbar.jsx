import React from "react";
import Button from "./button";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="px-20 py-8 fixed w-full flex items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl font-bold">Wallet App</h1>
      </Link>
      <div className="flex gap-3">
        <Button path="/login" title="Login" />
        <Button path="/signup" title="Signup" />
      </div>
    </div>
  );
};

export default Navbar;
