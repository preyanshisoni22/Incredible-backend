  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import { connectDB } from "./DB/db.js";
  import locationRoutes from "./Routes/locationRoutes.js";
  import categoryRoutes from "./Routes/categoryRoutes.js";
  import placeRoutes from "./Routes/placesRoutes.js";
  import transportRoutes from "./Routes/transportRoutes.js";
  import multer from "multer";

  dotenv.config();


  const app = express();
  app.use(cors()); 

  const upload =  multer();
  // app.use();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const PORT = process.env.PORT;
  connectDB();

  app.use(express.json());
  app.use(cors());
  app.use("/uploads", express.static("uploads"));

  app.use("/locations", locationRoutes);
  app.use("/categories", upload.none(), categoryRoutes);
  app.use("/places", placeRoutes);
  app.use("/transport", upload.none(), transportRoutes);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
