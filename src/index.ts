import { dbConnection } from "./_common/database/db-connection";
import app from "./app";

dbConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
