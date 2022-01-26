import cookie from "cookie"
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  if(req.method === "POST"){

    const { username, password } = req.body
    if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      await res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60, // number in seconds, it is one hour
          sameSite: "strict",
          path: "/",
          // httpOnly: true,
          // secure: true,
        })
      )
      res.status(200).json("Successful!")
    } else{
      res.status(400).json({message:"Wrong credentials! login", error: err})
      }
  }
}