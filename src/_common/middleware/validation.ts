import { NextFunction, Response, Request } from "express";

export const validationMiddleware = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const key of ["body", "params", "query"]) {
      if (schema[key]) {
        const { error } = schema[key].validate(req[key]);

        if (error) {
          res.status(400).json({
            status: 400,
            message: error.details.map((d) => d.message).join(", "),
          });
          return;
        }
      }
    }
    next();
  };
};
