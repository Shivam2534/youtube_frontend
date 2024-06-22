import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethod.jsx";
import { NavLink } from "react-router-dom";
import { Your_videos } from "./Your_videos.jsx";
import {HOST_URL} from '../../Constant.js'

const Your_channel_profile = () => {
  const [data, setData] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchData = async () => {
      console.log("function called");
      const fetcheddata = await userRequest
        .get(`${HOST_URL}/api/v1/users/c/${userData.username}`)
        .then((res) => res.data)
        .catch((error) => console.log(error));

      setData(fetcheddata);
      console.log("fetched Data is -", fetcheddata);
    };

    fetchData()
  }, []);

  return data ? (
    <div className="flex flex-col bg-[#0F0F0F] p-8 rounded-2xl shadow-xl text-white ml-16 gap-3">
      <div className=" flex gap-8">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className="w-36 h-36 overflow-hidden rounded-full">
            <img
              src={data?.data.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className=" flex flex-col p-2">
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-white">
              {data?.data.FullName}
            </h1>
            <p className="text-gray-400 p-1">@{data?.data.username}</p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <p className="text-gray-400 ml-1">
                Subscribers
                <span className="ml-8">{data?.data.subscribersCount}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <p className="text-gray-400 ml-1">
                SubscribedTo{" "}
                <span className="ml-4">
                  {data?.data.channelSubscribedToCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center ">
        <p className="text-gray-400">Email:</p>
        <p className="text-gray-300 ml-2">{data.data.email}</p>
      </div>

      <div className="flex gap-7 ">
        <NavLink>Home</NavLink>
        <NavLink to={"/shorts"}>Shorts</NavLink>
        <NavLink to={"/playlist"}>Playlist</NavLink>
      </div>
      <hr />
      <Your_videos id={data.data._id} />
    </div>
  ) : userData ? (
    <div className=" text-white m-8">Please Wait...</div>
  ) : (
    <div className=" text-white m-8">Please login ...</div>
  );
};

export { Your_channel_profile };
