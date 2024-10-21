import React, { useEffect, useState } from "react";
import { fetchTopFreeApps, fetchTopGrossingApps } from "../api/index.ts";
import AppList from "../components/AppList.tsx";
import AppRecommendations from "../components/AppRecommendations.tsx";
import SearchBar from "../components/SearchBar.tsx";

const Home: React.FC = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [recommendedApps, setRecommendedApps] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getApps = async () => {
      const freeApps = await fetchTopFreeApps();
      const topGrossingApps = await fetchTopGrossingApps();
      setApps(freeApps);
      setRecommendedApps(topGrossingApps);
    };

    getApps();
  }, []);

  const filteredApps = apps.filter(
    (app) =>
      app["im:name"].label.includes(searchTerm) ||
      app.summary.label.includes(searchTerm) ||
      app.title.label.includes(searchTerm)
  );

  return apps.length ? (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AppRecommendations apps={recommendedApps} />
      <AppList apps={filteredApps} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
