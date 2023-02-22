import { Tag } from "types/api.types";
import styles from "./tags.module.scss";
import cx from "classnames";

interface TagsProps {
  tags: Tag[];
  activeTags: Tag[];
  setActiveTags: (tags: Tag[]) => void;
}

const Tags = ({ activeTags, setActiveTags, tags }: TagsProps) => {
  const isActive = (tag: Tag) =>
    Boolean(activeTags.find((activeTag) => activeTag.name === tag.name));
  const onTagCLick = (tag: Tag) => {
    if (isActive(tag)) {
      setActiveTags(
        activeTags.filter((activeTag) => activeTag.name !== tag.name)
      );
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  return (
    <div className={styles.tags}>
      <span>Tags:</span>
      {tags.map((tag, key) => (
        <button
          type="button"
          key={key}
          title={tag.description}
          className={cx(styles.tag, {
            [styles.active]: isActive(tag),
          })}
          onClick={() => onTagCLick(tag)}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default Tags;
