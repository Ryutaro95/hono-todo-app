import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const todosRouter = new Hono();

// POST /todos 用: titleは1文字以上50文字以下
const createTodoScheme = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(50, "50文字以内で入力してください"),
});

// PUT /todos/:id 用: titleもcompletedも省略可能 (渡された方だけ更新)
const updateTodoScheme = z.object({
  title: z.string().min(1).max(50).optional(),
  completed: z.boolean().optional(),
});

// URLの :id 用: 文字列で入ってきた数値を number 型に自動変換して正の整数かチェック
const idParamScheme = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("IDは1以上の正の整数である必要があります"),
});

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [
  { id: 1, title: "Learn Hono", completed: false },
  { id: 2, title: "Buy milk", completed: true },
];

// ルートパスはマウント先からの相対パス ('/' == '/todos', '/:id' = '/todos/:id') になる
todosRouter
  .get("/", (c) => c.json(todos))
  .get("/:id", zValidator("param", idParamScheme), (c) => {
    const { id } = c.req.valid("param");
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }
    return c.json(todo);
  })
  .post("/", zValidator("json", createTodoScheme), (c) => {
    const data = c.req.valid("json");

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      title: data.title,
      completed: false,
    };

    todos.push(newTodo);
    return c.json(newTodo, 201);
  })
  .put(
    "/:id",
    zValidator("param", idParamScheme),
    zValidator("json", updateTodoScheme),
    (c) => {
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        return c.json({ message: "Todo not found" }, 404);
      }
      if (data.title !== undefined) todo.title = data.title;
      if (data.completed !== undefined) todo.completed = data.completed;
      return c.json(todo);
    },
  )
  .delete("/:id", zValidator("param", idParamScheme), (c) => {
    const { id } = c.req.valid("param");
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== id);

    if (todos.length === initialLength) {
      return c.json({ message: "Todo not found" }, 404);
    }

    return c.json({ message: `Todo ${id} deleted successfully` });
  });

export default todosRouter;
