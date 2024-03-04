// Header : x-admin
// Value : admin
// Check header "x-admin" trong request có bằng value "admin" không , nếu có thì pass sang route handdle
// nếu không có hoặc không đúng value thì trả lại 401 
import postModel from "../model/post.model.js";

async function authenticationAdmin(req, res, next) {
    try {
        const admin = req.header?.["x-admin"]
        console.log(admin);
    
        if (!admin || admin !== "admin") {
            return res.json({
                code: 404,
                status: "not admin",
                error: "xác thực không thành công"
            })
        }
        console.log("pass");
        next();   
    } catch (error) {
        res.status(500).send("server error default")
    }
}

export default authenticationAdmin;