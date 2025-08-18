import  express from "express"; 
import { prismaClient } from "db/client";
import { CrateUserInput } from "./types";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { authMiddleware } from "./middleware";
import { JWT_SECRET } from "./config";
const app = express(); 
app.use(express.json());

app.post("/user/signup", async (req , res) => {
        const parsedData = CrateUserInput.safeParse(req.body)
     
     if(!parsedData.success) {
         res.json({
            message : "Invalid Input Fields"
        })
        return;
    }

    try {

        const existinguser = await prismaClient.user.findUnique({
            where: {
                username : parsedData.data.username
            }
        })

        if(existinguser) {
            res.json({
                message : "username already take"
            })
            return;
        }
        
        const hashPassword = await bcrypt.hash(parsedData.data.password, 10);
        const  user = await prismaClient.user.create({
        data : {
            username: parsedData.data.username,
            password : hashPassword
        }

     })  
        res.json({
          id:  user.id
        })

     }  catch(e){
         console.log(e)
        res.json({
            message :"error in sinup endpoint"
        });
    }
});

app.post("/user/signin", async ( req , res)=> {

    const parsedData = CrateUserInput.safeParse(req.body)

    if(!parsedData.success) {
         res.json({
            message: "invalid credincials "
        })
        return;
    }

    const user = await prismaClient.user.findFirst({
        where : {
           username:  parsedData.data.username
        }
    })

     if (!user) {
         res.status(401).json({
            message: "User not found"
        });
        return;
    }
    

    const checkPassword  = await bcrypt.compare(parsedData.data.password, user.password)

    if (!checkPassword) {
         res.status(401).json({
            message: "Incorrect password"
        });
        return;
    }


    const token  = jwt.sign({
        userId : user.id
    }, JWT_SECRET)

    res.json({
        token
    })


})

app.post("/website", authMiddleware, async (req, res) => { 
    if (!req.body.url) {
        res.status(411).json({});
        return;
    }

    const website = await prismaClient.website.create({
        // @ts-ignore
        data: {
            url : req.body.url,
            timeAddend : new Date(), 
            user_id : req.userId
        }
    })

    res.json({
        id: website.id
    })
});

app.get("status/:websiteId", authMiddleware, async (req ,res)=> {
    const website = await prismaClient.website.findFirst({
        where : {
             user_id: req.userId,
             id: req.params.websiteId,
         },
         include : {
            ticks: {
                orderBy: [{
                    createdAt : "desc",
                }], 
                take : 1
            }
         }
    })

    if(!website) {
        res.status(409).json({
            message: "Not fount"
        })
        return;
    }

    res.json({
        url: website.url,
        id: website.id,
        user_id: website.user_id
    })
})

app.listen(3001, ()=> console.log("Server Started at PORT: 3001"));