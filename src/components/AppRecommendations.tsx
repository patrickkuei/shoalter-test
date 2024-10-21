import React from "react";

interface AppRecommendationsProps {
  apps: any[];
}

const AppRecommendations: React.FC<AppRecommendationsProps> = ({ apps }) => {
  return (
    <div className="p-4 overflow-x-scroll flex mt-20">
      {apps.map((app, index) => (
        <div
          key={index}
          className="min-w-[100px] max-w-[100px] mr-6 flex flex-col justify-center items-center"
        >
          <img
            src={app["im:image"][2].label}
            alt={app["im:name"].label}
            className="rounded-md"
          />
          <h3 className="text-ellipsis overflow-hidden text-nowrap w-[100px]">
            {app["im:name"].label}
          </h3>
          <p className="text-xs text-black/50 text-left w-full">
            {app.category.attributes.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AppRecommendations;
