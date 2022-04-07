import { __prod } from "./constants";
import { createConnection } from "typeorm";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import accountRouter from './apis/account.api';
import scrapRouter from './apis/scrap.api';
import mediaRouter from './apis/media.api';
import errorHandler from "./middleware/errorHandler";
import path from "path";


dotenv.config({
  path: __prod ? ".env" : ".env.development",
});

async function main() {
  await createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "P@ssw0rd",
    "database": "web_scraper",
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  });
  
  const PORT = process.env.PORT || 4000;
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  // Register Account Routes
  app.use('/account', accountRouter);
  // Register scrap APIs 
  app.use('/scrap', scrapRouter);
  // Register media APIs
  app.use('/media', mediaRouter);
  
  app.use(errorHandler);

  app.listen(PORT, async () => {
    const _baseUrl = process.env.BASE_URL || "http://localhost";
    const _launchUrl = `${_baseUrl}:${PORT}`;
    console.log(`server started at ${_launchUrl}`);
  });
}

main().catch((err) => {
  console.error(err);
});
