import { Request, Response } from "express";

import { getAllClubsService } from "../services/clubService";

export const getClubs = async (req:Request, res: Response) =>{
    const httpResponse = await getAllClubsService()
    res.status(httpResponse.statusCode).json(httpResponse.body)
}