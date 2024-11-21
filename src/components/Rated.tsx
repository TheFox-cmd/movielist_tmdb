import { useContext, useEffect } from "react";
import { UserListContext } from "../context/MovieContext";
import { Movie, RatedMovie } from "../types/Movie";
import { useState } from "react";
import MovieCard from "./MovieCard";
import Grid from "@mui/material/Grid2";
import { LoginContext } from "../context/LoginContext";

type CombinedList = Array<[Movie, RatedMovie]>;

const Rated = () => {
  const { ratedList } = useContext(UserListContext);
  const [ratedMovieList, setRatedMovieList] = useState<Movie[]>([]);

  const { userData } = useContext(LoginContext);

  const getCombinedList = () => {
    const combined: CombinedList = [];
    for (let i = 0; i < ratedMovieList.length; i++) {
      const matched = ratedList.find((r) => r.id === ratedMovieList[i].id);
      if (matched) {
        combined.push([ratedMovieList[i], matched]);
      }
    }
    return combined;
  };

  const combinedList = getCombinedList();

  useEffect(() => {
    const fetchMovieById = async (id: number) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data as Movie;
      } catch (error) {
        console.error("Failed to fetch movie by id:", error);
        return {} as Movie;
      }
    };

    const getRatedMovies = async () => {
      const temp = await Promise.all(
        ratedList.map(async (ratedMovie: RatedMovie) => {
          return fetchMovieById(ratedMovie.id);
        })
      );
      setRatedMovieList(temp);
    };

    getRatedMovies();
  }, [ratedList]);

  return (
    <Grid
      container
      columns={4}
      columnSpacing="40px"
      rowSpacing="40px"
      padding="40px"
    >
      {userData && combinedList.map(([movie, ratedMovie]) => (
        <Grid size={1}>
          <MovieCard
            key={movie.id}
            movie={movie}
            userRating={ratedMovie.rating}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Rated;
