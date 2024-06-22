import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OpenSideMenubar } from "../../Store/AllStates.js";
import { publicRequest, userRequest } from "../../requestMethod.jsx";
import { HiMiniBellAlert } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { HOST_URL } from "../../Constant.js";
import { PushData } from "../../Store/AllStates.js";
import { useNavigate } from "react-router-dom";
import { ShowAllComments } from "./ShowAllComments.jsx";

function Video_play_section() {
  const video = useSelector((state) => state.AllStates.VideoData);
  const userData = useSelector((state) => state.auth.userData);
  const [videoInfo, setVideoInfo] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setcheck] = useState(false);
  const [LikeData, setLikeData] = useState(0);
  const [RandomVidoes, setRandomVidoes] = useState([]);
  const [CommentString, SetCommentString] = useState("");
  let ToggleSideBarstatus = useSelector(
    (state) => state.AllStates.SideBarToggle
  );
  if (!ToggleSideBarstatus) {
    dispatch(OpenSideMenubar(!ToggleSideBarstatus));
  }

  const ToggleSubscribtionstatus = async () => {
    try {
      const togglestatus = await userRequest
        .post(
          `${HOST_URL}/api/v1/subscribtions/toggleSubscription/${video?.owner}`
        )
        .then((res) => res.data);
      setcheck(!check);
    } catch (error) {
      console.log("Error in ToggleSubscribtionstatus", error);
    }
  };

  const VideoGetLiked = async (video) => {
    console.log("This is video--", video);
    try {
      const likeResponse = await userRequest
        .post(`${HOST_URL}/api/v1/likes/toggleVideoLike/${video?._id}`)
        .then((res) => res.data.data);
      console.log("Like response--", likeResponse);
      setLikeData(likeResponse);
      setcheck(!check);
    } catch (error) {
      console.log("Error in VideoGetLiked function", error);
    }
  };

  const GetRandomVideos = async () => {
    const RandomVideos = await publicRequest
      .get(`${HOST_URL}/api/v1/videos/getrandomvideos`)
      .then((res) => res.data.data);
    // console.log("Random videos-", RandomVideos);
    setRandomVidoes(RandomVideos);
  };

  const ChangeVideoinVideoPlaySection = (video) => {
    dispatch(PushData(video));
    fetchVideoOwnerData(video.owner[0]._id);
  };

  const fetchVideoOwnerData = async (videoOwner) => {
    try {
      const userData = await userRequest
        .get(`${HOST_URL}/api/v1/users/getchannelbyId/${videoOwner}`)
        .then((res) => res.data.data);

      // console.log("Owner Data-", userData);
      setVideoInfo(userData);
    } catch (error) {
      console.log("Error while fetchVideoOwnerData", error);
    }
  };

  const Commented = async () => {
    try {
      console.log(CommentString);
      const commentResponse = await userRequest
        .post(`${HOST_URL}/api/v1/comments/addComment/${video?._id}`, {
          CommentString,
        })
        .then((res) => res.data);
      SetCommentString("");
      setcheck(!check);
    } catch (error) {
      console.log("Error while Comment", error);
    }
  };

  useEffect(() => {
    if (video?.owner) {
      fetchVideoOwnerData(video.owner);
    }
  }, [check]);

  useState(() => {
    GetRandomVideos();
  }, []);

  return (
    <div className="flex pt-7 items-start gap-7 justify-center">
      <div className="flex flex-col w-7/12 ">
        <video
          src={video?.videoFile}
          className={`w-full rounded-xl aspect-w-16 aspect-h-9 text-white`} // w-full h-auto
          controls
          autoPlay
        />
        {/* // this i profile description */}
        <div className="flex flex-col gap-2">
          <div>
            <p className=" text-white font-bold text-2xl">
              {video?.title} | <span>{video?.description}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <div className=" w-12 h-12 overflow-hidden rounded-full">
              <img
                src={videoInfo?.avatar}
                alt="gey"
                className=" w-full h-full rounded-xl aspect-w-16 aspect-h-9 text-white object-cover "
              />
            </div>
            <div className=" flex gap-7">
              <div>
                <p className=" text-white font-serif ">
                  @{videoInfo?.username}
                </p>
                <p className=" text-white font-serif">
                  {videoInfo?.subscribersCount} subscribers
                </p>
              </div>
              <button className=" text-white flex items-center gap-2 font-serif text-md bg-[#3F3F3F] p-2 rounded-3xl">
                <HiMiniBellAlert />{" "}
                <button onClick={ToggleSubscribtionstatus}>
                  {videoInfo?.issubscribed ? "Subscribed" : "Subscribe"}
                </button>
              </button>
            </div>

            <div className="flex items-center ml-72 gap-10">
              <div className=" text-white flex text-2xl gap-4 items-center">
                <button
                  onClick={() => VideoGetLiked(video)}
                  className="flex items-center gap-3 text-white"
                >
                  <BiLike />
                  {LikeData}
                </button>
                <span className="flex items-center gap-2">
                  {" "}
                  |<BiDislike />
                </span>
              </div>
              <div className=" text-white flex items-center justify-center gap-2 text-xl   bg-[#3F3F3F] p-2 rounded-3xl">
                <AiOutlineEye />
                <span className="flex align-middle gap-2">
                  {video?.views} <span>views</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* this is Comment Section */}
        <div className="mt-7">
          <div className="text-white text-xl">Comments</div>
          <div className="flex gap-3 mt-5">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <img
                src={userData?.avatar}
                alt="User Avatar"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={CommentString}
                onChange={(e) => SetCommentString(e.target.value)}
                className="w-full border-b-2 border-[#3F3F3F] border-opacity-50 rounded-none py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
                placeholder="Write a comment..."
              />
              <div className="flex gap-4 justify-end">
                <button className="text-white">Cancel</button>
                <button
                  onClick={Commented}
                  className="text-white bg-blue-400 hover:bg-blue-500 border border-solid border-blue-500 rounded-md px-3 py-1 text-md"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
          {/* Desplying comments here */}
          <div>
            <ShowAllComments videoId={video?._id} check={check} />
          </div>
        </div>
      </div>

      <div className="text-white w-96 border border-[#3F3F3F] rounded-2xl">
        <div className="text-2xl bg-[#212121] rounded-tl-2xl rounded-tr-2xl py-5 pl-2">
          Video Suggestions
        </div>
        <div className="p-2 flex flex-col gap-5 cursor-pointer">
          {RandomVidoes.map((video, index) => (
            <div key={index} className="flex gap-3 w-full ">
              <div className="w-1/2">
                <video
                  src={video?.videoFile}
                  controls
                  className="w-full h-full"
                  onClick={() => ChangeVideoinVideoPlaySection(video)}
                />
              </div>
              <div className="w-1/2">
                <p>
                  {video.title} | {video.description}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 overflow-hidden rounded-full flex">
                    <img
                      src={video.owner[0].avatar}
                      alt="404"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p>{video.owner[0].username}</p>
                </div>
                <p>{video.views} Views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Video_play_section };

// ml-96
