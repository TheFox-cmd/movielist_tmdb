import { Rate, MovieDetail } from "../types/Movie";
import axios from "../api/axios";

const useRate = () => {
  const rate = async (movie: MovieDetail, value : number) => {
    const options = {
      method: 'POST',
      url: `https://api.themoviedb.org/3/movie/${movie.id}/rating`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: "Bearer " + import.meta.env.VITE_API_READ_ACCESS_TOKEN,
      },
      data: `{"value":${value}}`
    };

    await axios.request<Rate>(options)
      .then((res) => res.data.status_code)
      .catch((e) => console.log(e));

  };

  return { rate };
};

export default useRate;
