import Repo from "./db/schemas/Repo.js";
import syncRepos from "./syncRepos.js";

class repoController {
  async forceSyncRepos(req, res) {
    try {
      const reposNormalized = await syncRepos();
      return res.json(reposNormalized);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const repos = await Repo.find();
      // console.log(repos);
      return res.json(repos);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getRepoById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id не указан" });
      }
      const repos = await Repo.findById(id);
      return res.json(repos);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new repoController();
