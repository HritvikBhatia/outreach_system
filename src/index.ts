import app from "./app.js";
import dotenv from "dotenv";
import { connectDB  } from "./config/db.js";

dotenv.config();


await connectDB();

app.get("/", (req, res) => {
    res.json({
        msg: "hello"
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
});