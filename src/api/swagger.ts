import { useQuery } from "react-query";
import { SwaggerResponse } from "../types/api.types";
import apiClient from "./apiClient";

export const useSwaggerQuery = () => {
  const fetchData = async () => {
    const { data } = await apiClient.get<SwaggerResponse>("/v2/swagger.json");
    return data;
  };
  return useQuery("swagger", fetchData);
};
