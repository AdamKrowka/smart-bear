import { useParams } from "react-router-dom";
import { useAppContext } from "utils/appContext";
import { useMemo, useState } from "react";
import { Method } from "types/api.types";
import Parameters from "components/parameters/parameters";
import Responses from "components/response/response";
import styles from "./pathPage.module.scss";
import cx from "classnames";

const PathPage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const params = useParams();
  const { paths } = useAppContext();

  const pathUrl = useMemo(() => {
    return params["*"] ? `/${params["*"]}` : "";
  }, [params]);

  const method = useMemo(() => {
    return params.method as Method;
  }, [params]);

  const path = useMemo(() => {
    return paths[pathUrl][method];
  }, [method, pathUrl]);

  const copy = () => {
    navigator.clipboard.writeText(pathUrl);
    setIsCopied(true);
  };
  if (!path) return null;
  return (
    <div className={styles.pathPage}>
      <h2>
        <span className={cx(styles.methodName, styles[method])}>{method}</span>
        {pathUrl}
        <button type="button" className={styles.copy} onClick={copy}>
          {isCopied ? "Copied" : "Copy path"}
        </button>
      </h2>
      <p>{path.summary}</p>
      {path.description && <p>{path.description}</p>}
      <div className={styles.paramsResponse}>
        <Parameters
          parameters={path.parameters}
          consumes={path.consumes && path.consumes.join(", ")}
        />
        <Responses
          responses={path.responses}
          produces={path.produces && path.produces.join(", ")}
        />
      </div>
    </div>
  );
};

export default PathPage;
