import fs from "fs";
import path from "path";

// handle req and res
import { ServerResponse, IncomingMessage } from "http";
import _express, { Request, Response } from "express";

//access the task structure
import { Task } from "./ITask";

const getTasks = (_req: IncomingMessage, res: ServerResponse) => {
  return fs.readFile(
    path.join(__dirname, "store.json"),
    "utf-8",
    (err, data) => {
      //Read the store.json file
      // Check out any errors
      if (err) {
        //error, send and error message
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: err,
          }),
        );
      } else {
        //no error , send the data
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
      }
    },
  );
};

const addTask = (req: Request, res: Response) => {
  // Since Express.js automatically parses the JSON body, you can directly use req.body
  let task: Task = req.body;

  // Read the store.json file
  fs.readFile(path.join(__dirname, "store.json"), "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    } else {
      let tasks: Task[] = JSON.parse(data);
      let latest_id = tasks.reduce(
        (max = 0, task: Task) => (task.id > max ? task.id : max),
        0,
      );
      task.id = latest_id + 1;
      tasks.push(task);

      fs.writeFile(
        path.join(__dirname, "store.json"),
        JSON.stringify(tasks),
        (err) => {
          if (err) {
            res.status(500).json({
              success: false,
              error: err,
            });
          } else {
            res.status(200).json({
              success: true,
              message: task,
            });
          }
        },
      );
    }
  });
};

const updateTask = (taskID: number, req: Request, res: Response) => {
  // Read the data from the request
  // When the request is done
  console.log(JSON.stringify(req.body));
  // Parse the data
  let task: Task = req.body;
  console.log(`data =>` + JSON.stringify(req.body));
  // Read the store.json file
  fs.readFile(path.join(__dirname, "store.json"), "utf8", (err, data) => {
    // Check out any errors
    if (err) {
      // error, send an error message
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: err,
        }),
      );
    } else {
      // no error, get the current tasks
      let tasks: [Task] = JSON.parse(data);
      // find the task with the id
      let index = tasks.findIndex((t) => t.id == taskID);
      // replace the task with the new one
      tasks[index] = task;
      // write the new tasks array to the store.json file
      fs.writeFile(
        path.join(__dirname, "store.json"),
        JSON.stringify(tasks),
        (err) => {
          // Check out any errors
          if (err) {
            // error, send an error message
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                error: err,
              }),
            );
          } else {
            // no error, send the data
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: true,
                message: task,
              }),
            );
          }
        },
      );
    }
  });
};

const deleteTask = (
  taskID: number,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  // Read the data from the request

  req.on("data", (_chunk) => { });
  // When the request is done
  req.on("end", () => {
    // Parse the data
    // Read the store.json file
    fs.readFile(path.join(__dirname, "store.json"), "utf8", (err, data) => {
      // Check out any errors
      if (err) {
        // error, send an error message
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: err,
          }),
        );
      } else {
        // no error, get the current tasks
        let tasks: [Task] = JSON.parse(data);
        // find the task with the id
        let index = tasks.findIndex((t) => t.id == taskID);
        // remove the task
        tasks.splice(index, 1);
        // write the new tasks array to the store.json file
        fs.writeFile(
          path.join(__dirname, "store.json"),
          JSON.stringify(tasks),
          (err) => {
            // Check out any errors
            if (err) {
              // error, send an error message
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: false,
                  error: err,
                }),
              );
            } else {
              // no error, send the data
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  message: "UwU",
                }),
              );
            }
          },
        );
      }
    });
  });
};

export { getTasks, addTask, updateTask, deleteTask };
