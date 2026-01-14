"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const db_1 = require("./db");
const checker_1 = require("./checker");
const handler = async () => {
    const result = await db_1.pool.query(`SELECT id, url, expected_status FROM endpoints WHERE is_active = true`);
    for (const endpoint of result.rows) {
        await (0, checker_1.checkEndpoint)(endpoint);
    }
    return {
        statusCode: 200,
        body: "Uptime check completed"
    };
};
exports.handler = handler;
