import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod.jsx";
import { HOST_URL } from "../../Constant.js";
import { userRequest } from "../../requestMethod.jsx";
import { SubComments } from "./SubComments.jsx";

function ShowAllComments({ videoId, check }) {
  const [comments, setcomments] = useState([]);
  const [commentsDropId, setcommentsDropId] = useState();
  const [AllcommentsDropId, setAllcommentsDropId] = useState();
  const [content, Setcontent] = useState("");
  const [Drop, setDrop] = useState(false);
  const [DropAllComments, setDropAllComments] = useState(false);

  const CommentsOnComment = (commentId) => {
    setDrop(!Drop);
    if (Drop === true) {
      Setcontent("");
    }
    setcommentsDropId(commentId);
  };

  const Commented = async (commentId) => {
    try {
      console.log(
        "This is a commentId on which Sub comment is happenig-",
        commentId
      );
      const commentResponse = await userRequest
        .post(`${HOST_URL}/api/v1/comments/addCommentToComment`, {
          content,
          parentCommentId: commentId,
          videoId: videoId,
        })
        .then((res) => res.data);
      Setcontent("");
      console.log(commentResponse);
      setcheck(!check);
    } catch (error) {
      console.log("Error while Comment", error);
    }
  };

  const ToggleAllCommentStatus = (CommentId) => {
    setAllcommentsDropId(CommentId);
    setDropAllComments(!DropAllComments);
  };

  useEffect(() => {
    const FindAllComments = async () => {
      const Comments = await publicRequest
        .get(`${HOST_URL}/api/v1/comments/getVideoComments/${videoId}`)
        .then((res) => res.data.data);
      console.log("Comments are-", Comments);
      setcomments(Comments);
    };

    FindAllComments();
  }, [videoId, check]);

  return (
    <div className="text-white">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-[#3F3F3F] py-4"
        >
          <div className="w-12 h-12 overflow-hidden rounded-full flex justify-start ">
            <img
              src={comment.owner.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col w-full ">
            <p className=" font-semibold text-md">@{comment.owner.username}</p>
            <p className="text-white text-lg">{comment.content}</p>
            <button
              onClick={() => CommentsOnComment(comment?._id)}
              className="text-white hover:bg-[#3F3F3F] mt-1 w-12 p-1 rounded-2xl text-sm"
            >
              Reply
            </button>
            {comment?._id === commentsDropId && (
              <div className={`${Drop ? "block" : "hidden"} text-white mt-3`}>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => Setcontent(e.target.value)}
                    className="w-full border-b-2 border-[#3F3F3F] border-opacity-50 rounded-none py-2 px-3 mb-4 bg-[#0F0F0F] text-white"
                    placeholder="Write a comment..."
                  />
                  <div className="flex gap-4 justify-end">
                    <button className="text-white">Cancel</button>
                    <button
                      onClick={() => Commented(comment?._id)}
                      className="text-white bg-blue-400 hover:bg-blue-500 border border-solid border-blue-500 rounded-md px-3 py-1 text-md"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              className="text-blue-500  w-full rounded-xl flex justify-end"
              onClick={() => ToggleAllCommentStatus(comment?._id)}
            >
              All Comments
            </button>

            {comment?._id === AllcommentsDropId && DropAllComments && (
              <SubComments
                parentCommentId={comment?._id}
                videoId={videoId}
                className={`${DropAllComments ? "block" : "hidden"}`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { ShowAllComments };
