import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const {method} = req;
    
    await mongooseConnect();

    if(method === 'POST'){
        const {title, desciption, price} = req.body;
        const productDoc = await Product.create({
            title, desciption, price
        })
        res.json(productDoc);
    }
}