import "reflect-metadata";
import { Connection, createConnection, getConnection } from "typeorm";
import { User, UserAuth } from "./entity/index";

let connectionReadyPromise: Promise<Connection> | null = null;
const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
} = process.env;
const entities = [User, UserAuth];

export const prepareConnection = () => {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            try {
                const staleConnection = getConnection();
                await staleConnection.close();
            } catch (error) {
                console.log(error);
            }

            return await createConnection({
                type: "mysql",
                host: DATABASE_HOST,
                port: Number(DATABASE_PORT),
                username: DATABASE_USERNAME,
                password: DATABASE_PASSWORD,
                database: DATABASE_NAME,
                entities,
                synchronize: false,
                logging: true,
            });
        })();
    }

    return connectionReadyPromise;
};
