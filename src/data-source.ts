import { DataSource } from "typeorm";
import { Post } from "./entity/post";
import { User } from "./entity/user";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "js_project",
    synchronize: true,
    // logging: true,
    entities: [Post, User],
    subscribers: [],
    migrations: [],
});
