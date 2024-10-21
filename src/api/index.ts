import axios from 'axios';

export const fetchTopFreeApps = async () => {
  const response = await axios.get(
    'https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json'
  );
  return response.data.feed.entry;
};

export const fetchTopGrossingApps = async () => {
  const response = await axios.get(
    'https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json'
  );
  return response.data.feed.entry;
};

export const fetchAppDetails = async (appId: string) => {
  try {
    const response = await axios.get(
      `https://itunes.apple.com/tw/lookup?id=${appId}`
    );
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching app details:', error);
    return null;
  }
};