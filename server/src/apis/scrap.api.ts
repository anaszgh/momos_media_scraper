import express from "express";
import isAuth from "../middleware/isAuth";
import { PagesService } from "../services/pages";

const router = express.Router();
const scrapService:PagesService = new PagesService();
router.post('/', isAuth, (req, res) => {
    const body = req.body;
    scrapService.handleRequest(body);
    res.send({recieved:true});
});

export default router;