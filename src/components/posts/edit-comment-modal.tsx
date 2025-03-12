/* eslint-disable prettier/prettier */
import { Modal, ModalContent } from "@nextui-org/modal";
import React from "react";

const EditCommentModal = ({
  modalVisible,
  setModalVisible,
  setUpdatedCommentText,
  updatedCommentText,
  handleUpdateComment,
}) => {
  return (
    <Modal isOpen={modalVisible} onOpenChange={() => setModalVisible(false)}>
      <ModalContent className="bg-pink-600 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <div>
          <h4 className="text-lg font-semibold mb-4">Edit Comment</h4>
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Update your comment..."
            value={updatedCommentText}
            onChange={(e) => setUpdatedCommentText(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => setModalVisible(false)}
            >
              Close
            </button>
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded-md"
              onClick={handleUpdateComment}
            >
              Update Comment
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditCommentModal;
