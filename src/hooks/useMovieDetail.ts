import { useState, useEffect } from "react";
import { MovieDetail } from "../types/Movie";

const useMovieDetail = (id: number) => {
  const [MovieDetail, setMovieDetail] = useState<MovieDetail>();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${
      import.meta.env.VITE_API_KEY
    }`;
    const fetchMovieById = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error("Failed to fetch movie by id:", error);
      }
    };
    fetchMovieById();
  }, [id]);

  return MovieDetail;
};

export default useMovieDetail;
