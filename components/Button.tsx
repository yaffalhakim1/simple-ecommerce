"use client";

import React from "react";
interface Props {
  onClick?: () => void | Promise<void>;
  variant?: "text" | "icon";
  title: string;
}

function Button({ onClick, variant = "text", title }: Props) {
  if (variant === "text") {
    return (
      <button
        className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-5"
        onClick={onClick}
      >
        {title}
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <div
        className="button-icon bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-5"
        onClick={onClick}
      >
        {title}
      </div>
    );
  }

  return null;
}

export default Button;
