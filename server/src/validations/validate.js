// Validation middleware adapter
const validate = (schema) => (req, res, next) => {
    try {
        const parsed = schema.parse(req.body);
        req.body = parsed; // If validation passes, replace req.body with the parsed data
        next();
    } catch (error) {
        const errors = error.errors.map(err => ({ //errors inside error is an array of objects of error messages
            field: err,
            message: err.message,
        }));

        res.status(400).json({
            success: false,
            errors,
        });
    }
};

export default validate;