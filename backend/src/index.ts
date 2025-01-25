import app from "./app";
import { PORT } from "./config/constants";

const port = PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
