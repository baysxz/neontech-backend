import express from "express";
import { sql } from "../database";

export const ordersRouter = express.Router();

ordersRouter.get("/", async (_request, response) => {
  const orders =
    await sql`SELECT products.productId, orders.orderID, customers.customerId, orders.quantity
              FROM orders
              INNER JOIN customers ON orders.customerId=customers.customerId
              INNER JOIN products ON orders.productId=products.productId`;

  response.status(200).json({
    orders: orders,
  });
});

// ordersRouter.put("/:orderId", async (request, response) => {
//   const { orderId } = request.params;
//   const { productId, quantity } = request.body;

//   try {
//     const updatedOrder = await sql`UPDATE orders
//                                     SET productId = ${productId},
//                                     quantity = ${quantity}
//                                     WHERE orderId=${orderId}
//                                     RETURNING * `;

//     response.status(200).json({
//       message: `updated ${orderId} order`,
//       order: updatedOrder[0],
//     });
//   } catch (error) {
//     console.log(error);
//     response.status(400).json({ message: "failed" });
//   }
// });
