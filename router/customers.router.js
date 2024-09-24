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

customersRouter.put("/:customerId", async (request, response) => {
  const { customerId } = request.params;
  const { firstName, lastName, email, address } = request.body;

  try {
    const updatedUser = await sql`UPDATE customers
                SET firstName = ${firstName},
                lastName = ${lastName},
                email = ${email},
                address = ${address}
                WHERE customerid=${customerId}
                RETURNING *`;

    response
      .status(200)
      .json({
        message: `updated ${customerId} customer`,
        customer: updatedUser[0],
      });
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: "failed" });
  }
});

customersRouter.delete("/", async (request, response) => {
  const { id } = request.body;

  try {
    await sql`DELETE FROM customers WHERE customerid=${id}`;
    response.status(200).json({ message: "deleted" });
  } catch (error) {
    response.status(400).json({ message: "failed" });
  }
});
