import React, { useEffect, useState } from "react";
import "./App.css";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import schema from "./form/schema.json";
import uischema from "./form/uischema.json";
import initialData from "./form/data.json";

function App() {
  const [data, setData] = useState(initialData);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculateTotalPercentage = () => {
      return data.countries.reduce((total, item) => total + item.percentage, 0);
    };
    const total = calculateTotalPercentage();
    setPercentage(total);
  }, [data.countries]);

  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => setData(data)}
      />
      <div className="data">
        <p className="error">{percentage !== 100 && "Le total des pourcentages doit être égal à 100 %"}</p>
        <label>Données :</label>
        <code>{JSON.stringify(data)}</code>
      </div>
    </div>
  );
}

export default App;
