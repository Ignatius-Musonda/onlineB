

import express from "express";
import {
  addApplication,
  deleteApplication,
  getApplication,
  getApplications,
  updateApplication,
} from "../Controller/Application.js";

const router = express.Router();

router.get("/", getApplications);
router.get("/:id", getApplication);
router.post("/", addApplication);
router.delete("/:id", deleteApplication);
router.put("/:id", updateApplication);

export default router;