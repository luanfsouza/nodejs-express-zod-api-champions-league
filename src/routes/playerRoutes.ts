import { createPlayer, deletePlayerById, getPlayer, getPlayerById, updatePlayerById } from "../controllers/playerController";

import { Router } from "express";
import { getClubs } from "../controllers/clubsController";

const router = Router();

router.get("/players", getPlayer);
router.get("/players/:id", getPlayerById);
router.post("/players", createPlayer);
router.delete("/players/:id", deletePlayerById)
router.patch("/players/:id", updatePlayerById)

router.get("/clubs", getClubs)

export default router