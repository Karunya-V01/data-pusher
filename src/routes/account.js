const express = require("express");
const Account = require("../models/Account");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     description: Creates an account for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account_name
 *               - website
 *             properties:
 *               account_name:
 *                 type: string
 *                 example: My Account
 *               website:
 *                 type: string
 *                 example: https://example.com
 *     responses:
 *       200:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 account_name:
 *                   type: string
 *                 website:
 *                   type: string
 *                 created_by:
 *                   type: string
 *                 updated_by:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post("/", auth, role(["Admin"]), async (req, res) => {
  try {
    const { account_name, website } = req.body;
    const account = await Account.create({
      account_name,
      website,
      created_by: req.user.id,
      updated_by: req.user.id,
    });
    res.json(account);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     description: Returns all accounts (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   account_name:
 *                     type: string
 *                   website:
 *                     type: string
 *                   created_by:
 *                     type: string
 *                   updated_by:
 *                     type: string
 */
router.get("/", auth,role(["Admin", "User"]), async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});


/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account (Admin only)
 *     description: Only Admin users can delete accounts
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
 *         description: ID of the account to delete
 *         schema:
 *           type: string
 *           example: 64f123abcd5678ef90123456
 *     responses:
 *       200:
 *         description: Account deleted successfully
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
 *                   example: Account deleted
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
      await Account.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Account deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
  

module.exports = router;
