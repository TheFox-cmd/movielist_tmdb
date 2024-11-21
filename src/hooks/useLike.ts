import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Favorite, Movie } from "../types/Movie";
import axios from "../api/axios";

const useLike = () => {

  const { userData } = useContext(LoginContext);

  const liked = async (movie: Movie, favorite : boolean) => {
    const options = {
      method: "POST",
      url: `https://api.themoviedb.org/3/account/${userData?.accountID}/favorite`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_API_READ_ACCESS_TOKEN,
      },
      data: { media_type: "movie", media_id: movie.id, favorite: favorite },
    };

    await axios.request<Favorite>(options)
      .then((res) => res.data.status_code)
      .catch((e) => console.log(e));

  };

  return { liked };
};

export default useLike;
