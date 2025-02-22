import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
