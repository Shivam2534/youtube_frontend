import React, { useState } from "react";
import { userRequest } from "../../requestMethod.jsx";
import { HOST_URL } from "../../Constant.js";

function Upload_video() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState();
  const [thumbnail, setThumbnail] = useState("");

  const UploadVideo = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await userRequest.post(
        `${HOST_URL}/api/v1/videos/publishAvideo`,
        formData
      );
      console.log("data after uploading video-", response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#0F0F0F]shadow-md rounded mt-6 pt-2 px-8 pb-3 border border-[#2C2C2C]">
      <h2 className="text-xl font-bold mb-4 text-white">Upload Video</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-white">
          Title
        </label>
        <input
          className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-white">
          Description
        </label>
        <input
          className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Video File
        </label>
        <input
          className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
      </div>
      <div className="mb-6">
        <label className="block text-white text-sm font-bold mb-2">
          Thumbnail
        </label>
        <input
          className="w-full border-white border rounded-md py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={UploadVideo}
        >
          Upload Video
        </button>
      </div>
    </div>
  );
}

export { Upload_video };
