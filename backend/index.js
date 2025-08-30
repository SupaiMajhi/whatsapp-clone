import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
//lib imports
import { connectToDB } from "./lib/lib.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();


app.listen(8080, console.log("server is listening..."));
