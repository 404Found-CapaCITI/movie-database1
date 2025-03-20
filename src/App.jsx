import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Ensure the import matches the filename
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;
