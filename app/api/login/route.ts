import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const SECRET = "mysecretkey"

// Demo user (since no register)
const user = {
  email: "admin@gmail.com",
  password: bcrypt.hashSync("123456", 10)
}
export async function POST(req: Request) {
  const body = await req.json()

  const email = body.email.trim()
  const password = body.password.trim()

  if (email !== user.email) {
    return NextResponse.json({ error: "Invalid email" }, { status: 401 })
  }

  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" })

  return NextResponse.json({ token })
}