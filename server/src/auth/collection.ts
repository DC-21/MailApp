import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginDto, RegisterDto } from "./dto";
import { validate } from "class-validator";
import { prisma } from "../config/prisma";
import { compare, hash } from "bcrypt";

export class AuthCollection {
  async Register(req: Request, res: Response) {
    try {
      const data = new RegisterDto(req.body);

      const errors = await validate(data);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const isEmail = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (isEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "user already exists",
        });
      }

      const hashPassword = await hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashPassword,
        },
      });

      return res.status(StatusCodes.CREATED).json(user);
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message | error,
      });
    }
  }

  async Login(req: Request, res: Response) {
    try {
      const data = new LoginDto(req.body);

      const errors = await validate(data);

      if (errors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: errors.map((e) => e.constraints),
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "user does not exists",
        });
      }

      const match = await compare(data.password, user.password);

      if (!match) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "incorrect password",
        });
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      return res.status(StatusCodes.OK).json(payload);
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message | error,
      });
    }
  }
}
