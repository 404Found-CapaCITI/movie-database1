import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails"; // ✅ Ensure this file exists

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />{" "}
      {/* ✅ Uncommented */}
    </Routes>
  );
};

export default App;
