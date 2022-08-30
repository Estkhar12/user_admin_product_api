import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'json-secret', (err, user) => {
            if(err) {
                return res.status(401).json({
                    msg: "Token is not valid!"
                });
            }
            console.log(user);
            next();
        })
    } else {
        return res.status(401).json({
            msg: "You are not authorised"
        });
    }
}


export { verifyToken };
