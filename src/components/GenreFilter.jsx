import React from "react";

const genres = {
  "All Genres": "",
  Action: 28,
  Adventure: 12,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
  "Sci-Fi": 878,
  Thriller: 53,
  Fantasy: 14,
  Animation: 16,
  Crime: 80,
  Documentary: 99,
};

const GenreFilter = ({ category, setCategory }) => {
  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setCategory(selectedGenre === "" ? null : Number(selectedGenre)); // Convert to number if not empty
  };

  return (
    <div className="genre-filter">
      <select value={category ?? ""} onChange={handleGenreChange}>
        {Object.entries(genres).map(([name, id]) => (
          <option key={name} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
