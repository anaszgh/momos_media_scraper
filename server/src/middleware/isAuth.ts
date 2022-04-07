import { User } from "../entity/User";
import logger from "../utils/logger";


const isAuth = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).end();
  }

  try {
    const [schema, token] = authorization.split(" ");
    //JWT Authentication
    if (schema.toLocaleLowerCase() == 'basic') {
      console.log(token)
      let decodedToken = Buffer.from(token, 'base64').toString();
      let [email, password] = decodedToken.split(':');
      console.log(email)
      console.log(password)
      const user = await User.findOne({ where: { email } });
      console.log(user);
      if (user == undefined) {
        console.log("user not found")
        return res.status(404).end();
      }

      const verified = password == user.password;

      if (!verified) {
        return res.status(401).end();
      }
      return next();
    } else {
      return res.status(401).end();
    }
  } catch (err) {
    logger.error(err);
    console.log(err);
    return res.status(401).end();
  }
};

export default isAuth;
