import dbConnect from "../../../util/dbConnect"
import Product from "../../../models/Product"

export default async function handler(req, res) {

  dbConnect()

  const { 
    method,
    query: { id } 
  } = req

  // GET Method for getting a product
  if(method === "GET"){
    try {
      const product = await Product.findById(id)
      res.status(200).json(product)
    }catch(err){
      res.status(500).json(err)
    }
  }

  // PUT Method for updating product
  if(method === "PUT"){
    try{
    }catch(err){
      res.status(500).json(err)
    }
  }

  // DELETE Method for deleting product
  if(method === "DELETE"){
    try{
    }catch(err){
      res.status(500).json(err)
    }
  }
}