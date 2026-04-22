import { Router } from "express";
import {
  analyzeOpportunity,
  getOpportunity,
  getOpportunities,
  getQuestions
} from "../controllers/opportunityController.js";

const router = Router();

router.get("/questions", getQuestions);
router.get("/opportunities", getOpportunities);
router.get("/opportunities/:id", getOpportunity);
router.post("/analyze", analyzeOpportunity);

export default router;