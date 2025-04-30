/**
 * An array of routes accessible to public
 * These routes donot require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * An array of routes used for authentication
 * These routes will derict logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/"
];

/**
 * An array of routes used for authentication
 * These routes will derict logged in users to /settings
 * @type {string[]}
 */
export const adminRoute = "/admin"

/**
 * Prefix for API authentication routes
 * Routes that start with this prefix are used for API auhtentication proposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/admin/profile";
