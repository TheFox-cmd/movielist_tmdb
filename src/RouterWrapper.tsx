import Header from "./components/Header";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Rated from "./components/Rated";
import Login from "./components/Login";
import { UserListContext } from "./context/MovieContext";
import { LoginContext } from "./context/LoginContext";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/MoviePage";

import { UserData } from "./types/LoginForm";
import axios from "./api/axios";
import { MovieDetail, RatedMovie, RatedMovieRaw } from "./types/Movie";

function RouterWrapper() {
  const [likedList, setLikedList] = useState<number[]>([]);
  const [ratedList, setRatedList] = useState<RatedMovie[]>([]);

  const defaultUserData = localStorage.getItem("userData");
  const [userData, setUserData] = useState<UserData | null>(
    defaultUserData ? JSON.parse(defaultUserData) : null
  );

  useEffect(() => {
    if (!userData) return;

    const getFavoriteAndRatedList = async () => {
      const favoriteOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/account/${userData.accountID}/favorite/movies`,
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_API_READ_ACCESS_TOKEN,
        },
      };

      await axios.request<{ results: MovieDetail[]}>(favoriteOptions)
        .then((res) => setLikedList(res.data.results.map((movie : MovieDetail) => movie.id)))
        .catch((e) => console.log(e));

      const ratedOptions = { 
        method: "GET",
        url: `https://api.themoviedb.org/3/account/${userData.accountID}/rated/movies`,
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_API_READ_ACCESS_TOKEN,
        },
      }

      const rawMovies = await axios.request<RatedMovieRaw>(ratedOptions)
        .then((res) => res.data)
        .catch((e) => console.log(e));
      
      if (!rawMovies) return;
      setRatedList(rawMovies.results.map((movie) => ({ id: movie.id, rating: movie.rating })));
      
    };

    getFavoriteAndRatedList();
  }, [userData]);

  return (
    <>
      <LoginContext.Provider value={{ userData, setUserData }}>
        <Header />
        <UserListContext.Provider
          value={{ likedList, setLikedList, ratedList, setRatedList }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/rated" element={<Rated />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </UserListContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default RouterWrapper;

// TODO:
// * 6. Style the app
