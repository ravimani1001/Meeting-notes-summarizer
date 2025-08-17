// import dotenv from 'dotenv';
// dotenv.config()
// loadEnv.js
import 'dotenv/config';

import app from "./app.js";


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
