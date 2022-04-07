import { FoundPage } from "../entity/FoundPage";
import axios from 'axios';
import { CheerioAPI, load } from 'cheerio';
import { URL } from 'url';
import { Media } from "../entity/Media";
//import logger from "../utils/logger";
export class ScrapperService {
    private urlValidator = /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    public async checkForPages() {
        var pages = await FoundPage.find({ where: { scraped: false } })
        if (pages == undefined || pages.length == 0) {
            //call the check again in 2 minutes
            setTimeout(() => this.checkForPages, 120000);
        }
        else {
            pages.forEach(async (entry) => {
                this.scrapPage(entry.URL);
                await this.setAsScraped(entry);
            })
        }
    }
    private async setAsScraped(page: FoundPage) {
        page.scraped = true;
        await page.save();
    }
    private async scrapPage(address) {
        const html = await this.getContent(address);
        const $ = load(html);
        const images = this.getImages($, address);
        const videos = this.getVides($,address);
        
        this.processMedia(images);
        this.processMedia(videos);
    }
    private async getContent(url) {
        const response = await axios.get(url);
        return response.data;
    }
    private getImages($, address):Array<Media> {
        return $('img')
            .toArray()
            .map(element => {
                const elem = $(element);
                let src = elem.attr('src');
                const desc = elem.attr('alt');
                var media = new Media();
                media.URL=src;
                media.MediaType='Image';
                media.Description=desc;
                media.ParentURL=address;
                return media;
            });
    }
    private getVides($:CheerioAPI,address) {
        const videos = $('video')
        .toArray();
        // define media array to store processed video urls, we will store multiple files
        // for the same video if it has multiple <source> children
        const videosMedia = new Array<Media>();
        //loop over videos to check if it has src directly, or <source> child
        if(videos != undefined && videos.length>0){
            videos.forEach((entry)=>{
                const element = $(entry);
                var src = element.attr('src');
                if(src!=undefined){
                    const videoMedia = new Media();
                    videoMedia.Description="";
                    videoMedia.MediaType="Video";
                    videoMedia.ParentURL=address;
                    videoMedia.URL=src;
                    videosMedia.push(videoMedia);
                }else{
                    const sources = element.children('source').toArray();
                    if(sources!=undefined && sources.length>0){
                        sources.forEach((source)=>{
                            var mediaSource = $(source).attr('src');
                            var mediaType = $(source).attr('type');
                            const videoMedia = new Media();
                            videoMedia.Description="";
                            videoMedia.MediaType=mediaType;
                            videoMedia.ParentURL=address;
                            videoMedia.URL=mediaSource;
                            videosMedia.push(videoMedia);
                        })
                    }
                   
                }
            });
        }
        return videosMedia;
    }
    private async processMedia(media: Array<Media>) {
        //validate the image url, and try to fix it, then save it to database
        //also check if it doesn't exist to avoid duplications
        media.forEach(async (entry) => {
            var parentURL = new URL(entry.ParentURL)
            //check if valid url, then save it and continue
            if (this.urlValidator.test(entry.URL)) {
                await this.saveMedia(entry);
            }else{
                //first case that it is a relative URL, starts with (/) then the url
                if(entry.URL.indexOf('//')!=0 && entry.URL.indexOf('/')==0){
                    entry.URL = `${parentURL.protocol}//${parentURL.host}${entry.URL}`;
                    this.saveMedia(entry);
                }
                //second case that it is an external url starts with //
                else if(entry.URL.indexOf('//')==0){
                    entry.URL= "http://" + entry.URL.slice(2,entry.URL.length);
                    this.saveMedia(entry);
                }
                //third case that is a relative url that doest start with / and not http (https included)
                else if(entry.URL.indexOf('/')!=0 && entry.URL.indexOf('http')!=0){
                    entry.URL=`${parentURL.protocol}//${parentURL.host}/${entry.URL}`;
                    this.saveMedia(entry);
                }
            }
        });
    }

    private async saveMedia(media: Media) {
        //check if there is no duplication
        const exists = await this.mediaExists(media.URL);
        if (!exists) {
            //save
            await media.save();
        }
    }

    private async mediaExists(url): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const exisitngURL = await Media.find({ where: { URL: url } })
            if (exisitngURL != undefined && exisitngURL.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    }
}