export const config = {
  rootUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://orinote.neptunia.net.eu.org",
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "https://orinote.neptunia.net.eu.org/api",
};
