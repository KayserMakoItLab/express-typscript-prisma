import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {fruitRouter} from "./fruit/fruit.router"
import { shopRouter } from "./shop/shop.router";

dotenv.config();

if(!process.env.PORT){
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/all-fruits", fruitRouter)
app.use("/api/all-shops", shopRouter)

app.listen(PORT, () => {  
    console.log(`App is listening on port ${PORT}`);
    
})