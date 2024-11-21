import useMovie from "../hooks/useMovie";
import { useState } from "react";
import MovieCard from "./MovieCard";
import "./Home.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid2";

const movieTypeList = ["popular", "now_playing", "top_rated", "upcoming"];
const movieTypeDisplay = {
  popular: "Popular",
  now_playing: "Now Playing",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

const Home = () => {
  const [movieType, setMovieType] = useState<string>("now_playing");
  const [page, setPage] = useState<number>(1);
  const { movies: movieList, totalPage } = useMovie(movieType, page);

  const handleMovieTypeChange: (newMovieType: string) => void = (
    newMovieType
  ) => {
    setMovieType(newMovieType);
    setPage(1);
  };

  const handlePagination: (isNext: boolean) => void = (isNext) => {
    if (isNext && page !== totalPage) setPage(page + 1);
    else if (!isNext && page > 1) setPage(page - 1);
  };

  return (
    <>
      <Grid container columns={3} padding="0 40px">
        <Grid size="grow">
          <div className="pagination">
            <button onClick={() => handlePagination(false)}>prev</button>
            <div className="page-wrapper">
              {page}/{totalPage}
            </div>
            <button onClick={() => handlePagination(true)}>next</button>
          </div>
        </Grid>

        <Grid size="auto" alignContent="center">
          <Select
            value={movieType}
            label="movieType"
            onChange={(event) => handleMovieTypeChange(event.target.value)}
            variant="standard"
          >
            {movieTypeList.map((movieType, i) => (
              <MenuItem key={i} value={movieType} sx={{ color: "black" }}>
                {movieTypeDisplay[movieType as keyof typeof movieTypeDisplay]}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid
        container
        columns={4}
        columnSpacing="40px"
        rowSpacing="40px"
        padding="40px"
        paddingTop="0"
      >
        {movieList.map((movie) => (
          <Grid size={1} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
