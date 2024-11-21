import "./MovieCard.css";
import { useContext } from "react";
import { Movie } from "../types/Movie";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { UserListContext } from "../context/MovieContext";
import useLike from "../hooks/useLike";
import Box from "@mui/material/Box";

type MovieCardProps = {
  movie: Movie;
  userRating?: number;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, userRating }) => {
  const { liked } = useLike();
  const { userData } = useContext(LoginContext);
  const { likedList, setLikedList } = useContext(UserListContext);

  const handleLike = (movie: Movie, favorite : boolean) => {
    if (!userData) return;

    liked(movie, favorite);

    let newLikedList = [...likedList];
    if (favorite) newLikedList.push(movie.id);
    else newLikedList = newLikedList.filter((id) => id !== movie.id);
    setLikedList(newLikedList);
  };

  return (
    <div className="card">
      <img
        className="cardImage"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />

      <Link
        to={`/movies/${movie.id}`}
        // as={}
        style={{
          textDecoration: "none",
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <Box>
          {movie.title}
        </Box>
        
      </Link>

      <div className="rating">
        <div className="rating-value">
          <i className="ion-star"></i>
          { userRating ? <Box>{movie.vote_average} / {userRating}</Box> : <Box>{movie.vote_average}</Box> }
        </div>
        {userData && likedList.includes(movie.id) ? (
          <i className="ion-ios-heart" onClick={() => handleLike(movie, false)}></i>
        ) : (
          <i className="ion-ios-heart-outline" onClick={() => handleLike(movie, true)}></i>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
