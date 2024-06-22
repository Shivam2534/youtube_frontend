import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiMiniBellAlert } from "react-icons/hi2";
import { publicRequest, userRequest } from "../../requestMethod.jsx";
import { HOST_URL } from "../../Constant.js";
import { useNavigate } from "react-router-dom";

function UserChannelProfile() {
  const searchItem = useSelector((state) => state.Channel_Data.QueryData);
  const [user, setUser] = useState(null);
  const [toggleStatus, setToggleStatus] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserChannelProfile = async () => {
    console.log("Called");
    try {
      const userChannelProfile = await userRequest.get(
        `${HOST_URL}/api/v1/users/c/${searchItem}`
      );
      setUser(userChannelProfile.data);
      // console.log("Channel Id:", userChannelProfile.data.data._id);
      setLoading(false);
      if (userChannelProfile.data) {
        checkSubscriptionStatus(userChannelProfile.data.data._id);
      }
    } catch (error) {
      console.error("Error fetching user channel profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Search item is-", searchItem);
    if (searchItem.trim() !== "") fetchUserChannelProfile();
    else navigate("/");
  }, [searchItem]);

  const toggleSubscription = async () => {
    try {
      const toggleData = await userRequest.post(
        `${HOST_URL}/api/v1/subscribtions/toggleSubscription/${user?.data._id}`
      );

      console.log("Toggle Status is -", toggleData.data);
      setToggleStatus(toggleData.data.data);
      checkSubscriptionStatus(user.data.data._id);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const checkSubscriptionStatus = async (userId) => {
    try {
      const toggle = await userRequest.get(
        `${HOST_URL}/api/v1/subscribtions/IsUserSubscribed/${userId}`
      );
      setToggleStatus(toggle.data.data);
      console.log(toggle.data.data);
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className=" text-white p-10 font-bold">Loading Please Wait...</div>
      ) : user ? (
        <div className="bg-[#0F0F0F] p-8 rounded-2xl shadow-xl text-white ml-16">
          <div className=" flex gap-8 ">
            <div className="flex items-center justify-center mb-4 space-x-4">
              <div className="w-36 h-36 overflow-hidden rounded-full">
                <img
                  src={user?.data.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className=" flex flex-col p-2">
              <div className="flex-grow">
                <h1 className="text-4xl font-bold text-white">
                  {user?.data.FullName}
                </h1>
                <p className="text-gray-400 p-1">@{user?.data.username}</p>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <p className="text-gray-400 ml-1">
                    Subscribers
                    <span className="ml-8">{user?.data.subscribersCount}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <p className="text-gray-400 ml-1">
                    SubscribedTo{" "}
                    <span className="ml-4">
                      {user?.data.channelSubscribedToCount}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-4 justify-between mx-44">
            <div className="flex">
              <p className="text-gray-400">Email:</p>
              <p className="text-gray-300 ml-2">{user?.data.email}</p>
            </div>
            <div
              className={`bg-red-500 text-white py-2 px-4 rounded ${
                user?.data.issubscribed
                  ? "hover:bg-red-600"
                  : "hover:bg-red-400"
              }`}
            >
              <button
                className="flex items-center gap-2"
                onClick={toggleSubscription}
              >
                <HiMiniBellAlert /> {toggleStatus ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
          <hr className="mt-6" />
        </div>
      ) : (
        <div className=" text-white p-10 font-bold">
          Please Login To Search Channel.
        </div>
      )}
    </>
  );
}

export { UserChannelProfile };
