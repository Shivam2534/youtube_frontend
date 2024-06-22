import React, { useState } from "react";
import { publicRequest } from "../../requestMethod.jsx";
import { HOST_URL } from "../../Constant.js";

function SubComments({ parentCommentId, videoId }) {
  const [SubComments, setSubComments] = useState([]);

  useState(() => {
    const FindAllSubComments = async () => {
      const subComments = await publicRequest
        .get(`${HOST_URL}/api/v1/comments/getAllCommentComments`, {
          params: { parentCommentId, videoId },
        })
        .then((res) => res.data.data);
      console.log(subComments);
      setSubComments(subComments);
    };

    FindAllSubComments();
  }, [parentCommentId, videoId]);
  return (
    <div className="text-white flex flex-col">
      {SubComments.map((comment, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-[#3F3F3F] py-4"
        >
          <div className="w-8 h-8 overflow-hidden rounded-full">
            <img
              src={comment.owner.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className=" font-semibold text-md">@{comment.owner.username}</p>
            <p className="text-white text-lg">{comment.content}</p>
            <button
              onClick={() => CommentsOnComment(comment?._id)}
              className="text-white hover:bg-[#3F3F3F] mt-1 w-12 p-1 rounded-2xl text-sm"
            >
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { SubComments };
