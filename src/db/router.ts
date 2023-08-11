import Router, { Express } from "express";
import RepoController from "../repoController";

// @ts-expect-error: Lib mistke
const router: Express = new Router();

router.post("/repos", RepoController.forceSyncRepos);
router.get("/repos", RepoController.getAll);
router.get("/repos/:id", RepoController.getRepoById);

export default router;
