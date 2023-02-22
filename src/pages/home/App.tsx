import { useSwaggerQuery } from "../../api/swagger";
import "./App.css";
function App() {
  const { data } = useSwaggerQuery();
  if (!data) return <div>no data</div>;
  return (
    <div className="App">
      <pre>{JSON.stringify(data.info, null, 4)}</pre>
    </div>
  );
}

export default App;
