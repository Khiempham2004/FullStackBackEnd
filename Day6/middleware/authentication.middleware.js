import UserModel from "../model/user.model.js";

async function authenticationMiddleware (req , res , next) {
    try {
        const username = req.headers?.['x-usrName'];
        //cơ sở dữ liệu
    
        const users = await UserModel.findOne({ username })
        if (!users) {
            res.json({
                code : 200,
                data : null,
                message  : " failed",
                error : "xác thực không thành công",
            })
        }
        if(username) {
            next();
        }   
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
}
export default authenticationMiddleware;