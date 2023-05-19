import { User } from "@/models/user";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    const {method} = req;
    
    await mongooseConnect();
    console.log('db')
/*



      connectToDB().then(()=>{
        let userExists;
        User.findOne({
          email: user.user.email
        }).then((res)=>{
          userExists = res;
        }).catch((err)=>{
          console.log(err);
        })

        if(!userExists) {
          User.create({
            email: user.user.email,
            username: user.user.name.replace(' ', '').toLowerCase(),
            image: user.user.picture
          })
        }

        return true;
      }).catch((err)=>{
        console.log(err);
      })




    if(method === 'GET'){
        if(req.query?.id) {
            res.json(await Product.findOne({_id:req.query.id}));
        } else {
            res.json(await Product.find());
        }
    }

    if(method === 'POST'){
        const {title, description, price} = req.body;
        const productDoc = await Product.create({
            title, description, price
        })
        res.json(productDoc);
    }

    if(method === 'PUT'){
        const {_id, title, description, price} = req.body;
        await Product.updateOne({_id}, {title, description, price});
        res.json(true);
    }

    if(method === 'DELETE'){
        if(req.query?.id) {
            await Product.deleteOne({_id:req.query.id});
        }
        res.json(true);
    }
    */
}