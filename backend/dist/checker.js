"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEndpoint = checkEndpoint;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("./db");
const alert_1 = require("./alert");
const config_1 = require("./config");
async function checkEndpoint(endpoint) {
    const startTime = Date.now();
    let isUp = false;
    let statusCode = 0;
    try {
        const response = await axios_1.default.get(endpoint.url, {
            timeout: config_1.config.timeoutMs
        });
        statusCode = response.status;
        isUp = response.status === endpoint.expected_status;
    }
    catch (error) {
        isUp = false;
    }
    const responseTime = Date.now() - startTime;
    await db_1.pool.query(`INSERT INTO checks (endpoint_id, status_code, response_time_ms, is_up)
     VALUES ($1, $2, $3, $4)`, [endpoint.id, statusCode, responseTime, isUp]);
    if (!isUp) {
        await (0, alert_1.sendAlert)(`🚨 ALERT: ${endpoint.url} is DOWN`);
    }
}
