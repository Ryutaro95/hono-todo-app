import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import todosRouter from "./routes/todos.js";
import { authMiddleware, type Variables } from "./middlewares/auth.js";

const app = new Hono<{ Variables: Variables }>();

app.use("*", cors(), logger(), prettyJSON());

app.get("/me", authMiddleware, (c) => {
  const user = c.get("user");
  return c.json({ id: user.id, name: user.name });
});

app.get("/", (c) => {
  return c.text("Hono Todo API");
});

app.route("/todos", todosRouter);

app.notFound((c) => {
  return c.json({ message: "Not found" }, 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ message: "Internal Server Error" }, 500);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
