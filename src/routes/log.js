const express = require("express");
const Log = require("../models/Log");
const auth = require("../middleware/auth");

const router = express.Router();
const role = require("../middleware/role");

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get logs
 *     description: Returns all logs, optionally filtered by account_id (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: account_id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         example: 64f7f1fce258a1660b20aeb1
 *     responses:
 *       200:
 *         description: List of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   event_id:
 *                     type: string
 *                   account_id:
 *                     type: string
 *                   destination_id:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       url:
 *                         type: string
 *                       http_method:
 *                         type: string
 *                       headers:
 *                         type: object
 *                   received_data:
 *                     type: object
 *                   status:
 *                     type: string
 */

 // Admin & Normal: view logs
router.get("/", auth, role(["Admin", "User"]), async (req, res) => {
    const { account_id } = req.query;
    const logs = await Log.find({ account_id }).populate("destination_id");
    res.json(logs);
  });
  

module.exports = router;
