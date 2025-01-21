import axios from "axios";

export const call = (method = "POST", param, headers) =>
  axios({
    url: `${import.meta.env.VITE_API_URL}${param.url}`,
    method,
    headers,
    data: JSON.stringify(param.body),
  })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.response.data.message;

      if (
        (errorMessage &&
          (errorMessage.includes("Expired") ||
            errorMessage === "JWT Token not found")) ||
        errorMessage === "Invalid JWT Token"
      ) {
        if (errorMessage.includes("Expired")) {
          sessionStorage.setItem("expired", "true");
        }
        // logout user when token expired
        sessionStorage.clear();
        return (window.location.href = "/auth");
      }

      throw new Error(errorMessage);
    })
    .then(({ data }) => data);

export const fetch = (
  param,
  method,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  return call(method, param, headers);
};
