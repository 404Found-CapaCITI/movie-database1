import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <>
      {/* ✅ Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Movie Database
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

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
