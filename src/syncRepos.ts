import Repo from "./db/schemas/Repo";
import getRepos from "./getRepos";

async function syncRepos() {
  try {
    const repos = await getRepos();

    const reposNormalized = repos.map((item) => {
      return {
        name: item.name,
        description: item.description,
        stargazers_count: item.stargazers_count,
        html_url: item.html_url,
        forks_count: item.forks_count,
        language: item.language,
        keys_url: item.keys_url,
      };
    });
    await Repo.deleteMany({});
    await Repo.create(reposNormalized);
    return reposNormalized;
  } catch (error) {
    console.error("Error syncing repositories:", error);
  }
}

export default syncRepos;
