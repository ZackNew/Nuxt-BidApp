import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  if (!url.startsWith("/api")) {
    return;
  }

  const routesToSkip = [
    "/api/auth/signin",
    "/api/auth/register",
    "/api/auth/signout",
    "/api/listing/listings",
    "/api/products",
  ];

  if (routesToSkip.includes(url) || process.client) {
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
