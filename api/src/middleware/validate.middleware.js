export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        if (!result.success) {
            const firstIssue = result.error.issues[0];
            return res.status(400).json({
                error: firstIssue ? `${firstIssue.path.join(".")}: ${firstIssue.message}` : "Invalid request",
            });
        }

        req.body = result.data.body ?? req.body;
        if (result.data.query) {
            Object.assign(req.query, result.data.query);
        }
        next();
    };
}
