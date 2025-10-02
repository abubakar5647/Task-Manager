import React from "react";
import { Images } from "../assets";

interface Props {
  onClick: () => void;
}

const SocialLogin: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center w-full">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        className="flex items-center justify-center w-full border rounded-lg px-4 py-2 
                   hover:bg-gray-100 transition"
        onClick={onClick}
      >
        <img src={Images.Google} alt="Google" className="w-5 h-5 mr-2" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
