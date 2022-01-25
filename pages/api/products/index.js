import dbConnect from "../../../util/dbConnect"
import Product from "../../../models/Product"
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  await dbConnect()

  const { method, cookies } = req

  if(method === "GET"){
    try {
      const products = await Product.find()
      res.status(200).json(products)
    }catch(err){
      res.status(500).json({message:"get all product (GET)", error: err})
    }
  }

  if(method === "POST"){
    const token = cookies.token
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not Authenticated!")
    }
    try{
      const product = await Product.create(req.body);
      res.status(201).json(product)
    }catch(err){
      res.status(500).json({message:"create a product (POST)", error: err})
    }
  }
}