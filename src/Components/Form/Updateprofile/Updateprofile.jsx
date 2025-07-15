import React from 'react';
import Button from '../../../Shared/Button/Button';
import { toast } from 'react-toastify';
import { updateProfile } from "firebase/auth";

const Updateprofile = ({ setshowModal, user }) => {
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    try {
      await updateProfile(user, { displayName: name, photoURL });
      await user.reload();
      toast.success('Profile updated!');
      setshowModal(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl p-6">
        <div className="flex justify-center">
          <h1 className="text-lg font-bold mb-4 text-gray-800 border-b-2 border-lime-500 inline-block">
            Update Profile
          </h1>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Update Your Name"
            className="w-full px-4 py-3 border border-lime-500 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
          />

          {/* Photo URL */}
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="w-full px-4 py-3 border border-lime-500 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 flex-wrap">
            <Button onClick={() => setshowModal(false)} label="Cancel" />
            <Button outline={true} label="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;
