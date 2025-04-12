import {
  DetailedShip,
  shipClassTypeNameLookup,
} from "../marinetraffic/types";
import { storeDataFrames } from "./db-interface";
import { DataFrame } from "./types";

export const handleDetailsUpdate = (ship: DetailedShip) => {
  const dataframes: DataFrame[] = [];

  const shipClass = shipClassTypeNameLookup[ship.type_name];

  if(shipClass)
    dataframes.push({
        type: "class",
        id: parseInt(ship.ship_id),
        class: shipClass,
        source: "details",
    });

  dataframes.push({
    type: "mmsi",
    id: parseInt(ship.ship_id),
    mmsi: ship.mmsi
  });

  storeDataFrames(dataframes);
};
