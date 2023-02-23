import Card from "components/card/card";
import SchemaLink from "components/schemaLink/schemaLink";
import { useMemo } from "react";
import { Parameter, Response } from "types/api.types";
import styles from "./response.module.scss";

interface ResponsesProps {
  responses: Record<string, Response>;
}

const ResponseItem = ({
  response,
  responseCode,
}: {
  responseCode: string;
  response: Response;
}) => {
  return (
    <div className={styles.response}>
      <div className={styles.info}>
        <div className={styles.name}>{responseCode}</div>
        <div className={styles.type}>{response.description}</div>
      </div>
      <SchemaLink schema={response.schema} />
    </div>
  );
};

const Responses = ({ responses }: ResponsesProps) => {
  return (
    <Card title="Response">
      <div className={styles.responses}>
        {Object.entries(responses).map(([responseCode, response]) => (
          <ResponseItem responseCode={responseCode} response={response} />
        ))}
      </div>
    </Card>
  );
};

export default Responses;
