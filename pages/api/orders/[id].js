import dbConnect from "../../../util/dbConnect"
import Order from "../../../models/Order"

export default async function handler(req, res) {

  dbConnect()

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
      res.status(500).json(err)
    }
  }

  // PUT Method for updating an order
  if(method === "PUT"){
    try{
    }catch(err){
      res.status(500).json(err)
    }
  }

  // DELETE Method for deleting an order
  if(method === "DELETE"){
    try{
    }catch(err){
      res.status(500).json(err)
    }
  }
}