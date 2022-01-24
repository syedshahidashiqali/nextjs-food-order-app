import cookie from "cookie"

export default function handler(req, res) {

  if(method === "POST"){

    const { username, password } = req.body
    if(username === process.env.USERNAME && password === process.env.PASSWORD) {
      res.setHeaders(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60, // number in seconds, it is one hour
          sameSite: "strict",
          path: "/",
          // httpOnly: true,
          // secure: true,
        })
      )
    }
    res.status(200).json("Successful!")
  } else {
    res.status(400).json("Wrong credentials!")
  }
}