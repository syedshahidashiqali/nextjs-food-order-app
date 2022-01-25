import dbConnect from "../../../util/dbConnect"
import Order from "../../../models/Order"

export default async function handler(req, res) {

  await dbConnect()

  const { method } = req

  // GET Method for getting all orders
  if(method === "GET"){
    try {
      const orders = await Order.find()
      res.status(200).json(orders)
    }catch(err){
      res.status(500).json({message:"get all orders (GET)", error: err})
    }
  }

  // POST Method for creating an order
  if(method === "POST"){
    try{
      const order = await Order.create(req.body)
      res.status(201).json(order)
    }catch(err){
      res.status(500).json({message:"create an order (POST)", error: err})
    }
  }
}