import { useState, useEffect } from "react";
import { Movie } from "../types/Movie";

type useMovieReturnType = {
  movies: Movie[];
  totalPage: number;
};

const useMovie : (movieType : string, page : number) => useMovieReturnType = (movieType, page) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);

  

  useEffect(() => {
    const fetchTotalPages = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieType}?api_key=${import.meta.env.VITE_API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTotalPage(data.total_pages); 
      } catch (error) {
        console.error("Failed to fetch total pages:", error);
      }
    };

    fetchTotalPages(); 

  }, [movieType]);


  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieType}?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [movieType, page]);

  return { movies, totalPage };
};

export default useMovie;