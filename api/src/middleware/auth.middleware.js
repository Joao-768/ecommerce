import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
    }
    next();
};

function requireSelfOrAdmin(paramName = "id") {
    return (req, res, next) => {
        if (req.user?.role === "admin") return next();

        const targetId = req.params[paramName];
        if (String(req.user?.id) !== String(targetId)) {
            return res.status(403).json({ error: "You can only access your own data" });
        }

        next();
    };
}

function requireSelfOrAdminInBody(fieldName = "userId") {
    return (req, res, next) => {
        if (req.user?.role === "admin") return next();

        const targetId = req.body?.[fieldName];
        if (String(req.user?.id) !== String(targetId)) {
            return res.status(403).json({ error: "You can only access your own data" });
        }

        next();
    };
}

export default authenticate;
export { requireAdmin, requireSelfOrAdmin, requireSelfOrAdminInBody };