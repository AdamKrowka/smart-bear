import styles from "./path.module.scss";
import { Method, PathMethod } from "types/api.types";

interface PathProps {
  path: [string, Partial<Record<Method, PathMethod>>];
}

const Path = ({ path }: PathProps) => {
  const [name, methods] = path;
  return (
    <div>
      {name}
      <pre>{JSON.stringify(methods, null, 4)}</pre>
    </div>
  );
};

export default Path;
