import * as clubRepository from "../repositories/clubsRepository";
import * as httpResponse from "../../src/utils/httpHelper"

export const getAllClubsService = async () => {
    let response = await clubRepository.findAll()
    return httpResponse.ok(response)
};
