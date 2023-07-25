import React, { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-btnColor hover:bg-btnHoverColor text-white py-2 px-4 rounded ease-out duration-300"
    >
      {text}
    </button>
  );
};
