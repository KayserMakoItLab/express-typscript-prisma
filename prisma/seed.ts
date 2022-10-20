import {db} from "../src/utils/db.server";

type Fruit = {
    name : string;
}

type Shop = {
    shopName : string;
    active: boolean;
}

async function seed() {
    await Promise.all(
        getFruits().map((fruit) => {
            return db.fruit.create({
                data:{
                    name: fruit.name
                }
            })
        })
    )
    const fruit = await db.fruit.findFirst({
        where:{
            name: "Orange"
        }
    })
    
    await Promise.all(
        getShops().map((shop) => {
            const {shopName, active} = shop
            return db.shop.create({
                data: {
                    shopName,
                    active,
                    fruitId : fruit!.id,
                }
            })
        })
    )
}

seed();

function getFruits(): Array<Fruit> {
    return [
        {
            name:"Apple"
        },{
            name:"Orange"
        },{
            name:"Pineapple"
        },{
            name:"Grapes"
        }
    ]
}

function getShops(): Array<Shop>{
    return [
        {
            shopName: "KAJAJ Bros",
            active: false
        },{
            shopName: "Sarasam Tech",
            active: true
        },{
            shopName: "BOU",
            active: true
        }
    ]
}