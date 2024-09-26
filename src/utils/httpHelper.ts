import { HttpResponseModel } from "../models/httpResponseMdel";

export const ok = async (data: any): Promise<HttpResponseModel> => {
  return { statusCode: 200, body: data };
};

export const noContent = async (): Promise<HttpResponseModel> => {
  return { statusCode: 204, body: null };
};

export const created = async (data: any): Promise<HttpResponseModel> => {
  return { statusCode: 201, body: data };
};
export const badRequest = async (data: any): Promise<HttpResponseModel> => {
  return { statusCode: 400, body: data };
};
export const internalServerError = async (
  data: any
): Promise<HttpResponseModel> => {
  return { statusCode: 500, body: data };
};
export const notFound = async (data: any): Promise<HttpResponseModel> => {
  return { statusCode: 404, body: data };
};

