import axios from "axios";
import { UserData, RequestToken, SessionToken, AccountData } from "../types/LoginForm";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const useLogin = () => {
  const { setUserData } = useContext(LoginContext);

  const login: (
    username: string,
    password: string
  ) => Promise<UserData> = async (username, password) => {
    const user = localStorage.getItem("userData")
    if (user) return new Promise((resolve) => resolve(JSON.parse(user))); 

    const getRequestParams = (method: string) => {
      return {
        method,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_API_READ_ACCESS_TOKEN,
        },
      };
    };

    const accessTokenURL =
      "https://api.themoviedb.org/3/authentication/token/new";

    const requestToken = (
      await axios.get<RequestToken>(accessTokenURL, getRequestParams("GET"))
    ).data.request_token;

    const validateTokenURL =
      "https://api.themoviedb.org/3/authentication/token/validate_with_login";

    const body = {
      username,
      password,
      request_token: requestToken,
    };

    const validateToken = await axios
      .post<RequestToken>(validateTokenURL, body, getRequestParams("POST"))
      .then((res) => res.data.success)
      .catch(() => false);

    if (!validateToken) return new Promise((reject) => reject({success: false, username: "", accountID: "", sessionID: "", requestToken: ""}));


    const sessionURL =
      "https://api.themoviedb.org/3/authentication/session/new";
    const sessionID = (
      await axios.post<SessionToken>(
        sessionURL,
        { request_token: requestToken },
        getRequestParams("POST")
      )
    ).data.session_id;

    const accountURL = "https://api.themoviedb.org/3/account";
    const accountID = (await axios.get<AccountData>(accountURL, getRequestParams("GET"))).data.id;

    const userData : UserData = {
      success: true,
      username,
      accountID,
      sessionID,
      requestToken: requestToken,
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);

    return userData;
  };

  return { login };
};

export default useLogin;
