import express from "express";

import { sql } from "../database/index";

export const customersRouter = express.Router();

customersRouter.get("/", async (_request, response) => {
  const customers = await sql`SELECT * FROM customers`;

  response.status(200).json({
    data: customers,
  });
});

customersRouter.post("/", async (request, response) => {
  const { firstName, lastName, email, address } = request.body;

  try {
    await sql`INSERT INTO customers (firstName, lastName, email, address)
            VALUES (${firstName}, ${lastName}, ${email}, ${address})`;
    response.status(200).json({ customer: request.body });
  } catch (error) {
    response.status(400).json({ message: "aldaa garlaa" });
  }
});
