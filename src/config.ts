export const config = {
  backendUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://orinote.neptunia.net.eu.org",
};
