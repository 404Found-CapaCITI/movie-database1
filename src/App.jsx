import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails"; // ✅ Uncommented to use in routing

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />{" "}
      {/* ✅ Fixed routing */}
    </Routes>
  );
};

export default App;
