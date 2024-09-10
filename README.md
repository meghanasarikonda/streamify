
# Streamify Dashboard

This project is a React application that serves as a music streaming analytics dashboard. It allows users to visualize key metrics, data trends, information about user activity.

## Features

* **Key Metrics:** Displays total users, active users, total streams, revenue, and top artist.
* **Data Visualization:** Includes user growth charts, revenue distribution pie charts, and top streamed songs bar charts.
* **Data Table:** Provides a detailed breakdown of recent streams with information like song name, artist, date streamed, stream count, and user ID.
* **Responsive Design:** Adapts to various screen sizes for optimal viewing on any device.

## Technologies Used

* **Frontend:** React
* **Styling:** Material UI 
* **Mock Data:** JSON Server 

## Running the Project

**Prerequisites:**

* Node.js and npm (or yarn) installed on your system.

**Steps:**

1. **Clone the Repository:**
    ```bash
     git clone https://github.com/meghanasarikonda/streamify.git
     cd streamify
2. **Installing Dependencies:**
Install the  required  dependencies  using  either  npm  or  yarn:
    ```bash
    npm install
    or 
    yarn 
3. **Start the JSON Server:**
Start the JSON server with the following command:
    ```bash
    npx json-server db.json
This will start a mock server on `http://localhost:3000`, where the mock data is served from `db.json`
  
4. **Start the React Application:**
Now, start the React application in another window:
    ```bash
    npm run dev
This will launch the development server, and you can view the application in your browser at `http://localhost:5173`.


## Tradeoffs and decisions made while building this project 

1. **Data Visualization Library used**

    **Trade-off:** Used MUI’s `LineChart` and `BarChart` instead of Chart.js or D3.  
     **Reasoning:** MUI charts integrate smoothly with Material-UI and will give a consistent look to the UI, but offer less customization compared to other libraries.

2. **Mock Data vs. Real API**

    **Trade-off:** Used `json-server` for mock data during development.  
     **Reasoning:** `json-server` enables quick setup and testing but doesn't cover all scenarios of a real backend.
3. **State Management**

    **Trade-off:** Used local state (`useState`, `useEffect`) instead of Redux or Recoil.  
     **Reasoning:** Local state is simpler and sufficient for this project as json-server is proving the necessary routes, so skipped global state management library.
4. **Error Handling and Loading States**

    **Trade-off:** Implemented basic error handling and loading states.  
     **Reasoning:** Basic handling improves user experience, but more advanced strategies might be needed for production.