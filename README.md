# Movie App

## Overview

The **Movie App** is a web application that allows users to discover movies, search by title, filter movies by genre, and switch between dark and light modes. The app fetches movie data from **The Movie Database (TMDb)** API and provides a seamless, interactive experience with an intuitive interface. This app was developed as part of a group project.

### Key Features

- **Movie Search**: Users can search for movies by title using the search bar.
- **Genre Filtering**: Filter movies by genre, such as Action, Comedy, Drama, etc.
- **Dark/Light Mode**: Toggle between dark and light themes with preferences saved across sessions.
- **Infinite Scroll**: Load more movies as you scroll down.
- **Responsive Design**: The app is fully responsive and adapts to mobile, tablet, and desktop views.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering, static site generation, and routing.
- **Tailwind CSS**: A utility-first CSS framework for custom styling.
- **TMDb API**: The Movie Database API for fetching movie data.
- **React Icons**: For integrating icons such as the search, sun (for light mode), and moon (for dark mode).
- **LocalStorage**: To persist the user's theme preferences (dark or light mode) across sessions.

## Installation

Follow the steps below to get the app running locally:

### Prerequisites

Make sure you have the following tools installed:

- **Node.js** (>= 16.x)
- **npm** (>= 6.x)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-discovery-app.git
Navigate into the project directory:

bash
Copy
cd movie-discovery-app
Install dependencies:

bash
Copy
npm install
Start the development server:

bash
Copy
npm run dev
Open your browser and go to http://localhost:3000 to view the app.

Environment Variables
You'll need to obtain a TMDb API key to fetch movie data. Here's how to set it up:

Create a .env.local file in the root of the project.

Add your TMDb API key in the file like this:

bash
Copy
NEXT_PUBLIC_API_KEY=your_tmdb_api_key
Replace your_tmdb_api_key with your actual TMDb API key. You can obtain it from TMDb's API page.

### Usage
Search for Movies: Type the movie title in the search bar and hit Enter to search.
Filter by Genre: Use the genre dropdown to filter movies by categories like Action, Comedy, Horror, etc.
Toggle Theme: Use the sun/moon icon in the navbar to toggle between dark and light themes.
Infinite Scroll: Scroll down the page to load more movies automatically.

### Group Members
** Member 1: Mpho
** Member 2: Nosiphp
** Member 3: Isabella
** Member 4: Pelma

### Challenges Faced
Dark Mode Persistence: Ensuring the dark mode theme persisted across page reloads was tricky. We overcame this by utilizing localStorage to save the user's theme preference.
API Rate Limiting: The TMDb API has rate limits, so we had to be cautious with the number of requests we made.
Responsive Design: Ensuring the app worked well on mobile, tablet, and desktop screens posed some challenges, but we used Tailwind CSS to build a responsive layout.
Future Enhancements
User Authentication: Add user login functionality to allow users to create watchlists and save favorite movies.
Reviews and Ratings: Implement a feature that lets users leave reviews and rate movies.
Offline Mode: Implement caching so that users can browse movies even without an active internet connection.
Trending Movies: Include a section that highlights the trending movies of the week/month.
License
This project is licensed under the MIT License – see the LICENSE file for details.

markdown
Copy

### Steps:

1. **Create the `README.md` file** in your project root directory.
2. **Copy the above content** and paste it into the `README.md` file.
3. **Save the file**.

