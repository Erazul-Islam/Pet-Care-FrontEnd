/* eslint-disable prettier/prettier */
import { Modal, ModalContent, ModalHeader } from "@nextui-org/modal";
import React, { Dispatch, SetStateAction } from "react";

interface FormData {
    name: string;
    address: string;
    intro: string;
    college: string;
    profilePhoto: string;
    mobileNumber: string;
    from: string;
    lives: string;
    university: string;
  }


interface editProfileProps {
    modalVisible : boolean,
    formData : FormData,
    handleChange : (e : React.ChangeEvent<HTMLInputElement>) => void,
    setModalVisible : Dispatch<SetStateAction<boolean>>,
    handleSubmit : (e: React.FormEvent) => void
}

const EditProfileModal : React.FC<editProfileProps> = ({
  modalVisible,
  formData,
  handleChange,
  setModalVisible,
  handleSubmit,
}) => {
  return (
    <Modal className="lg:w-[400px] p-5" isOpen={modalVisible} onOpenChange={() => setModalVisible(false)}>
      <ModalContent>
        <ModalHeader className="items-center justify-center flex">Edit your info</ModalHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              className="border p-2 rounded"
              name="name"
              placeholder="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="address"
              placeholder="Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="intro"
              placeholder="Introduction"
              type="text"
              value={formData.intro}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="college"
              placeholder="College"
              type="text"
              value={formData.college}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="profilePhoto"
              placeholder="profile photo url"
              type="text"
              value={formData.profilePhoto}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="mobileNumber"
              placeholder="Mobile Number"
              type="text"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="from"
              placeholder="From"
              type="text"
              value={formData.from}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="lives"
              placeholder="Lives in"
              type="text"
              value={formData.lives}
              onChange={handleChange}
            />

            <input
              className="border p-2 rounded"
              name="university"
              placeholder="University"
              type="text"
              value={formData.university}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              type="button"
              onClick={() => setModalVisible(false)}
            >
              Cancel
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
