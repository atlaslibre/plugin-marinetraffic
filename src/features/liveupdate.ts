import { LiveShip, shipClassMainLookup, shipClassSubtypeLookup } from "../marinetraffic/types";
import { storeDataFrames, storePositionFrames } from "./db-interface";
import { DataFrame, PositionFrame } from "./types";


export const handleLiveUpdate = (ships: LiveShip[]) => {
  const now = Date.now();
  const epoch = Math.trunc(now / 60_000) * 60;

  const dataframes: DataFrame[] = [];
  const positionframes: PositionFrame[] = [];

  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];

    const shipClass = shipClassMainLookup[ship.SHIPTYPE];
    const shipSubClass = shipClassSubtypeLookup[ship.GT_SHIPTYPE];

    dataframes.push({
      type: "name",
      id: parseInt(ship.SHIP_ID),
      name: ship.SHIPNAME,
      width: parseFloat(ship.WIDTH),
      length: parseFloat(ship.LENGTH),
    });

    dataframes.push({
      type: "class",
      id: parseInt(ship.SHIP_ID),
      class: shipSubClass ?? shipClass,
      source: "live"
    });

    if(ship.FLAG)
      dataframes.push({
        type: "flag",
        id: parseInt(ship.SHIP_ID),
        flag: ship.FLAG,
      });

    positionframes.push({
      ts: epoch - parseInt(ship.ELAPSED) * 60,
      id: parseInt(ship.SHIP_ID),
      lat: parseFloat(ship.LAT),
      lon: parseFloat(ship.LON),
      speed: parseFloat(ship.SPEED) / 10.0,
      heading: parseFloat(ship.COURSE),
      source: "live"
    });
  }

  storeDataFrames(dataframes);
  storePositionFrames(positionframes);
};
