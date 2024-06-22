import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import { useSelector } from "react-redux"; 
import {HOST_URL} from '../../Constant.js'

function Get_WatchHistory() {
  const [watchHistory, setwatchHistory] = useState([]);
  const IsUserlogedin = useSelector((state) => state.auth.userStatus);
  console.log(IsUserlogedin);

  useEffect(() => {
    const callForWatchHistory = async () => {
      try {
        const watchHistoryData = await userRequest
          .get(`${HOST_URL}/api/v1/users/watchHistory`)
          .then((res) => res.data.data); // [{},{}]
        console.log("This is your WatchHistory-", watchHistoryData);
        setwatchHistory(watchHistoryData);
      } catch (error) {
        console.error("Error fetching watch history:", error);
      }
    };

    callForWatchHistory();
  }, []);

  return IsUserlogedin ? (
    watchHistory.length > 0 ? (
      <div className="p-8">
        <h1 className="text-white text-2xl font-bold mb-4">Watch History</h1>
        <div className="grid grid-cols-1 gap-8">
          {watchHistory.map((video, index) => (
            <div
              key={index}
              className="flex bg-gray-800 rounded-lg p-4 items-start "
            >
              <video
                src={video.videoFile}
                className=" w-1/4 h-auto rounded-xl aspect-w-16 aspect-h-9 text-white"
                controls
              />
              <div className="ml-5">
                <p className="text-white text-lg mb-2 font-semibold">
                  {video.title} | <span>{video.description}</span>
                </p>
                <div className="flex items-center mb-2">
                  <img
                    src={video.owner.avatar}
                    alt="Owner Avatar"
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <p className="text-gray-400">@{video.owner.username}</p>
                </div>
                <p className="text-gray-400">{video.views} views </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="p-8">
        <h1 className="text-white text-2xl font-bold mb-4">Watch History</h1>
        <h2 className=" text-white font-serif font-bold">
          Watch History Is Empty
        </h2>
      </div>
    )
  ) : (
    <div className="p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Watch History</h1>
      <h2 className=" text-white font-serif font-bold">
        Please login to see Watch History
      </h2>
    </div>
  );
}

export { Get_WatchHistory };
