import "reflect-metadata";
import { createConnection } from "typeorm";
import { ScrapperService } from "./services/scrapper";

async function callService() {
  const scrapperService: ScrapperService = new ScrapperService();
  console.log("Checking for new pages to scrap")
  await scrapperService.checkForPages();
  setTimeout(callService, 60000);
}
async function main() {
  await createConnection();
  await callService();
}

main().catch((err) => {
  console.error(err);
});
