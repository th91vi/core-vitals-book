import cors from "cors";

const allowList = ["http://localhost:3000"];

export const corsOptions: cors.CorsOptions = {
  origin: allowList,
  allowedHeaders:
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
  credentials: true,
  methods: "PUT,POST,GET,DELETE,OPTIONS",
};
