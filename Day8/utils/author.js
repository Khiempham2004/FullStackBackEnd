export const author = async (req, res, next) => {
    if (!req.user.roler?.includes("admin")) throw new Error("Need admin role");
    next();
}