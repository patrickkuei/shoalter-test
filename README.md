# App Store Application
This is a single-page application built with React for displaying and searching apps from the App Store. The application retrieves and displays the top free and top grossing applications, with support for search functionality and ratings display.

#### Features
- App List: Displays the top 100 free apps fetched from the iTunes API.
    - Supports pagination, displaying 10 apps per page.
    - Shows app details including the app name, category, and rating.
    - Ratings are displayed using Unicode stars (★ for filled and ☆ for empty).
- App Recommendations: Displays the top 10 grossing apps, shown in a horizontal scrollable view.
- Search Functionality: Allows users to search for apps by name, description, or title.
    - The search bar remains fixed at the top of the page.
    - Searches are performed instantly as users type.
- Responsive Design: The app layout is responsive and adjusts for different screen sizes using Tailwind CSS.
#### Tech Stack
- React (version 17+): For building the UI.
- TypeScript: Provides type safety and improved developer experience.
- Axios: Handles API calls to fetch app data.
- Tailwind CSS: For responsive and utility-first CSS styling.
- React Hooks: For state and effect management (useState, useEffect, useMemo, useLayoutEffect).

#### Getting Started
##### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

##### Installation
1. Clone the repository:
```
git clone https://github.com/your-username/app-store-app.git
cd app-store-app
```

2. Install dependencies:
```
npm install
```

##### Running the Application
To start the development server:
```
npm start
```
This command will run the app in development mode. Open http://localhost:3000 in your browser to view the app.

The page will automatically reload if you make changes to the code.

##### Folder Structure
```
src/
├── components/          # React components (AppList, AppRecommendations, SearchBar, etc.)
├── api/                 # API call functions
├── pages/               # Main pages of the application
├── App.tsx              # Entry point of the React app
├── index.tsx            # Renders the app
└── ...
```
##### API Endpoints
The application uses the following APIs:

1. Top Free Applications: Fetches the top 100 free applications.
https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json
2. Top Grossing Applications: Fetches the top 10 grossing applications.
https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json
3. App Details: Fetches detailed information for a specific app, including averageUserRating.
https://itunes.apple.com/tw/lookup?id=[app_id]

License
This project is licensed under the MIT License - see the LICENSE file for details.