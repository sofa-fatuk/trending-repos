import https from "https";
import dotenv from "dotenv";

dotenv.config();

function getRepos({ date, sort = "stars", order = "desc" }) {
  return new Promise((resolve, reject) => {
    const accessToken = process.env.TOKEN_KEY;
    const apiUrl = "api.github.com";
    const queryParams = `q=created:>${date}&sort=${sort}&order=${order}`;

    const options = {
      hostname: apiUrl,
      path: "/search/repositories?" + queryParams,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Trending-App",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error("Request failed"));
          return;
        }
        const trendingRepos = JSON.parse(data).items;
        resolve(trendingRepos);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

export default getRepos;
