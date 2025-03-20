import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage";
// import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <>
      {/* ✅ Page Layout Wrapper */}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
