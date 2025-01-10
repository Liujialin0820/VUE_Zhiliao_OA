import http from "./http";

export const login = (email, password) => {
  const path = "/auth/login/";
  return http.post(path, { email, password });
};
