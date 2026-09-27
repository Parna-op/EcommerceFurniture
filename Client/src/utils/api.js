import axios from "axios";

export let accessToken = {};
export const api = axios.create({
  baseURL: "url",
  timeout: 1000,
});

api.interceptors.request.use((config) => {
  ({ ...config, headers: { arthorization: `Bearer ${accessToken}` } });
  return config;
});

api.interceptors.request.use(
  (res) => res,
  async (error) => {
    originalRequest = error.config;
    Reaquest._Retry = false;
    if (error.response?.status == 401 && !Reaquest._Retry) {
      Reaquest._Retry = true;
      res = await axios.get("url/refresh");
      accessToken.push = res.accessToken;
    }
    api.get(originalRequest);
  }
);
