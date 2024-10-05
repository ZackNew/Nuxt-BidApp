import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;
  const routesToSkip = [
    "/api/auth/signin",
    "/api/auth/register",
    "/api/auth/signout",
    "/api/products",
  ];

  if (routesToSkip.includes(url)) {
    return;
  }

  const token = getCookie(event, "access_token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");

    event.context.user = decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid token",
    });
  }
});
