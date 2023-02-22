import styles from "./path.module.scss";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { PathsByTag } from "utils/appContext";

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
        <pre>{JSON.stringify(paths.paths, null, 4)}</pre>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default Paths;
