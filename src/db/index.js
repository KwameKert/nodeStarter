import Sequelize from "sequelize";
import pg from "pg";
import constants, {isTest, isDev} from "../config/constants";

pg.defaults.parseInt8 = true;

const sequelize = new Sequelize(
    constants.DB_NAME,
    constants.DB_USER,
    constants.DB_PASS,
    {
        host: constants.DB_HOSTNAME,
        dialect: "postgres",

        pool: {
            max: 16,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            freezeTableName: true,
        },
        logging: isDev(),
        // logging: true,
    }
);

Sequelize.postgres.DECIMAL.parse = (value) => parseFloat(value);

sequelize
    .authenticate()
    .then(() => {
        console.log("env is: ", process.env.NODE_ENV);
        if (!isTest()) {
            console.log("Connection has been established successfully.");
        }
    })
    .catch((err) => {
        console.log("env is: ", process.env.NODE_ENV);
        console.error("Unable to connect to the database:", err);
    });

export default sequelize;
