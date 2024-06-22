import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod.jsx";
import { Avatar_component } from "../Home/Avatar_component.jsx";
import { Fullname_feching_component } from "../Home/Fullname_feching_component.jsx";
import { HOST_URL } from "../../Constant.js";
import { CiMenuKebab } from "react-icons/ci";

function Your_videos({ id }) {
  const [Homevideos, setHomevideos] = useState([]);
  const [ToggleMenu, setToggleMenu] = useState(null);

  const toggleMenusection = (index) => {
    setToggleMenu(index);
  };

  useEffect(() => {
    const getAllVideos_of_currentUser = async () => {
      const videos = await userRequest
        .get(`${HOST_URL}/api/v1/videos/homevideos/${id}`)
        .then((res) => res.data.data)
        .catch((error) =>
          console.log("Error while fetching your videos", error)
        );
      setHomevideos(videos);
    };

    getAllVideos_of_currentUser();
  }, []);

  return (
    Homevideos && (
      <div className="flex gap-5">
        {Homevideos.map((video, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/6 pt-4"
            id={index}
            onDoubleClick={() => ReadyToPlayVideo(video._id)}
          >
            <video
              src={video.videoFile}
              className="w-full h-auto rounded-xl aspect-w-16 aspect-h-9 text-white "
              controls
            />
            <div className="flex mt-1 gap-3">
              <div>
                <Avatar_component
                  user_id={video.owner}
                  views={video.views}
                  title={video.title}
                  description={video.description}
                />
              </div>
              <div className="text-white w-full">
                <p>
                  {video.title} | <span>{video.description}</span>
                </p>

                <p className=" relative flex items-center gap-1">
                  <Fullname_feching_component user_id={video.owner} />{" "}
                  <div className="flex justify-end w-44">
                    {ToggleMenu === null ? (
                      <CiMenuKebab onClick={() => toggleMenusection(index)} />
                    ) : (
                      "?"
                    )}
                  </div>
                  <div
                    className={`${
                      ToggleMenu === index ? "block" : "hidden"
                    } absolute translate-x-72 translate-y-11`}
                  >
                    <ul className="flex flex-col gap-1">
                      <li>Delete</li>
                      <li>Edit</li>
                    </ul>
                  </div>
                </p>

                <p>{video.views} views</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export { Your_videos };
