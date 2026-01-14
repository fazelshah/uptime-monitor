import axios from "axios";
import { pool } from "./db";
import { sendAlert } from "./alert";
import { Endpoint } from "./types";
import { config } from "./config";

export async function checkEndpoint(endpoint: Endpoint) {
  const startTime = Date.now();
  let isUp = false;
  let statusCode = 0;

  try {
    const response = await axios.get(endpoint.url, {
      timeout: config.timeoutMs
    });

    statusCode = response.status;
    isUp = response.status === endpoint.expected_status;
  } catch (error) {
    isUp = false;
  }

  const responseTime = Date.now() - startTime;

  await pool.query(
    `INSERT INTO checks (endpoint_id, status_code, response_time_ms, is_up)
     VALUES ($1, $2, $3, $4)`,
    [endpoint.id, statusCode, responseTime, isUp]
  );

  if (!isUp) {
    await sendAlert(`🚨 ALERT: ${endpoint.url} is DOWN`);
  }
}
