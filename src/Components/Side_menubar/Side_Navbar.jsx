import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LuUserCircle2 } from "react-icons/lu";
import { GrHistory } from "react-icons/gr";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { TbMathGreater } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Side_Navbar() {
  const toggleStatus = useSelector((state) => state.AllStates.SideBarToggle);
  console.log("toggleStatus-", toggleStatus);

  return toggleStatus ? (
    <nav className="flex flex-col pl-4 text-white shadow-md w-12 mt-20  gap-5">
      <div className="flex flex-col gap-5">
        <Link to={"/"}>
          <AiFillHome className="text-2xl" />
        </Link>
        <Link>
          <SiYoutubeshorts className="text-2xl" />
        </Link>
        <Link>
          <MdOutlineSubscriptions className="text-2xl" />
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <Link to={"/Your_channel_profile"}>
          <LuUserCircle2 className="text-2xl" />
        </Link>
        <Link to={"/watchHistory"}>
          <GrHistory className="text-2xl" />
        </Link>
        <Link>
          <BiSolidVideos className="text-2xl" />
        </Link>
        <Link>
          <MdOutlineWatchLater className="text-2xl" />
        </Link>
      </div>
    </nav>
  ) : (
    <nav className="flex flex-col pl-4 bg-[rgb(0,0,0)] text-white shadow-md w-56 mt-20 ">
      <div className="flex flex-col ">
        <Link to={"/"}>
          <div className="flex items-center space-x-4 p-2 bg-[#222222] rounded-xl">
            <AiFillHome className="text-xl" />
            <span className="text-lg font-medium">Home</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4 p-2">
          <SiYoutubeshorts className="text-xl" />
          <span className="text-lg font-medium">Shorts</span>
        </div>
        <div className="flex items-center space-x-4 p-2">
          <MdOutlineSubscriptions className="text-xl" />
          <span className="text-lg font-medium">Subscriptions</span>
        </div>
      </div>
      <hr className="mt-2 p-2" />
      <div className="flex flex-col ">
        <div className="flex items-center space-x-4 text-lg font-medium">
          You{" "}
          <span className="ml-1">
            <TbMathGreater className="text-xl" />
          </span>
        </div>
        <Link to={"/Your_channel_profile"}>
          <div className="flex items-center space-x-4 p-2">
            <LuUserCircle2 className="text-xl" />
            <span className="text-lg font-medium">Your channel</span>
          </div>
        </Link>

        <Link to={"/watchHistory"}>
          <div className="flex items-center space-x-4 p-2">
            <GrHistory className="text-xl" />
            <span className="text-lg font-medium"> Watch history</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4 p-2">
          <BiSolidVideos className="text-xl" />
          <span className="text-lg font-medium">Your videos</span>
        </div>
        <div className="flex items-center space-x-4 p-2">
          <MdOutlineWatchLater className="text-xl" />
          <span className="text-lg font-medium">Watch Later</span>
        </div>
        <hr className="mt-2 p-2" />
        <div className="flex flex-col">
          <div className="flex ">
            <span className="text-lg font-medium">Subscriptions</span>
          </div>
          <div className="p-2">
            <span className="text-lg font-medium">Channel Name</span>
          </div>
          <div className="p-2">
            <span className="text-lg font-medium">Channel Name</span>
          </div>
          <div className="p-2">
            <span className="text-lg font-medium">Channel Name</span>
          </div>
          <div className="p-2">
            <span className="text-lg font-medium">Channel Name</span>
          </div>
          <div className="p-2">
            <span className="text-lg font-medium">Channel Name</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 p-2 mt-20">
            <FiSettings className="text-xl" />
            <span className="text-lg font-medium">Settings</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Side_Navbar };
