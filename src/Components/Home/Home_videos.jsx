import React, { useEffect, useState, useRef } from "react";
import { publicRequest, userRequest } from "../../requestMethod.jsx";
import { Avatar_component } from "./Avatar_component.jsx";
import { useSelector } from "react-redux";
import { Fullname_feching_component } from "./Fullname_feching_component.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PushData } from "../../Store/AllStates.js";
import { HOST_URL } from "../../Constant.js";
import CircularProgress from "@mui/material/CircularProgress";

function Home_videos() {
  const [AllVideos, setAllVideos] = useState([]);
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const Togglevalue = useSelector((state) => state.AllStates.SideBarToggle);

  const GetAllVideos = async () => {
    setloading(true);
    try {
      const VideosData = await publicRequest
        .get(`${HOST_URL}/api/v1/videos/getallvideos`)
        .then((res) => res.data.data);

      setAllVideos(VideosData);
      console.log("VideoData is-", VideosData);
    } catch (error) {
      console.error("Error fetching Home videos:", error);
    } finally {
      setloading(false);
    }
  };

  const ReadyToPlayVideo = async ({ video }) => {
    navigate("/Home_video");
    dispatch(PushData(video));
    const userData = await userRequest
      .post(`${HOST_URL}/api/v1/users/Push_video_to_WatchHistory/${video._id}`)
      .then((res) => res.data);
  };

  useEffect(() => {
    GetAllVideos();
  }, []);

  return loading ? (
    <div className="text-white w-full h-screen flex items-center justify-center">
      {" "}
      <CircularProgress color="inherit" />
    </div>
  ) : (
    <div>
      <div className="flex flex-wrap p-12 bg-[#000000]">
        {AllVideos.map((video, index) => (
          <div
            key={index}
            className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 ${
              Togglevalue ? "xl:w-1/4" : "xl:w-1/3"
            }`}
            id={index}
            onDoubleClick={() => ReadyToPlayVideo({ video })}
          >
            <div className="relative w-full h-52 transition-opacity duration-[1000000ms] ease-in-out">
              <video
                ref={videoRef}
                src={video?.videoFile}
                controls
                muted
                className="w-full h-full absolute z-0 top-0 opacity-0 hover:opacity-100 hover:z-[1] rounded-xl aspect-w-16 aspect-h-9 text-white object-contain"
              />
              <img
                src={video.thumbnail}
                alt="Thumbnail"
                className="w-full h-full px-2 py-1 z-[1] opacity-100 hover:z-[0] hover:opacity-0 rounded-xl object-cover"
              />
            </div>

            <div className="flex gap-4">
              <div>
                <Avatar_component
                  user_id={video.owner}
                  views={video.views}
                  title={video.title}
                  description={video.description}
                />
              </div>
              <div className="text-white">
                <p>
                  {video.title} | <span>{video.description}</span>
                </p>

                <p className="flex items-center gap-1">
                  <Fullname_feching_component user_id={video.owner} />{" "}
                </p>

                <p>{video.views} views</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )
    </div>
  );
}

export { Home_videos };
