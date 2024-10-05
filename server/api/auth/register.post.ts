export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  try {
    const data: User[] = await $fetch(
      `http://localhost:3001/users?username=${username}`
    );

    if (data?.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "User already exists",
      });
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
    };

    await $fetch("http://localhost:3001/users", {
      method: "POST",
      body: newUser,
    });

    return { success: true, message: "Registration successful" };
  } catch (error: any) {
    console.error("Error during registration:", error);

    if (!error.statusCode) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error during registration",
      });
    }

    throw error;
  }
});