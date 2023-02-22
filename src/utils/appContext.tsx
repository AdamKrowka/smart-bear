import { createContext, useContext } from "react";
import { useSwaggerQuery } from "../api/swagger";
import { SwaggerResponse } from "../types/api.types";

interface AppContextInterface {
  data: SwaggerResponse | undefined;
}

const AppContext = createContext<AppContextInterface>({
  data: undefined,
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { data } = useSwaggerQuery();
  return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
