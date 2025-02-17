import jwt from "jsonwebtoken";

export async function validateUsertoken(req) {
  try {
    const userToken = req.headers.get("userToken");

    if (!userToken) {
      return { status: 401, message: "Unauthorized" };
    }

    const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY_USER);

    return { status: 200, id: decoded.id };
  } catch (error) {
    return { status: 401, message: "Unauthorized" };
  }
}
