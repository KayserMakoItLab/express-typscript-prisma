import { db } from "../utils/db.server";

export type Fruit = {
    id: number;
    name: string;
    createdAt: Date;
}

export const createFruit = async(fruit: Omit<Fruit, "id">): Promise<Fruit> => {
    const {name} = fruit;
    return db.fruit.create({
         data:{
            name
         },
         select:{
            id:true,
            name: true,
            createdAt:true
         },
    })
}

export const listFruits = async(): Promise<Fruit[]> => {
    return db.fruit.findMany({
        select:{
            id:true,
            name: true,
            createdAt: true
        }
    })
}

export const singleFruit = async(id: number): Promise<Fruit | null> => {
    return db.fruit.findUnique({
        where:{
            id,
        }
    })
}

export const updateFruit = async(fruit: Omit<Fruit, "id">, id: number): Promise<Fruit> => {
    const {name} = fruit;
    return db.fruit.update({
        where:{
            id, 
        }, data:{
            name,
        }, select:{
            id: true,
            name: true,
            createdAt: true
        }
    })
}

export const deleteFruit = async(id: number): Promise<void> => {
    await db.fruit.delete({
        where:{
            id
        }
    })
}