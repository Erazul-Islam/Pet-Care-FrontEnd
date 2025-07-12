/* eslint-disable prettier/prettier */
import { Avatar } from "@nextui-org/react";
import React from "react";

import { useUser } from "@/src/context/user.provider";
import { TComment } from "@/src/types";

export type TPost = {
  _id : string
  userName: string,
  userId: string,
  userProfilePhoto: string,
  userEmail: string,
  caption: string,
  isPremium : string,
  isPublished : boolean,
  description: string,
  photo: string,
  category: string,
  comments : TComment[]
}

interface CommentSectionProps {
  commentText : Record<string,string>
  setCommentText :  React.Dispatch<React.SetStateAction<Record<string, string>>>
  handleDeleteComment : (postId: string, commentId: string) => void,
  post : TPost,
  handleAddComment : (postId: string) => void
  openEditModal : (postId: string, commentId: string, commentText: string) => void
}

const CommentSection : React.FC<CommentSectionProps> = ({
  commentText,
  handleDeleteComment,
  setCommentText,
  post,
  handleAddComment,
  openEditModal,
}) => {
  const { user } = useUser();

  return (
    <div>
      <div className="mt-4">
        <input
          className="w-full border bg-transparent rounded-md px-3 py-2 focus:outline-none"
          placeholder="Write a comment..."
          value={commentText[post._id] || ""}
          onChange={(e) =>
            setCommentText((prev) => ({
              ...prev,
              [post._id]: e.target.value,
            }))
          }
        />
        <button
          className="bg-pink-700  text-white px-4 py-1 rounded-sm mt-4"
          onClick={() => handleAddComment(post._id)}
        >
          Add Comment
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-4">
        {post.comments.map((comment: TComment) => (
          <div
            key={comment._id}
            className="flex justify-between items-center mt-2 border-t pt-2"
          >
            <div className="flex gap-4">
              <Avatar src={comment?.userProfilePhoto} />
              <p className="mt-2">{comment.text}</p>
            </div>
            <div>
              {user?._id !== comment.userId ? null : (
                <>
                  <button
                    className="text-blue-500"
                    onClick={() =>
                      openEditModal(post._id, comment._id, comment.text)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDeleteComment(post._id, comment._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
