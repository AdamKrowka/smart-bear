import Card from "components/card/card";
import SchemaLink from "components/schemaLink/schemaLink";
import { Response } from "types/api.types";
import styles from "./response.module.scss";

interface ResponsesProps {
  responses: Record<string, Response>;
  produces?: string;
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

const Responses = ({ responses, produces }: ResponsesProps) => {
  return (
    <Card title="Response">
      {produces && (
        <div className={styles.responseType}>Response Type: {produces}</div>
      )}
      <div className={styles.responses}>
        {Object.entries(responses).map(([responseCode, response]) => (
          <ResponseItem
            key={responseCode}
            responseCode={responseCode}
            response={response}
          />
        ))}
      </div>
    </Card>
  );
};

export default Responses;
