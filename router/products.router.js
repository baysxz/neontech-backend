import express, { response } from "express";

import { sql } from "../database/index";

export const productsRouter = express.Router();

productsRouter.get("/", async (request, response) => {
  const products = await sql`SELECT * FROM products`;

  response.status(200).json({
    data: products,
  });
});
