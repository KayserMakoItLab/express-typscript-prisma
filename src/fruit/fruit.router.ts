import express from "express";
import type { Request, Response } from "express";
import {body, validationResult} from "express-validator"
import * as FruitSerive from "./fruit.service" 
import { request } from "http";
import { AnyTxtRecord } from "dns";

export const fruitRouter = express.Router();

fruitRouter.post("/", body("name").isString(), async( request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({error: errors.array()})
    }
    try{
        const fruit = request.body;
        const newFruit = await FruitSerive.createFruit(fruit);
        return response.status(200).json(fruit)
    } catch(error: any){
        return response.status(500).json(error.message)
    }
})

fruitRouter.get("/", async (request: Request, response: Response) => {
    try{
        const fruits = await FruitSerive.listFruits();
        return response.status(200).json(fruits)
    } catch(error: any) {
        return response.status(500).json(error.message)
    }
})

fruitRouter.get("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try{
        const oneFruit = await FruitSerive.singleFruit(id); 
        return response.status(200).json(oneFruit);
    }catch(error:any){
        return response.status(500).json("fruit could not found")
    }
})

fruitRouter.put("/:id", body("name").isString(), async(request: Request, response: Response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({error: errors.array()})
    }
    const id: number = parseInt(request.params.id, 10)
    try{
        const fruit = request.body;
        const updateFruit = await FruitSerive.updateFruit(fruit, id)
        return response.status(200).json(updateFruit)
    } catch (errors: any){
        return response.status(500).json(errors.message)
    }
})

fruitRouter.delete("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try{
        await FruitSerive.deleteFruit(id);
        return response.status(200).json("Fruit deleted succeddfully!")
    } catch (errors: any) {
        return response.status(500).json(errors.message)
    }
})