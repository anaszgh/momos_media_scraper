import logger from "../utils/logger";

const errorHandler = async (err, req, res, next) => {
    console.log("err");
    logger.error(err);
    res.status(500).send("An error has ocurred");
}

export default errorHandler;