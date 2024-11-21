import { useContext, useEffect } from "react";
import { UserListContext } from "../context/MovieContext";
import { Movie } from "../types/Movie";
import { useState } from "react";
import MovieCard from "./MovieCard";
import Grid from "@mui/material/Grid2";
import { LoginContext } from "../context/LoginContext";

const Favorite = () => {
  const { likedList } = useContext(UserListContext);
  const [likedMovieList, setLikedMovieList] = useState<Movie[]>([]);
  const { userData } = useContext(LoginContext);

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

    const getLikedMovies = async () => {
      const temp = await Promise.all(
        likedList.map(async (id) => {
          return fetchMovieById(id);
        })
      );
      setLikedMovieList(temp);
    };
    getLikedMovies();
  }, [likedList]);

  return (
    <Grid container columns={4} columnSpacing="40px" rowSpacing="40px" padding="40px"> 
      
        {userData && likedMovieList.map((movie) => {
          if (movie) {
            return <Grid size={1}><MovieCard key={movie.id} movie={movie} /></Grid>;
          }
        })}
      
    </Grid>
  );
};

export default Favorite;
