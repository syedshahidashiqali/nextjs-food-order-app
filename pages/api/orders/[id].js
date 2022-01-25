import dbConnect from "../../../util/dbConnect"
import Order from "../../../models/Order"
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
 });

  await dbConnect()

  const { 
    method,
    query: { id } 
  } = req

  // GET Method for getting an order
  if(method === "GET"){
    try {
      const order = await Order.findById(id)
      res.status(200).json(order)
    }catch(err){
      res.status(500).json({message:"get an order (GET)", error: err})
    }
  }

  // PUT Method for updating an order
  if(method === "PUT"){
    try{
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.status(201).json(order)
    }catch(err){
      res.status(500).json({message:"update an order(PUT)", error: err})
    }
  }

  // DELETE Method for deleting an order
  // if(method === "DELETE"){
  //   try{
  //   }catch(err){
  //     res.status(500).json(err)
  //   }
  // }
}