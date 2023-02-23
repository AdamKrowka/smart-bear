import Card from "components/card/card";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Definition } from "types/api.types";
import { useAppContext } from "utils/appContext";
import styles from "./definitions.module.scss";
import { useMemo } from "react";

interface DefinitionParams {
  definitionName?: string;
  definition?: Definition;
  reference?: string;
}

export const DefinitionContent = ({
  definition,
  definitionName,
  reference,
}: DefinitionParams) => {
  const { definitions } = useAppContext();

  const definitionFinal = useMemo(() => {
    if (!reference) return definition;
    const paths = reference
      .split("/")
      .filter((part) => part !== "#" && part !== "definitions");
    const defByRef = definitions[paths[0]];
    if (!defByRef) return null;
    return defByRef;
  }, [definition, definitionName, reference, definitions]);

  if (!definitionFinal) return null;
  return (
    <div className={styles.definition}>
      <div className={styles.defInfo}>
        <span className={styles.defName}>{definitionName}</span>
        <span className={styles.defType}>{definitionFinal.type}</span>
      </div>
      <div className={styles.defContent}>
        {Object.entries(definitionFinal.properties).map(
          ([propertyName, property]) => (
            <div className={styles.property} key={propertyName}>
              <div className={styles.propertyName}>{propertyName}</div>
              {property.$ref ? (
                <DefinitionContent reference={property.$ref} />
              ) : (
                <div className={styles.propertyContent}>
                  {property.type && (
                    <span>
                      {property.type}{" "}
                      {property.format && <span>({property.format})</span>}
                    </span>
                  )}
                  {property.description && <div>{property.description}</div>}
                  {property.enum && (
                    <div className={styles.enum}>
                      Options:{" "}
                      <div className={styles.enumOptions}>
                        [
                        {property.enum.map((enumValue) => (
                          <span key={enumValue}>{enumValue}</span>
                        ))}
                        ]
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export const DefinitionItem = ({
  definition,
  definitionName,
  reference,
}: DefinitionParams) => {
  return (
    <Accordion
      allowZeroExpanded
      className={styles.definitions}
      id={`definitions${definitionName}`}
    >
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton className={styles.definitionName}>
            {definitionName}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <DefinitionContent
            definition={definition}
            definitionName={definitionName}
            reference={reference}
          />
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

const Definitions = () => {
  const { definitions } = useAppContext();
  return (
    <Card title="Definitions">
      {Object.entries(definitions).map(([definitionName, definition]) => (
        <DefinitionItem
          key={definitionName}
          definitionName={definitionName}
          definition={definition}
        />
      ))}
    </Card>
  );
};

export default Definitions;
