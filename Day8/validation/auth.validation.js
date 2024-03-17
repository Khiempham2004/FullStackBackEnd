export const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username) throw new Error("username is required!");
    if (!email) throw new Error("email is required!");
    if (!password) throw new Error("password is required!");
    next();
}

export const validateLogin = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username && !email) throw new Error("Username or email is required!");
    if (!password) throw new Error("Password is required!");
    next();
};

export const validateFeresh = (req, res, next) => {
    const { refresh } = req.body;
    if (!refresh) throw new Error("Refresh token is required!");
    next();
};