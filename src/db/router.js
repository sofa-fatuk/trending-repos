import Router from "express";
import RepoController from "../repoController.js";

const router = new Router();

router.post("/repos", RepoController.forceSyncRepos);
router.get("/repos", RepoController.getAll);
router.get("/repos/:id", RepoController.getRepoById);

export default router;
