import { app  } from "./app.js";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT || 8002;

app.listen(PORT, () => console.log(`User service is running at http://localhost:${PORT}`))