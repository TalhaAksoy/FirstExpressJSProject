import { getTasks, addTask, updateTask, deleteTask } from "./controller";
import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const port = 3000;

app.use(cors(), express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send(`Express JS Backend Running on Port ${port} , try send request :3`);
});

app.get("/api/getTasks", (req: Request, res: Response) => {
  console.log(`req.url => ${req.url} && req.method => ${req.method}`);
  return getTasks(req, res);
});

app.post("/api/addTask", (req: Request, res: Response) => {
  console.log(`req.url => ${req.url} && req.method => ${req.method}`);
  return addTask(req, res);
});

app.put("/api/updateTask/:id", (req: Request, res: Response) => {
  console.log(`req.url => ${req.url} && req.method => ${req.method}`);
  const idValue: number = Number(req.params.id);
  return updateTask(idValue, req, res);
});

app.delete("/api/deleteTask/:id", (req: Request, res: Response) => {
  console.log(`req.url => ${req.url} && req.method => ${req.method}`);
  const idValue: number = Number(req.params.id);
  return deleteTask(idValue, req, res);
});

app.listen(port, () => {
  console.log(`[server] : Server is running at http://localhost:${port}`);
});

{
  /*
const server = HTTP.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With ,Content-Type, Accept , Authorization",
  );

  console.log(`req.url => ${req.url} && req.method => ${req.method}`);

  if (req.method == "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method == "GET" && req.url == "/api/getTasks") {
    return getTasks(req, res);
  }

  if (req.method == "POST" && req.url == "/api/addTask") {
    console.log("Geldi");
    return addTask(req, res);
  }

  if (req.method == "PUT" && req.url == "/api/updateTask") {
    return updateTask(req, res);
  }

  if (req.method == "DELETE" && req.url?.startsWith("/api/deleteTask")) {
    const urlParts = req.url.split("/");
    return deleteTask(Number(urlParts[3]), req, res);
  }
});

server.listen(3000, () => {
  console.log("Server is Running on port 3000. Go to http://localhost:3000");
}); */
}
