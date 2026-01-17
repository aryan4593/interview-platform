import express from "express"
import { ENV } from "./lib/env.js";
const app = express();

app.get("/health", (req, res)=>{
    res.status(200).json({msg:"API is up and running"});
});
console.log(ENV.PORT)
app.listen(ENV.PORT,()=>{console.log(`server is running on http://localhost:${ENV.PORT}`)})
