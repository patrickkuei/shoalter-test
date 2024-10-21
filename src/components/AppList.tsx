import React, { useLayoutEffect, useMemo, useState } from "react";
import { fetchAppDetails } from "../api";

interface AppListProps {
  apps: any[];
}

const AppList: React.FC<AppListProps> = ({ apps }) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 10;

  const currentApps = useMemo(() => {
    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;

    return apps.slice(indexOfFirstApp, indexOfLastApp);
  }, [apps, currentPage]);

  useLayoutEffect(() => {
    // 獲取每個應用的詳細資料以取得評分
    const fetchRatings = async () => {
      const ratingPromises = currentApps.map(async (app) => {
        const appId = app.id.attributes["im:id"];
        if (ratings[appId] === undefined) {
          const appDetails = await fetchAppDetails(appId);
          return {
            appId,
            rating: Math.floor(appDetails?.averageUserRating || 0),
          };
        }
        return null;
      });

      const results = await Promise.all(ratingPromises);
      const newRatings = results.reduce((acc, result) => {
        if (result) {
          acc[result.appId] = result.rating;
        }
        return acc;
      }, {} as { [key: string]: number });

      setRatings((prevRatings) => ({ ...prevRatings, ...newRatings }));
    };

    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentApps]);

  const nextPage = () => {
    if (currentPage < Math.ceil(apps.length / appsPerPage))
      setCurrentPage((currentPage) => currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="p-4">
      {currentApps.map((app, index) => {
        const appId = app.id.attributes["im:id"];
        const rating = ratings[appId];

        return (
          <div
            key={index}
            className="flex items-center mb-4 pb-2 border-b relative"
          >
            <span className="text-2xl text-black/50 absolute w-12 text-center">
              {(currentPage - 1) * 10 + index + 1}
            </span>
            <img
              src={app["im:image"][2].label}
              alt={app["im:name"].label}
              className="rounded-full w-16 h-16 mr-4 ml-12"
              loading="lazy"
            />
            <div>
              <h3>{app["im:name"].label}</h3>
              <p className="text-xs text-black/50">
                {app.category.attributes.label}
              </p>
              {rating !== undefined ? (
                <p className="text-yellow-500">{renderStars(rating)}</p>
              ) : (
                <p>Loading rating...</p>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 m-2 border rounded bg-blue-500 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {currentPage} / {Math.ceil(apps.length / appsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(apps.length / appsPerPage)}
          className="px-4 py-2 m-2 border rounded bg-blue-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppList;
