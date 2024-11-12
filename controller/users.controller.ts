import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestBody, UpdateRequestBody } from "../utils/types";
const prisma = new PrismaClient();

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const requestedUserId = req.params.id;
  try {
    const userToBeFound = await prisma.user.findUnique({
      where: {
        user_id: parseInt(requestedUserId),
      },
    });

    if (!userToBeFound)
      return res.status(404).json({
        statusCode: 404,
        message: "User not found.",
      });

    return res.json(userToBeFound);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const requestBody: RequestBody = req.body;
  if (
    !requestBody.user_id ||
    !requestBody.username ||
    !requestBody.password ||
    !requestBody.email ||
    !requestBody.age
  ) {
    return res.status(400).json({
      statusCode: 400,
      message: "All fields are required.",
    });
  }
  try {
    const isDuplicate = await prisma.user.findUnique({
      where: { username: requestBody.username },
    });
    if (isDuplicate)
      return res.status(409).json({
        statusCode: 409,
        message: "Credentials already taken.",
      });

    await prisma.user.create({ data: requestBody });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const requestedUserId = req.params.id;
  const requestBody: UpdateRequestBody = req.body;
  if (
    !requestBody.username ||
    !requestBody.password ||
    !requestBody.email ||
    !requestBody.age
  ) {
    return res.status(400).json({
      statusCode: 400,
      message: "All fields are required.",
    });
  }
  try {
    const userToBeUpdated = await prisma.user.findUnique({
      where: { user_id: parseInt(requestedUserId) },
    });
    if (!userToBeUpdated)
      return res.status(404).json({
        statusCode: 404,
        message: "User not found.",
      });
    await prisma.user.update({
      where: {
        user_id: parseInt(requestedUserId),
      },
      data: {
        ...requestBody,
      },
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const requestedUserId = req.params.id;
  try {
    const userToBeDeleted = await prisma.user.findUnique({
      where: { user_id: parseInt(requestedUserId) },
    });
    if (!userToBeDeleted)
      return res.status(404).json({
        statusCode: 404,
        message: "User not found.",
      });
    await prisma.user.delete({ where: { user_id: parseInt(requestedUserId) } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export { getAll, getOne, create, update, remove };
