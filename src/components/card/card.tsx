import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
