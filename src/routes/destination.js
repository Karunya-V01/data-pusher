const express = require("express");
const Destination = require("../models/Destination");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const router = express.Router();

/**
 * @swagger
 * /destinations:
 *   post:
 *     summary: Create a new destination
 *     description: Create a destination for a given account (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_id:
 *                 type: string
 *                 example: 64f7f1fce258a1660b20aeb1
 *               url:
 *                 type: string
 *                 example: https://example.com/api
 *               http_method:
 *                 type: string
 *                 example: POST
 *               headers:
 *                 type: object
 *                 example: { Authorization: "Bearer token" }
 *     responses:
 *       200:
 *         description: Destination created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 account_id:
 *                   type: string
 *                 url:
 *                   type: string
 *                 http_method:
 *                   type: string
 *                 headers:
 *                   type: object
 *       400:
 *         description: Bad request
 */
router.post("/", auth,  role(["Admin", "User"]),async (req, res) => {
  try {
    const { account_id, url, http_method, headers } = req.body;
    const destination = await Destination.create({ account_id, url, http_method, headers });
    res.json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /destinations/{account_id}:
 *   get:
 *     summary: Get destinations by account
 *     description: Returns all destinations for a specific account (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: account_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f7f1fce258a1660b20aeb1
 *     responses:
 *       200:
 *         description: List of destinations for the account
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   account_id:
 *                     type: string
 *                   url:
 *                     type: string
 *                   http_method:
 *                     type: string
 *                   headers:
 *                     type: object
 */
router.get("/:account_id", auth, role(["Admin", "User"]), async (req, res) => {
  const destinations = await Destination.find({ account_id: req.params.account_id });
  res.json(destinations);
});


/**
 * @swagger
 * /destinations/{id}:
 *   delete:
 *     summary: Delete a destination (Admin only)
 *     description: Only Admin users can delete destinations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer JWT token
 *         schema:
 *           type: string
 *           example: Bearer <your-jwt-token>
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the destination to delete
 *         schema:
 *           type: string
 *           example: 64f123abcd5678ef90123456
 *     responses:
 *       200:
 *         description: Destination deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Destination deleted
 *       400:
 *         description: Bad request or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user not admin)
 */

router.delete("/:id", auth, role(["Admin"]), async (req, res) => {
    try {
      await Destination.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Destination deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
  

module.exports = router;
