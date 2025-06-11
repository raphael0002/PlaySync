import app from "./src/app.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}, 200); // 200ms delay for restarting the debugger without config issues

