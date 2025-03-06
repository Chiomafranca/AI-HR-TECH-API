// src/config/env.js
import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "DB_TYPE",
  "MONGO_URI",
  "POSTGRES_URI",
  "JWT_SECRET",
  "OPENAI_API_KEY",
  "REDIS_URL",
];

requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

export default process.env;
