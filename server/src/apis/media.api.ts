import express from "express";
import { getRepository } from "typeorm";
import { Media } from "../entity/Media";
import isAuth from "../middleware/isAuth";
const router = express.Router();

router.get('/search', isAuth, async (req, res) => {
    const type = req.query.type;
    const keywords = req.query.keywords;
    let page = req.query.page;
    if (page == undefined || page == null || page == "") {
        //default page is first page
        page = 1;
    }
    const pagesize = 10;//default page size is 10
    const skip = (page-1) * pagesize;
    var query = getRepository(Media)
        .createQueryBuilder("media");
    if (type != undefined && type != null && type != "") {
        query = query.where("LOWER(media.MediaType) like :type", { type: `%${type}%` });
    }
    if (keywords != undefined && keywords != null && keywords != "") {
        query = query.andWhere("LOWER(media.URL) like :keywords", { keywords: `%${keywords}%` });
    }
    const totalCount = await query.getCount();
    const data = await query
    .skip(skip)
    .take(pagesize)
    .getMany();
    res.send({
        pages:Math.ceil((totalCount/pagesize)),
        data:data
    });
})

export default router