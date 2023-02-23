import { useLocation, useParams } from "react-router-dom";
import { useAppContext } from "utils/appContext";
import { useMemo } from "react";
import { Method } from "types/api.types";
import Card from "components/card/card";
import Parameters from "components/parameters/parameters";
import Responses from "components/response/response";
import styles from "./pathPage.module.scss";

const PathPage = () => {
  const params = useParams();
  const { paths } = useAppContext();

  const path = useMemo(() => {
    if (!params["*"] || !params.method) return undefined;
    const method = params.method as Method;

    const pathUrl = `/${params["*"]}`;
    console.log(pathUrl);
    return paths[pathUrl][method];
  }, [params]);
  if (!path) return null;
  return (
    <div className={styles.pathPage}>
      <div className={styles.paramsResponse}>
        <Parameters parameters={path.parameters} />
        <Responses responses={path.responses} />
      </div>
      <pre>{JSON.stringify(path, null, 4)}</pre>
    </div>
  );
};

export default PathPage;
