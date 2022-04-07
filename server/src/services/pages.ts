import { FoundPage } from "../entity/FoundPage";
import logger from "../utils/logger";

export class PagesService {
    private urlValidator = /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    public handleRequest(data: string) {
        //check body data is an array of strings as expected
        if (!Array.isArray(data)) {
            return;
        }
        console.log(data.length);
        //loop over each item to process
        data.forEach((entry) => {
            if (this.isURLValid(entry)) {
                this.storeInDatabase(entry);
            } else {
                console.log("not valid");
            }
        });
    }
    private isURLValid(url: string): boolean {
        if (typeof (url) != 'string') {
            return false;
        }
        const result: boolean = this.urlValidator.test(url);
        return result;
    }
    private async storeInDatabase(url: string) {
        var exists = await this.pageExists(url);
        if (!exists) {
            const page: FoundPage = new FoundPage();
            page.URL = url;
            page.foundAt = new Date();
            page.scraped = false;
            page.save()
                .catch((err) => {
                    logger.error(err);
                })
        }
    }
    private async pageExists(url): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const exisitngURL = await FoundPage.find({ where: { URL: url } })
            if (exisitngURL != undefined && exisitngURL.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    }
}