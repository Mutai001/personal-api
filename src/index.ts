import { Hono } from "hono";
import {db } from "./db";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono + Drizzle + Neon!"));

import { serve } from "@hono/node-server";

const port = Number(process.env.PORT) || 3000;

serve({
    fetch: app.fetch,
    port,
}, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

