import styles from "./paths.module.scss";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  Accordion,
} from "react-accessible-accordion";
import { PathsByTag } from "utils/appContext";
import Method from "components/method/method";

interface PathsProps {
  paths: PathsByTag;
}

const Paths = ({ paths }: PathsProps) => {
  return (
    <AccordionItem className={styles.pathsItem}>
      <AccordionItemHeading className={styles.heading}>
        <AccordionItemButton className={styles.headingButton}>
          <h3>{paths.tag.name}</h3>
          <p>{paths.tag.description}</p>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={styles.body}>
        <Accordion allowZeroExpanded allowMultipleExpanded>
          {paths.paths.map(([path, methods]) =>
            Object.entries(methods).map(([methodName, method]) => (
              <Method
                path={path}
                method={method}
                methodName={methodName}
                key={`${path}-${methodName}`}
              />
            ))
          )}
        </Accordion>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default Paths;
