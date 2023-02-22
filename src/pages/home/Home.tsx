import Card from "components/card/card";
import Paths from "components/path/paths";
import Tags from "components/tags/tags";
import { useMemo, useState } from "react";
import { Method, PathMethod, Tag } from "types/api.types";
import { useSwaggerQuery } from "../../api/swagger";
import styles from "./Home.module.scss";
import { Accordion } from "react-accessible-accordion";

export interface PathsByTag {
  tag: Tag;
  paths: [string, Partial<Record<Method, PathMethod>>][];
}

function App() {
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const { data } = useSwaggerQuery();

  const pathsGrouped = useMemo(() => {
    if (!data) return [];
    const pathsArray = Object.entries(data.paths);
    const tagsWithPath: PathsByTag[] = data.tags.map((tag) => {
      const tagPaths = pathsArray.filter(([, path]) => {
        const methods = Object.values(path);
        return Boolean(
          methods.find((method) => method.tags.includes(tag.name))
        );
      });
      return {
        tag,
        paths: tagPaths,
      };
    });
    return tagsWithPath;
  }, [data]);

  const pathsFiltered = useMemo(() => {
    if (activeTags.length === 0) return pathsGrouped;
    return pathsGrouped.filter((path) =>
      activeTags.find((activeTag) => path.tag.name === activeTag.name)
    );
  }, [activeTags, pathsGrouped]);

  if (!data) return <div>no data</div>;
  return (
    <div className={styles.home}>
      <Tags
        tags={data.tags}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
      />
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
