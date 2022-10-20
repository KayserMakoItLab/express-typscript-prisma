import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator"
import * as ShopService from "./shop.service"

export const shopRouter = express.Router();

shopRouter.post("/", 
body("shopName").isString(), 
body("active").isBoolean(), 
body("fruitId").isNumeric(), 
async( request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({error: errors.array()})
    }
    try{
        const shop = request.body;
        const newShop = await ShopService.createShop(shop);
        return response.status(200).json(shop)
    } catch(error: any){
        return response.status(500).json(error.message)
    }
})

shopRouter.get("/",async (request: Request, response: Response) => {
    try{
        const shopList = await ShopService.listShop()
        return response.status(200).json(shopList);
    } catch(errors: any){
        return response.status(500).json(errors.message);
    }
})

shopRouter.get("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try{
        const oneShop = await ShopService.singleShop(id); 
        return response.status(200).json(oneShop);
    }catch(error:any){
        return response.status(500).json("shop could not found")
    }
})

shopRouter.put("/:id", 
body("shopName").isString(), 
body("active").isBoolean(), 
body("fruitId").isNumeric(), async(request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({error: errors.array()})
    }
    const id: number = parseInt(request.params.id, 10)
    try{
        const shop = request.body;
        const updateshop = await ShopService.updateShop(id, shop)
        return response.status(200).json(updateshop)
    } catch (errors: any){
        return response.status(500).json(errors.message)
    }
})

shopRouter.delete("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try{
        await ShopService.deleteShop(id);
        return response.status(200).json("Shop deleted succeddfully!")
    } catch (errors: any) {
        return response.status(500).json(errors.message)
    }
})