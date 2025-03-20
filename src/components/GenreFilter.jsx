import React from "react";

const genres = [
  "All Genres", "Action", "Adventure", "Comedy", "Drama", "Horror",
  "Romance", "Sci-Fi", "Thriller", "Fantasy", "Animation",
  "Crime", "Documentary"
];

const GenreFilter = ({ category, setCategory }) => {
  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setCategory(genre);
  };

  return (
    <div className="genre-filter">
      <select value={category} onChange={handleGenreChange}>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
