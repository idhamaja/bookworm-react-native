import express from "express";
import "dotenv/config";

import authRoutes from "./src/routes/authRoutes.js";
import bookRoutes from "./src/routes/bookRoutes.js";
import { connectDB } from "./src/lib/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// --- ADD THIS ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace to the console
  res.status(500).json({
    message: "Internal server error",
    error: err.message, // Send the error message to the client
    // In development, you might send the full stack:
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} boss !!!`);
  connectDB();
});

export default app;
