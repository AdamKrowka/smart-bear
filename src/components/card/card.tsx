import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className={styles.card}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
