import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { executeQuery } from "./features/db-interface";

const Options = () => {
  const [positionCounts, setPositionCounts] = useState(-1);

  const updateCounts = () => {
    executeQuery<any[]>("SELECT COUNT(*) as c FROM ship_positions").then(
      (result) => setPositionCounts(result[0].c)
    );
  };

  const clearDb = () => {
    executeQuery<any[]>(
      `
      DELETE FROM ship_positions; 
      DELETE FROM ship_name;
      DELETE FROM ship_mmsi;
      DELETE FROM ship_flag;
      DELETE FROM ship_class;
      `
    ).then(() => updateCounts());
  };

  useEffect(() => updateCounts());

  return (
    <>
      <dl>
        <dt>Known ship positions</dt>
        <dd>{positionCounts}</dd>
      </dl>
      <button onClick={updateCounts}>Update</button>{" "}
      <button onClick={clearDb}>Clear DB</button>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
