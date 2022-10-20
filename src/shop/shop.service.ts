import { db } from "../utils/db.server";
import type { Fruit } from "../fruit/fruit.service"

type ShopReserved = {
    id: number,
    shopName: string,
    active: boolean, 
    createdAt: Date,
    fruit: Fruit,
    // fruitId: number
}

type newShop = {
    shopName: string,
    active: boolean,
    fruitId: number
}

export const createShop = async(shop: newShop): Promise<newShop> => {
    const {shopName, active, fruitId} = shop;
    return db.shop.create({
         data:{
            shopName,
            active,
            fruitId
         },
         select:{
            shopName: true,
            active:true,
            fruitId: true,
         },
    })
}


export const listShop = async(): Promise<ShopReserved[]> => {
    return db.shop.findMany({
        select:{
            id:true,
            shopName: true,
            active: true,
            createdAt: true,
            fruit:{
                select:{
                    id:true,
                    name:true,
                    createdAt:true
                }
            }
        }
    })
}

export const singleShop = async(id: number): Promise <ShopReserved | null> => {
    return db.shop.findUnique({
        where:{
            id,
        },
        select:{
            id:true,
            shopName: true,
            active: true,
            createdAt: true,
            fruit:{
                select:{
                    id:true,
                    name:true,
                    createdAt:true
                }
            }
        }
    })
}

export const updateShop = async( id: number, shop: newShop): Promise<ShopReserved> => {
    const {shopName, active, fruitId} = shop
    return db.shop.update({
        where:{
            id,
        }, 
        data:{
            shopName,
            active,
            fruitId
        },
        select:{
            id:true,
            shopName: true,
            active: true,
            createdAt: true,
            fruit:{
                select:{
                    id:true,
                    name:true,
                    createdAt:true
                }
            }
        }
    })
}

export const deleteShop = async(id: number): Promise<void> => {
    await db.shop.delete({
        where:{
            id
        }
    })
}