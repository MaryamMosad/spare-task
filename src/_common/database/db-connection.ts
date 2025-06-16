import { Sequelize } from "sequelize-typescript";
import { models } from "./models";

export function dbConnection() {
  const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASS,
    models,
    logging: false,
  });

  sequelize
    .sync({ force: false })
    .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"))
    .catch((err) =>
      console.log(err.original)
      // console.error(
      //   `An Error Ocurred while connecting to the database\n => ${err}`
      // )
    );
}


