import dbConnect from "../../../util/dbConnect"
import Product from "../../../models/Product"

export default async function handler(req, res) {

  dbConnect()

  const { 
    method,
    query: { id },
    cookies,
  } = req

  const token = cookies.token
  
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
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not Authenticated!")
    }
    try{
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true
      })
      res.status(201).json(product)
    }catch(err){
      res.status(500).json(err)
    }
  }

  // DELETE Method for deleting product
  if(method === "DELETE"){
    if(!token || token !== process.env.TOKEN){
      return res.status(401).json("Not Authenticated!")
    }
    try{
      await Product.findByIdAndDelete(id)
      res.status(200).json("The product has been deleted successfully!")
    }catch(err){
      res.status(500).json(err)
    }
  }
}