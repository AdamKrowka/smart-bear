import styles from "./method.module.scss";
import { PathMethod } from "types/api.types";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import cx from "classnames";
import Parameters from "components/parameters/parameters";
import Responses from "components/response/response";
interface PathProps {
  path: string;
  methodName: string;
  method: PathMethod;
}

const MethodItem = ({ method, methodName, path }: PathProps) => {
  return (
    <AccordionItem
      className={cx(styles.method, styles[methodName], {
        [styles.deprecated]: method.deprecated,
      })}
    >
      <AccordionItemHeading className={styles.heading}>
        <AccordionItemButton className={styles.headingButton}>
          <span className={cx(styles.methodName, styles[methodName])}>
            {methodName}
          </span>
          {path}
          <span className={styles.methodDesc}>{method.summary}</span>
          {method.deprecated && (
            <span className={styles.deprecated}>Deprecated</span>
          )}
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div className={styles.body}>
          <Parameters parameters={method.parameters} />
          <Responses responses={method.responses} />
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default MethodItem;
