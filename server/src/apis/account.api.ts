import express from "express";
import { User } from "../entity/User";
const router = express.Router();

router.post('/register', async (req, res) => {
    const body = req.body;
    if(body.email == undefined || body.password == undefined){
        res.status(400).send("Missing information");
    }
    let user:User = new User();
    user.email=body.email;
    user.firstName=body.firstName;
    user.lastName=body.lastName;
    user.password=body.password;
    var result = await user.save();
    console.log(result);
    if(result)
        res.send(result);
    else{
        res.status(500).send('Failed to create user');
    }
});

router.post('/login',async (req,res)=>{
    const body = req.body;
    if(body.email == undefined || body.password == undefined){
        res.status(400).send("Missing information");
    }else{
        const users = await User.find({where:{email:body.email}});
        if(users==undefined || users.length==0){
            res.status(401).send("Invalid username");
        }else{
            const user = users[0];
            if(user.password == body.password){
                res.status(200).send("Success");
            }else{
                res.status(401).send("Invalid password");
            }
        }
    }
})


export default router;


