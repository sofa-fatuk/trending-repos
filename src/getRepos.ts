import * as https from "https";
import * as dotenv from "dotenv";
import { IncomingMessage } from "http";

dotenv.config();

interface TrendingRepository {
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  forks_count: number;
  language: string;
  keys_url: string;
}

function getRepos({
  sort = "stars",
  order = "desc",
  perPage = 30,
}: {
  perPage?: number;
  sort?: string;
  order?: string;
} = {}): Promise<TrendingRepository[]> {
  return new Promise((resolve, reject) => {
    const accessToken = process.env.TOKEN_KEY;
    const apiUrl = "api.github.com";
    const queryParams = `q=stars:>1&sort=${sort}&order=${order}&per_page=${perPage}`;

    const options = {
      hostname: apiUrl,
      path: "/search/repositories?" + queryParams,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Trending-App",
      },
    };

    const req = https.request(options, (res: IncomingMessage) => {
      let data = "";
      res.on("data", (chunk: Buffer) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error("Request failed"));
          return;
        }
        const trendingRepos: TrendingRepository[] = JSON.parse(data).items;
        resolve(trendingRepos);
      });
    });

    req.on("error", (error: Error) => {
      reject(error);
    });

    req.end();
  });
}

export default getRepos;
