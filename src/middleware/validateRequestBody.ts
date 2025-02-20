import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Response, Request } from 'express';

export const validateRequestBody = <T>(dto: ClassConstructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToInstance(dto, req.body);
      const errors = await validate(dtoInstance as object);

      if (errors.length > 0) {
        const errorMessages = errors.flatMap((err) => {
          return Object.values(err.constraints ?? {});
        });

        res
          .status(400)
          .json({ message: 'A validação falhou', errors: errorMessages });
        return;
      }
      req.body.dto = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
};
