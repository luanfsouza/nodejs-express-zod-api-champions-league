import {
  createManyPlayerService,
  createPlayerService,
  deletePlayerByIdService,
  getPlayerByIdService,
  getPlayerService,
  updatePlayerByIdService,
} from "../services/playersService";
import e, { Request, Response } from "express";

export const getPlayer = async (req: Request, res: Response) => {
  const httpResponse = await getPlayerService();

  res.status(httpResponse.statusCode).send(httpResponse.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const httpResponse = await getPlayerByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const createPlayer = async (req: Request, res: Response) => {
  const data = req.body;
  const httpResponse = await createPlayerService(data);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
export const createManyPlayer = async(req:Request, res: Response)=>{
  const data = req.body
  const httpResponse = await createManyPlayerService(data)
  res.status(httpResponse.statusCode).json(httpResponse.body);
}

export const deletePlayerById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const httpResponse = await deletePlayerByIdService(id);

  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const updatePlayerById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const httpResponse = await updatePlayerByIdService(id, data);

  res.status(httpResponse.statusCode).json(httpResponse.body);
};
