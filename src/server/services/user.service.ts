import pool from "../config/database.ts";

/**
 * Fetch user profile by user ID.
 * @param user_id - UUID of the user
 * @returns - User profile object or null if not found
 */
export const getUserProfile = async (userId: string) => {
  try {
    const query = `
      SELECT 
        id, 
        username, 
        email, 
        created_at,
        date_of_birth,
        first_name,
        last_name
      FROM users
      WHERE id = $1
    `;
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return null;
    }
    console.log({ user: rows[0] });
    return rows[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Database error while fetching user profile");
  }
};
