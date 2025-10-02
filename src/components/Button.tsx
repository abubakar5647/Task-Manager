import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className,
  variant = "primary",
  disabled,
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400",
      secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-400",
      danger: "bg-red-600 hover:bg-red-700 focus:ring-red-400",
    };
    return variants[variant];
  };

  const baseClasses = `
    px-4 py-2 rounded-lg font-medium text-white
    focus:outline-none focus:ring-2 focus:ring-offset-2 transition
    ${getVariantClasses()}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className || ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
