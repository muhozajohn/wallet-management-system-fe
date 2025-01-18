import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
const Homelayout = () => {
  return (
    <div>
      <Navbar />
     
      <div className="px-20 w-[90%] mx-auto flex justify-center flex-col min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold">Sign In to Get our service</h1>
            <p>
              Enter your credentials to access your wallet and manage your
              transactions with ease.
            </p>
            <p>
              If you don't have an account, you can{" "}
              <Link to="/signup" class="text-blue-500">
                register here
              </Link>
              .
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Homelayout;
