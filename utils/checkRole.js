const checkIsAdmin = () => {
    return (req, res, next) => {
        if (req.user.role === "admin") {
            next();
        }
        else res.status(401).end("Unauthorized User Access");
    }
}

module.exports = checkIsAdmin;