import { app  } from "./app.js";
import { configDotenv } from "dotenv";

configDotenv();
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`Product service is running at http://localhost:${PORT}`))
