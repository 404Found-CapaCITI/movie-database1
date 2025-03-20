import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList"; // Your main page
import MovieDetails from "./pages/MovieDetails"; // Movie details page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />{" "}
        {/* ✅ Route for Movie Details */}
      </Routes>
    </Router>
  );
}

export default App;
