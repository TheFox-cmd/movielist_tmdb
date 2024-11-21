import useMovieDetail from "../hooks/useMovieDetail";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { MovieDetail, RatedMovie } from "../types/Movie";
import useRate from "../hooks/useRate";
import { UserListContext } from "../context/MovieContext";

const MoviePage: React.FC = () => {
  const [rating, setRating] = useState<number>(1);
  const [visualRating, setVisualRating] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const movieID = parseInt(id || "0");

  const movie = useMovieDetail(movieID);

  const { ratedList, setRatedList } = useContext(UserListContext);
  const { rate } = useRate();

  if (!movie) return null;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleRatingSubmit = (movie: MovieDetail, rating: number) => {
    rate(movie, rating);
    let newRatedList = [...ratedList];
    if (!newRatedList.find((ratedMovie) => ratedMovie.id === movie.id)) {
      newRatedList.push({ id: movie.id, rating });
    } else {
      newRatedList = newRatedList.map((ratedMovie) => {
        if (ratedMovie.id === movie.id) return { ...ratedMovie, rating };
        return ratedMovie;
      });
    }
    setRatedList(newRatedList);
    setVisualRating(rating);
  };

  return (
    <Grid container>
      <Grid
        size={5}
        container
        justifyContent={"flex-end"}
        sx={{ padding: "30px" }}
      >
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          sx={{
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid
        size={7}
        container
        sx={{ padding: "30px", flexDirection: "column", gap: "20px" }}
      >
        <Grid size={12}>
          <Box sx={{ fontWeight: "bold", fontSize: "36px" }}>{movie.title}</Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <Box
              sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: "6px" }}
            >
              Overview
            </Box>
            <Box>{movie.overview}</Box>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box
            sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: "6px" }}
          >
            Genres
          </Box>
          <Grid container>
            {movie.genres.map((genre) => (
              <Box
                key={genre.id}
                sx={{
                  padding: "5px",
                  borderRadius: "5px",
                  marginRight: "5px",
                  backgroundColor: "lightblue",
                }}
              >
                {genre.name}
              </Box>
            ))}
          </Grid>
        </Grid>
        <Grid size={12}>
          <Box
            sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: "6px" }}
          >
            Average Rating
          </Box>
          <Grid container>
            <i className="ion-star" />
            <Grid container alignItems="center">
              {movie.vote_average}
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Box
            sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: "6px" }}
          >
            Your Rating
          </Box>
          {visualRating ||
            ratedList.find(
              (ratedMovie: RatedMovie) => ratedMovie.id === movie.id
            )?.rating ||
            "Not Rated"}
          <Grid container>
            <Select
              value={rating}
              label="rating"
              onChange={(event) =>
                handleRatingChange(Number(event.target.value))
              }
              variant="standard"
              sx={{ marginRight: "20px" }}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i} value={i + 1} sx={{ color: "black" }}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
            <Button
              onClick={() => handleRatingSubmit(movie, rating)}
              sx={{
                color: "black",
                border: "1px solid black",
              }}
            >
              Rate it!
            </Button>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Box
            sx={{ fontWeight: "bold", fontSize: "24px", marginBottom: "12px" }}
          >
            Production Companies
          </Box>
          <Box>
            {movie.production_companies.map((company) => (
              <Box
                key={company.id}
                component="img"
                src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                alt={company.name}
                sx={{
                  width: "100px",
                  objectFit: "cover",
                  marginRight: "20px",
                  flexWrap: "wrap",
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MoviePage;
