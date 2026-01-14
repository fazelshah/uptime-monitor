import { pool } from "./db";
import { checkEndpoint } from "./checker";

export const handler = async () => {
  const result = await pool.query(
    `SELECT id, url, expected_status FROM endpoints WHERE is_active = true`
  );

  for (const endpoint of result.rows) {
    await checkEndpoint(endpoint);
  }

  return {
    statusCode: 200,
    body: "Uptime check completed"
  };
};
