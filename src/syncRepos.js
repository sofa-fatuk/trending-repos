import Repo from "./db/schemas/Repo.js";
import getRepos from "./getRepos.js";

async function syncRepos() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const yesterday = String(today.getDate() - 1).padStart(2, "0");

  const fullDate = `${year}-${day}-${month}`;
  const yesterdayDate = `${year}-${yesterday}-${month}`;

  let repos = await getRepos({
    date: fullDate,
  });

  if (repos.length == 0) {
    repos = await getRepos({
      date: yesterdayDate,
    });
  }
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
}

export default syncRepos;
