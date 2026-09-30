import type { MiddlewareHandler } from "hono";

export type User = {
  id: number;
  name: string;
  token: string;
};

export type Variables = {
  user: User;
};

const users: User[] = [
  { id: 1, name: "Alice", token: "alice-token" },
  { id: 2, name: "Bob", token: "bob-token" },
];

export const authMiddleware: MiddlewareHandler<{
  Variables: Variables;
}> = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const token = authHeader.slice("Bearer ".length);
  const user = users.find((u) => u.token === token);
  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  c.set("user", user);
  await next();
};
