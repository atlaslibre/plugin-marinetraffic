import { PlaybackShip, shipClassMainLookup } from "../marinetraffic/types";
import { storeDataFrames, storePositionFrames } from "./db-interface";
import { DataFrame, PositionFrame } from "./types";

export const handlePlaybackUpdate = (ships: PlaybackShip[]) => {
  const dataframes: DataFrame[] = [];
  const positionframes: PositionFrame[] = [];

  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];

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
        class: shipClassMainLookup[ship.TYPE_COLOR],
        source: "playback"
      });

      dataframes.push({
        type: "mmsi",
        id: parseInt(ship.SHIP_ID),
        mmsi: ship.MMSI,
      });

    for (let j = 0; j < ship.POSITIONS.length; j++) {
      const pos = ship.POSITIONS[j];
      positionframes.push({
        ts: pos.EPOCH,
        id: parseInt(ship.SHIP_ID),
        lat: parseFloat(pos.LAT),
        lon: parseFloat(pos.LON),
        speed: parseFloat(pos.SPEED),
        heading: parseFloat(pos.COURSE),
        source: "playback"
      });
    }
  }

  storeDataFrames(dataframes);
  storePositionFrames(positionframes);
};
