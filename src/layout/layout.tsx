import { useAppContext } from "utils/appContext";
import styles from "./layout.module.scss";
import ReactMarkdown from "react-markdown";
import Definitions from "components/definitions/definitions";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { data } = useAppContext();

  if (!data) return <div>Loading</div>;
  const { info } = data;
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          {data.info.title} <span>Version: {info.version}</span>
        </h1>
        <ReactMarkdown>{info.description}</ReactMarkdown>
      </header>
      <div className={styles.content}>{children}</div>
      <div className={styles.definitions}>
        <Definitions />
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <strong>terms of service</strong>
          <span>
            <a href={info.termsOfService}>{info.termsOfService}</a>
          </span>
        </div>
        <div className={styles.info}>
          <strong>contact</strong>
          <span>
            <a href={`mailto:${info.termsOfService}`}>{info.contact.email}</a>
          </span>
        </div>
        <div className={styles.info}>
          <strong>license</strong>
          <span>
            {" "}
            <a href={info.license.url}>{info.license.name}</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
