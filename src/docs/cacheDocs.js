/**
 * @swagger
 * tags:
 *   name: Cache
 *   description: API for managing caching with LRU Cache
 */

/**
 * @swagger
 * /v1/cache/put-key:
 *   post:
 *     summary: Store a key in the cache
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: "emp:tenant1:user123"
 *               session:
 *                 type: string
 *                 example: "session_abc123"
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-20T12:00:00Z"
 *     responses:
 *       200:
 *         description: Key successfully stored
 */

/**
 * @swagger
 * /v1/cache/get-key/{key}:
 *   get:
 *     summary: Retrieve a key from the cache
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: key
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "emp:tenant1:user123"
 *     responses:
 *       200:
 *         description: Key retrieved successfully
 */

/**
 * @swagger
 * /v1/cache/remove-key/{key}:
 *   delete:
 *     summary: Remove a key from the cache
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: key
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "emp:tenant1:user123"
 *     responses:
 *       200:
 *         description: Key deleted successfully
 */

/**
 * @swagger
 * /v1/cache/check-session:
 *   post:
 *     summary: Validate if a session is still active
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: "emp:tenant1:user123"
 *               session:
 *                 type: string
 *                 example: "session_abc123"
 *     responses:
 *       200:
 *         description: Session validation result
 */

/**
 * @swagger
 * /v1/cache/get-key-by-pattern/{pattern}:
 *   get:
 *     summary: Retrieve keys matching a pattern
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pattern
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "emp:tenant1:*"
 *     responses:
 *       200:
 *         description: List of matching keys
 */

/**
 * @swagger
 * /v1/cache/remove-key-by-pattern/{pattern}:
 *   delete:
 *     summary: Remove keys matching a pattern
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pattern
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "emp:tenant1:*"
 *     responses:
 *       200:
 *         description: List of deleted keys
 */

/**
 * @swagger
 * /v1/cache/reset:
 *   delete:
 *     summary: Clear the entire cache
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cache successfully reset
 */
