import { useMemo } from "react";
import { useAppContext } from "utils/appContext";
import styles from "./layout.module.scss";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  const { data } = useAppContext();

  const description = useMemo(() => {
    if (!data) return "";
    let newDesc = data.info.description;
    const match = newDesc.matchAll(/\[[^\[\)]+\]\([^\[\)]+\)/g);
    const array = [...match];
    array.forEach((item) => {
      const originalItemText = item[0];
      const [text, url] = originalItemText
        .substring(1, originalItemText.length - 1)
        .split("](");

      newDesc = newDesc.replace(
        originalItemText,
        `<a href='${url}'>${text}</a>`
      );
    });

    return newDesc;
  }, [data]);

  if (!data) return <div>Loading</div>;
  const { info } = data;
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          {data.info.title} <span>Version: {info.version}</span>
        </h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </header>
      <div className={styles.content}>{children}</div>
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
