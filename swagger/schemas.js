/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - password
 *         - isAdmin
 *         - isVerified
 *         - verificationToken
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: Mail address for the user
 *         firstName:
 *           type: string
 *           description: User's firstname
 *         lastName:
 *           type: string
 *           description: User's lastname
 *         password:
 *           type: string
 *           description: User's password (encrypted)
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an admin or a regular user
 *         isVerified:
 *           type: boolean
 *           description: Whether the user verified it's email or not
 *         verificationToken:
 *           type: string
 *           description: Token generated when an user is created (set to null when verified)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Creation date for the user
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Date of last modification for an user
 *       example:
 *         id: 8
 *         email: user@example.com
 *         firstName: John
 *         lastName: Doe
 *         password: $2b$10$hrsfNdwEKdx0wX37KKYNSO.yGgtddMthmRP7jFLhdnh.H9Lid7IcW
 *         isAdmin: true
 *         isVerified: true
 *         verificationToken: 99332eb2f491ccb68312ae4b000f0f7bf775875d8685148e8c36d59b20a3aedf
 *         createdAt: 2025-05-10T04:05:06.157Z
 *         updatedAt: 2025-05-15T09:14:02.127Z
 */