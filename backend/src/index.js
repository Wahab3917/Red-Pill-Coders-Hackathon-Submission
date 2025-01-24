import app from "./app.js";
import { PORT } from "./config/constants.js";

const port = PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
