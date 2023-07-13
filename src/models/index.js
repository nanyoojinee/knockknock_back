import Sequelize from "sequelize";
import Config from "../config/config.json" assert { type: "json" };
import User from "./user.js";
const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User(sequelize, Sequelize);
Object.keys(db).forEach((modelName) => {
  // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
