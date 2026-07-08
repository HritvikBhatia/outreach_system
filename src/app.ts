import express  from "express";
import contactRoutes from "./routes/contact.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();

app.use(express.json());

// routes
app.use("/contacts", contactRoutes);

app.use("/events", eventRoutes);

export default app;