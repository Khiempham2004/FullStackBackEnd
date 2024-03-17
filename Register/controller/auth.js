export const register = async (req, res, next) => {
    const { username, phone, password } = req.body;
    try {
        if (!username || !phone || !password) return res.status(200).json({
            err: 1,
            message: "Missing inputs"
        })
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).json({
            err: -1,
            message: "Fail at auth controller" + error
        })
    }
}