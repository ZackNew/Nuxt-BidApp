import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;

  const jwtSecretKey = useRuntimeConfig().JWT_SECRET_KET;

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
    const decoded = jwt.verify(token, jwtSecretKey);

    event.context.user = decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid token",
    });
  }
});
