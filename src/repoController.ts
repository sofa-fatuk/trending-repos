import Repo from "./db/schemas/Repo";
import { Request, Response } from "express";
import syncRepos from "./syncRepos";

class RepoController {
  async forceSyncRepos(req: Request, res: Response) {
    try {
      const reposNormalized = await syncRepos();
      return res.json(reposNormalized);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const repos = await Repo.find().sort({ stargazers_count: -1 }).limit(30);
      return res.json(repos);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getRepoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id не указан" });
      }
      const repo = await Repo.findById(id);
      return res.json(repo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new RepoController();
