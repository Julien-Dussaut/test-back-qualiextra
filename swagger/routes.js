/**
 * @swagger
 * tags:
 *  - name: Authentication & welcome
 *    description: Endpoints for user authentication and welcome message
 * /login:
 *   post:
 *     tags: [Authentication & welcome]
 *     summary: User connexion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               email: user@example.com
 *               password: 1234
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: User's ID
 *                 userFirstName:
 *                   type: string
 *                   description: User's first name
 *                 token:
 *                   type: string
 *                   description: JWT authentication token (expires in 2h)
 *               example:
 *                 userId: 1
 *                 userFirstName: John
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Email ou mot de passe erroné.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *               example:
 *                 error: {}
 */

/**
 * @swagger
 * /private:
 *   get:
 *     tags: [Authentication & welcome]
 *     summary: Protected route that returns a personalized welcome message
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome message for authenticated user
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello John
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

/**
 * @swagger
 * tags:
 *  - name: Users
 *    description: Endpoints for user management
 * 
 * /users/list:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin rights required
 * 
 * /users/create:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               password:
 *                 type: string
 *                 description: User's password
 *               isAdmin:
 *                 type: boolean
 *                 description: Admin status (defaults to false)
 *                 default: false
 *             example:
 *               email: user@example.com
 *               firstName: John
 *               lastName: Doe
 *               password: password123
 *               isAdmin: false
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Utilisateur créé.
 *       400:
 *         description: Bad request - Validation error or disposable email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Les adresses mails temporaires ne sont pas autorisées.
 * 
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Cannot access other user's data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 * 
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               isVerified:
 *                 type: boolean
 *             example:
 *               firstName: John
 *               lastName: Doe Updated
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *               example:
 *                 message: Utilisateur mis à jour avec succès.
 *                 user: {}
 *       403:
 *         description: Forbidden - Cannot update other user's data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 * 
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Utilisateur supprimé.
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin rights required
 *       404:
 *         description: User not found
 * 
 * /verify-email/{token}:
 *   get:
 *     tags: [Users]
 *     summary: Verify user email with token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Email vérifié. Merci !
 *       400:
 *         description: Invalid verification token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Token de vérification invalide.
* /resend-email:
 *   post:
 *     tags: [Users]
 *     summary: Resend verification email to user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *           example:
 *             email: user@example.com
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: Email de vérification renvoyé avec succès.
 *       400:
 *         description: Bad request (missing email or user already verified)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Cet utilisateur est déjà vérifié.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: Aucun utilisateur trouvé avec cette adresse email.
 */
