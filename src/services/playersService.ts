import * as httpResponse from "../utils/httpHelper";
import * as playerRepository from "../repositories/playersRepository";

import Zod, { number } from "zod";

import { PlayerModel } from "../models/playerModel";
import { StatisticModel } from "../models/statisticsModel";

export const getPlayerService = async () => {
  const data = await playerRepository.findAllPlayers();
  let response = null;

  if (data != null) {
    response = await httpResponse.ok(data);
  } else {
    response = await httpResponse.noContent();
  }

  return response;
};

export const getPlayerByIdService = async (id: number) => {
  const data = await playerRepository.findPlayerById(id);
  let response = null;
  if (data != null) {
    response = await httpResponse.ok(data);
  } else {
    response = await httpResponse.noContent();
  }
  return response;
};

export const createPlayerService = async (data: PlayerModel) => {
  try {
    const validationSchema = Zod.object({
      id: Zod.number(),
      name: Zod.string().min(12),
      club: Zod.string(),
      nationality: Zod.string(),
      position: Zod.string(),
      statistics: Zod.object({
        Overall: Zod.number(),
        Pace: Zod.number(),
        Shooting: Zod.number(),
        Passing: Zod.number(),
        Dribbling: Zod.number(),
        Defending: Zod.number(),
        Physical: Zod.number(),
      }),
    });

    const validationResult = validationSchema.safeParse(data);
    if (!validationResult.success) {
      return await httpResponse.badRequest(validationResult.error.issues);
    }

    const validationRepositoryResponse = await playerRepository.CreatePlayer(
      data
    );
    if (!validationRepositoryResponse) {
      return await httpResponse.internalServerError(
        "unable to insert a new player."
      );
    }

    return httpResponse.created("successful");
  } catch (error) {
    console.error(error);
    return httpResponse.internalServerError("Unxpected error");
  }
};

export const deletePlayerByIdService = async (id: number) => {
  const response = await playerRepository.deletePlayerById(id);
  console.log(response);
  if (response == false) {
    return await httpResponse.notFound("Player not found");
  } else {
    return await httpResponse.ok("successful");
  }
};

export const updatePlayerByIdService = async (
  id: number,
  data: StatisticModel
) => {
  try {
    const playerStatisticsSchema = Zod.object({
      statistics: Zod.object({
        Overall: Zod.number(),
        Pace: Zod.number(),
        Shooting: Zod.number(),
        Passing: Zod.number(),
        Dribbling: Zod.number(),
        Defending: Zod.number(),
        Physical: Zod.number(),
      }),
    });

    const validationResult = playerStatisticsSchema.safeParse(data);

    if (!validationResult.success) {
      return await httpResponse.badRequest(validationResult.error.issues);
    }

    const response = await playerRepository.updatePlayerById(id, data);
    if (response != null) {
      return httpResponse.ok(response);
    } else {
      return httpResponse.notFound({ message: "Player id not found" });
    }
  } catch (error) {
    console.log(error);
    return httpResponse.internalServerError(error);
  }
};
