import "dotenv/config"; 

import app from "./app.js";
import { connectDB } from "./config/db.js";
import "./queues/call.queue.js";
import "./workers/call.worker.js";


await connectDB();

app.get("/", (req, res) => {
    res.json({
        msg: "hello"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});