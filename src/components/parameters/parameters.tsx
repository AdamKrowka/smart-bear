import Card from "components/card/card";
import SchemaLink from "components/schemaLink/schemaLink";
import { useMemo } from "react";
import { Parameter } from "types/api.types";
import styles from "./parameters.module.scss";

interface ParametersProps {
  parameters: Parameter[];
  consumes?: string;
}

const Param = ({ param }: { param: Parameter }) => {
  return (
    <div className={styles.param}>
      <div className={styles.info}>
        <div className={styles.name}>
          {param.name}
          {param.required && <span className={styles.required}>required</span>}
        </div>
        <div className={styles.type}>
          {param.type}
          {param.type === "array" && param.items && (
            <span>[{param.items.type}]</span>
          )}
          {param.format && <span>({param.format})</span>}
        </div>
        <div className={styles.description}>{param.description}</div>
      </div>

      <SchemaLink schema={param.schema} />
    </div>
  );
};

const Parameters = ({ parameters, consumes }: ParametersProps) => {
  return (
    <Card title="Parameters">
      {consumes && (
        <div className={styles.requestType}>Request Type: {consumes}</div>
      )}
      <div className={styles.params}>
        {parameters.map((param) => (
          <Param param={param} key={param.name} />
        ))}
      </div>
    </Card>
  );
};

export default Parameters;
