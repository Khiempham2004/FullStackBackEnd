import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import _ from 'lodash';
import userModel from '../model/user.model.js';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const handlePassword = await bcrypt.hash(password, salt);

    const users = await userModel.create({
        username,
        email,
        password: handlePassword,
        roles: ["users"]
    });

    res.status(200).send(users);
}

export const login = async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        username: username || { $ne: null }, // $ne = not equals
        email: email || { $ne: null }, // $ne = not equals
    });

    const result = bcrypt.compare(password, user.password);

    if (!result) {
        throw new Error("username , email or password not correct!");
    }

    // Encode token (Access token + Refresh token)
    const payroad = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        roles: user.roles,
    }
    const token = jwt.sign(payroad, process.env.JWT)
    console.log("token :>>" , token);
    
    // const refreshToken = jwt.sign(payroad, process.env.JWT_REFRESH_TOKEN, {
    //     expiresIn: "1d",
    // });

    res.status(200).send("mindx")
};

export const refresh = (req, res, next) => {
    const { refreshToken } = req.body;
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    // Phải bỏ 2 trường này
    const newPayload = _.omit(payload, ["exp", "iat"]); // expireAt vs issuedAt

    // Check lại user trong db -> newPayload = user như dòng 60
    const accessToken = jwt.sign(newPayload, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "30s",
    });

    const newRefreshToken = jwt.sign(newPayload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "1d",
    });

    return res.status(200).send({ accessToken, refreshToken: newRefreshToken });
}