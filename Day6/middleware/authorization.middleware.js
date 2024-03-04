import UserModel from "../model/user.model.js";

async function authorization (req , res , next) {
    const username = req.headers?.['x-usrName'];
    //cơ sở dữ liệu

    const users = await UserModel.findOne({ userName })
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
}

export default authorization;