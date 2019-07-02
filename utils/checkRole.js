const checkIsAdmin = () => {
    return (req, res, next) => {
        if (req.user.role === "admin") {
            console.log("Rolenya Admin");
            next();
        }
        else res.status(401).end("Unauthorized User Access");
    }
}

module.exports = checkIsAdmin;