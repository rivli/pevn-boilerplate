import { Pool } from "pg";
import { logger } from "../utils/logger";

class Database {
  pool: Pool;

  init() {
    this.pool = new Pool();
    logger.info("[db]: Pool created");
  }

  async query(query: string, params: any) {
    return await this.pool.query(query, params);
  }
}

const db = new Database();

export default db;
