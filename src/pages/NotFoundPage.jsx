import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <img
        src="https://via.placeholder.com/400x250?text=Not+Found"
        alt="Not Found"
        className="mt-6 rounded-lg shadow-lg"
      />
      <Button
        variant="contained"
        color="primary"
        className="mt-6"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
