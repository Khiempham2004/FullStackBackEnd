import jwt from "jsonwebtoken";

export const authen = async (req, res, next) => {
    // Xác thực người dùng qua token hoặc email + password ...
    const token = req.header?.authorization?.split("")[1];
    // token verify
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        return res.status(200).send(payload);
    } catch (error) {
        // Nêu token sai -> throm 401, 403
        // Nếu token hết hạn -> throw
    }
    // Gắn user vào request
    req.user = payload;
    next();
}