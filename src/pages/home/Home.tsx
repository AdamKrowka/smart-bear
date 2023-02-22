import Paths from "components/path/paths";
import Tags from "components/tags/tags";
import { useMemo, useState } from "react";
import { Tag } from "types/api.types";
import styles from "./Home.module.scss";
import { Accordion } from "react-accessible-accordion";
import { useAppContext } from "utils/appContext";

function App() {
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const { pathsGrouped, tags } = useAppContext();

  const pathsFiltered = useMemo(() => {
    if (activeTags.length === 0) return pathsGrouped;
    return pathsGrouped.filter((path) =>
      activeTags.find((activeTag) => path.tag.name === activeTag.name)
    );
  }, [activeTags, pathsGrouped]);

  return (
    <div className={styles.home}>
      <Tags tags={tags} activeTags={activeTags} setActiveTags={setActiveTags} />
      <h3 className={styles.title}>Paths</h3>
      <Accordion allowZeroExpanded allowMultipleExpanded>
        {pathsFiltered.map((paths) => (
          <Paths paths={paths} key={paths.tag.name} />
        ))}
      </Accordion>
    </div>
  );
}

export default App;
