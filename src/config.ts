export const config = {
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "https://orinote.neptunia.net.eu.org/api",
};
