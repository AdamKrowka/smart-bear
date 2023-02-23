import styles from "./schemaLink.module.scss";
import { useMemo } from "react";
import { Schema } from "types/api.types";

const SchemaLink = ({ schema }: { schema?: Schema }) => {
  const schemaPath = useMemo(() => {
    if (!schema?.$ref) return "";
    return schema?.$ref.replaceAll("/", "");
  }, [schema]);
  if (!schema || !schemaPath) return null;
  return (
    <div className={styles.goToSchema}>
      <a href={schemaPath} title={schemaPath}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2301_25078)">
            <path
              d="M10.0003 13.3332L13.3337 9.99984M13.3337 9.99984L10.0003 6.6665M13.3337 9.99984H6.66699M18.3337 9.99984C18.3337 14.6022 14.6027 18.3332 10.0003 18.3332C5.39795 18.3332 1.66699 14.6022 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665C14.6027 1.6665 18.3337 5.39746 18.3337 9.99984Z"
              stroke="#2970FF"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2301_25078">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  );
};

export default SchemaLink;
