#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import mongoose from "mongoose";

import syncRepos from "./syncRepos";
import getRepos from "./getRepos";
import Repo from "./db/schemas/Repo";

const DB_URL = process.env.DB_URL;

yargs(hideBin(process.argv))
  .command(
    "all",
    "fetch tranding repos",
    () => {},
    async () => {
      try {
        const repos = await getRepos();
        console.log(JSON.stringify(repos, null, 2));
        console.log("\n Repos loaded");
      } catch (error) {
        console.log(`Error while loading repos: ${error.message}`);
      } finally {
        process.exit(1);
      }
    }
  )
  .command(
    "sync",
    "sync tranding repos from github to mongo",
    () => {},
    async () => {
      try {
        await mongoose.connect(DB_URL);
        await syncRepos();
        mongoose.disconnect();
        console.log("Repos synced");
      } catch (error) {
        console.log(`Error while syncing repos: ${error.message}`);
      } finally {
        process.exit(1);
      }
    }
  )
  .command(
    "get <id>",
    "get specific repo from mongo",
    () => {},
    async (args) => {
      try {
        if (!args.id) {
          console.info("Should provide repo id");
          return;
        }
        await mongoose.connect(DB_URL);
        const repo = await Repo.findById(String(args.id));
        mongoose.disconnect();
        if (!repo) {
          console.info(`No such repo with id ${args.id}`);
          return;
        }
        console.log("Repo loaded: \n");
        console.log(JSON.stringify(repo, null, 2));
      } catch (error) {
        console.log(`Error while loading repos: ${error.message}`);
      } finally {
        process.exit(1);
      }
    }
  )
  .demandCommand(1)
  .parse();
