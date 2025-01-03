import express from "express";
import cors from "cors";

const web = express();

web.use(cors());
web.use(express.json());

export default web;