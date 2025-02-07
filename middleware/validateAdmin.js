import jwt from "jsonwebtoken";

export async function validateAdmin(req) {
  try {
    const adminToken = req.headers.get("adminToken");

    if (!adminToken) {
      return { status: 401, message: "Unauthorized" };
    }
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY_ADMIN);

    return { status: 200, id: decoded.id };
  } catch (error) {
    return { status: 401, message: "Unauthorized" };
  }
}
