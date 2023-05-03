import { AppDataSource } from "../data-source"
import { User } from "../entity/user"

const repository = AppDataSource.getRepository(User);

export default repository