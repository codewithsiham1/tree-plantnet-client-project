import React from 'react';
import Button from '../../../Shared/Button/Button';
import { toast } from 'react-toastify';
import { updatePassword } from 'firebase/auth';

const ChangePasswordForm = ({ setshowModal, user }) => {
  const handlechancePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    // password match validation
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return; // add return to stop further execution
    }

    try {
      await updatePassword(user, newPassword);
      toast.success('Password updated successfully!');
      setshowModal(false);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please log in again to change your password.');
      } else {
        toast.error('Failed to update password.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <form
        onSubmit={handlechancePassword}
        className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 shadow-lg"
      >
        <div className="flex justify-center">
          <h2 className="text-lg font-bold text-gray-700 border-b-2 border-lime-500 inline-block pb-1">
            Change Password
          </h2>
        </div>

        {/* New Password */}
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          required
          className="w-full px-4 py-3 border border-lime-500 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-3 border border-lime-500 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            onClick={() => setshowModal(false)}
            label="Cancel"
            type="button"
          />
          <Button outline={true} label="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
