import { createContext, useContext, useMemo } from "react";
import { useSwaggerQuery } from "../api/swagger";
import { Method, PathMethod, SwaggerResponse, Tag } from "../types/api.types";

interface AppContextInterface {
  data: SwaggerResponse | undefined;
  tags: Tag[];
  pathsGrouped: PathsByTag[];
}

const AppContext = createContext<AppContextInterface>({
  data: undefined,
  tags: [],
  pathsGrouped: [],
});

interface AppContextProviderProps {
  children: React.ReactNode;
}
export interface PathsByTag {
  tag: Tag;
  paths: [string, Partial<Record<Method, PathMethod>>][];
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { data } = useSwaggerQuery();
  const tags = useMemo(() => {
    if (!data) return [];
    return data.tags;
  }, [data]);

  const pathsGrouped = useMemo(() => {
    if (!data) return [];
    const pathsArray = Object.entries(data.paths);
    const tagsWithPath: PathsByTag[] = data.tags.map((tag) => {
      const tagPaths = pathsArray.filter(([, path]) => {
        const methods = Object.values(path);
        return Boolean(
          methods.find((method) => method.tags.includes(tag.name))
        );
      });
      return {
        tag,
        paths: tagPaths,
      };
    });
    return tagsWithPath;
  }, [data]);

  return (
    <AppContext.Provider value={{ data, tags, pathsGrouped }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
