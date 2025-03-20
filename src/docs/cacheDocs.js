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
 *                   example: "Key put success"
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
 *                   example: "Get key success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                     session:
 *                       type: string
 *                     time:
 *                       type: string
 *                       format: date-time
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
 *                   example: "Key deleted"
 *                 data:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                     session:
 *                       type: string
 *                     time:
 *                       type: string
 *                       format: date-time
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
 *                   example: "Check session success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     isValid:
 *                       type: boolean
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
 *                   example: "Get keys by pattern success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                       session:
 *                         type: string
 *                       time:
 *                         type: string
 *                         format: date-time
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
 *                   example: "Remove keys by pattern success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                       session:
 *                         type: string
 *                       time:
 *                         type: string
 *                         format: date-time
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
 *                   example: "Cache reset success"
 */

/**
 * @swagger
 * /v1/cache/get-all-keys:
 *   get:
 *     summary: Retrieve all keys from the cache
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all keys
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
 *                   example: "Get all keys success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                       session:
 *                         type: string
 *                       time:
 *                         type: string
 *                         format: date-time
 */

/**
 * @swagger
 * /v1/cache/get-multi-key:
 *   get:
 *     summary: Retrieve multiple keys from the cache
 *     tags: [Cache]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: keys
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of keys
 *         example: "emp:tenant1:user123,emp:tenant1:user456"
 *     responses:
 *       200:
 *         description: List of found keys
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
 *                   example: "Get keys by list success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                       session:
 *                         type: string
 *                       time:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid input
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
 *                   example: "Keys must be a non-empty array"
 */
