import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "users.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let users: User[] = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      if (raw.trim()) {
        users = JSON.parse(raw);
      }
    }

    if (users.some((u) => u.email === email)) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (users.some((u) => u.username === username)) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const user: User = {
      id,
      username,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "users.json");

    if (!fs.existsSync(filePath)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const users: User[] = raw.trim() ? JSON.parse(raw) : [];

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );


    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};
