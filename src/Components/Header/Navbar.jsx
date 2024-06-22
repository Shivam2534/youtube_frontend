import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillPlaySquare } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";
import { CiMenuKebab } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { setSearchQuery } from "../../Store/User_channel_data.js";
import { OpenSideMenubar } from "../../Store/AllStates.js";
import yt from "../../../public/yt.jpg";

function Navbar() {
  const isUserAuthenticated = useSelector((state) => state.auth.userStatus);
  const Togglevalue = useSelector((state) => state.AllStates.SideBarToggle);
  const userData = useSelector((state) => state.auth.userData);
  const [query, setquery] = useState("");
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToggleSideMenuBar = () => {
    dispatch(OpenSideMenubar(!Togglevalue));
  };

  const handleSearch = async (e) => {
    // console.log(e.target.value);
    e.preventDefault();

    let url = new URLSearchParams(e.target.value).toString();
    url = url.slice(0, url.length - 1);
    history.push("/?username=" + url);

    dispatch(setSearchQuery(query));
    navigate("/channel_profile");
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleSearch(e);
    }
  };

  const NavItems = [
    {
      name: (
        <div className="flex items-center gap-2 border border-[#303030] rounded-md p-1">
          {" "}
          <AiFillPlaySquare /> Upload Video
        </div>
      ),
      slug: "/upload_video",
      active: isUserAuthenticated,
    },
    {
      name: <IoNotificationsOutline />,
      slug: "/",
      active: isUserAuthenticated,
    },
    {
      name: userData ? (
        <img src={userData.avatar} alt="404" className="w-8 h-8 rounded-full" />
      ) : (
        "Welcome..."
      ),
      slug: "/settings",
      active: isUserAuthenticated,
    },
    {
      name: (
        <div>
          <PiUserCircleLight className="inline-block mr-1 size-5" />
          Sign up
        </div>
      ),
      slug: "/register",
      active: !isUserAuthenticated,
    },
    {
      name: (
        <div>
          <PiUserCircleLight className="inline-block mr-1 size-5"/>
          log in
        </div>
      ),
      slug: "/login",
      active: !isUserAuthenticated,
    },
    {
      name: <CiLogout />,
      slug: "/logout",
      active: isUserAuthenticated,
    },
    {
      name: <CiMenuKebab className="size-5 mt-2"/>,
      slug: "/settings",
      active: !isUserAuthenticated,
    },
  ];
  return (
    <div className=" bg-[#000000] text-white h-20 py-5 px-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center gap-2">
        <AiOutlineMenu onClick={ToggleSideMenuBar} className=" size-6" />
        <img src={yt} alt="Youtube" className="h-20" onClick={'/'}/>
      </div>
      <div className="w-1/3">
        <form>
          <input
            type="search"
            name="username"
            placeholder="Search yourself..."
            className="w-full h-11 border border-[#303030] text-white bg-[#121212] rounded-3xl px-5"
            onChange={(e) => setquery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </form>
      </div>
      <div>
        <ul className="flex items-center justify-center space-x-8">
          {NavItems.map(
            (item, index) =>
              item.active && (
                <li key={index} className=" text-lg font-semibold">
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export { Navbar };
