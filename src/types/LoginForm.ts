export type LoginForm = {
  username: string;
  password: string;
}

export type UserData = {
  success: boolean;
  username: string;
  accountID: string;
  sessionID: string;
  requestToken: string;
}

export type RequestToken = {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export type SessionToken = {
  success: boolean;
  session_id: string;
}

export type AccountData = {
  id: string;
  username: string;
  name: string;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  avatar: {
    gravatar: {
      hash: string;
    }, 
    tmdb: {
      avatar_path: string;
    }
  }
}