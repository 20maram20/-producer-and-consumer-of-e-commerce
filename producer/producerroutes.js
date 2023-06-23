import express from "express";

import {
  deleteoffer,
  addoffer,
  
} from "./producer.js";


const router = express.Router();

router.post("/addoffer", addoffer);

router.delete("/:name",deleteoffer); 

export default router;