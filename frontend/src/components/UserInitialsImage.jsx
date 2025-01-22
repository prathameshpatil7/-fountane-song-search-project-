import React from "react";
import { getCustomInitials } from "../utils/helper-functions";

const UserInitialsImage = ({ username = "" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="flex items-center justify-center rounded-full border border-gray-800 bg-blue-500 text-white w-8 h-8"
        title={username}
      >
        {getCustomInitials(username)}
      </div>
    </div>
  );
};

export default UserInitialsImage;
