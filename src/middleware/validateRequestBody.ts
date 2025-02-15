import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Response, Request } from 'express';

export const validateRequestBody = <T>(entityClass: ClassConstructor<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = plainToInstance(entityClass, req.body);
      const errors = await validate(entity as object);

      if (errors.length > 0) {
        const errorMessages = errors.flatMap((err) => {
          return Object.values(err.constraints ?? {});
        });

        res
          .status(400)
          .json({ message: 'A validação falhou', errors: errorMessages });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
