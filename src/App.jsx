import { Navbar } from "./Components/Header/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { Footer } from "./Components/Footer/Footer.jsx";
import { Side_Navbar } from "./Components/Side_menubar/Side_Navbar.jsx";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
function App() {
  const Togglevalue = useSelector((state) => state.AllStates.SideBarToggle);

  return (
    <div className="">
      <Navbar />
      <main className=" flex bg-[#0F0F0F]">
        <div className={`w-${Togglevalue ? "10" : "56"} bg-[#000000] `}>
          <Side_Navbar />
        </div>

        <div className={`flex-1 mt-16 `}>
          <Outlet />
        </div>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
