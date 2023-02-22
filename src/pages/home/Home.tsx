import Card from "components/card/card";
import Tags from "components/tags/tags";
import { useState } from "react";
import { Tag } from "types/api.types";
import { useSwaggerQuery } from "../../api/swagger";
import styles from "./Home.module.scss";
function App() {
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const { data } = useSwaggerQuery();
  if (!data) return <div>no data</div>;
  const { tags, ...rest } = data;
  return (
    <div className={styles.home}>
      <Tags tags={tags} activeTags={activeTags} setActiveTags={setActiveTags} />
      <Card title="Paths">
        <pre>{JSON.stringify(rest, null, 4)}</pre>
      </Card>
    </div>
  );
}

export default App;
