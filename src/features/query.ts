import { ActorPosition } from "../shared/types";
import { ShipClass } from "./types";

export interface PositionQueryRow {
  ts: number,
  id: number;
  lat: number;
  lon: number;
  heading?: number;
  speed?: number;
  name: string;
  flag?: string;
  mmsi?: string;
  length: number;
  width: number;
  liveclass?: ShipClass;
  playbackclass?: ShipClass;
  detailsclass?: ShipClass;
  delta: number;
}

interface ShipActor {
  type: "ship";
  id: string;
  name: string;
  pos: ActorPosition;
  class?: ShipClass;
  mmsi?: string;
  flag?: string;
}

export function transformToActor(row: PositionQueryRow): ShipActor {
  return {
    type: "ship",
    id: `mt-${row.id}`,
    name: row.name,
    flag: row.flag,
    mmsi: row.mmsi,
    class: row.detailsclass ?? row.liveclass ?? row.playbackclass,
    pos: {
      ts: row.ts,
      lat: row.lat,
      lon: row.lon,
      alt: 0,
      heading: row.heading,
      speed: row.speed,
    },
  };
}

export function generatePositionQuery(
  ts: number,
  delta: number,
  latmin: number,
  latmax: number,
  lonmin: number,
  lonmax: number,
  limit: number
) {
  return `SELECT
    DISTINCT ON (ship_positions.id) 
    ts,
    ship_positions.id,
    lat,
    lon,
    heading,
    speed,
    name,
    flag,
    mmsi,
    length,
    width,
    live.class as liveclass,
    playback.class as playbackclass,
    details.class as detailsclass,
    abs(${ts} - CAST(ts AS REAL)) as delta
FROM
    ship_positions
    LEFT JOIN ship_name ON ship_positions.id = ship_name.id
    LEFT JOIN ship_flag ON ship_positions.id = ship_flag.id
    LEFT JOIN ship_mmsi ON ship_positions.id = ship_mmsi.id
    LEFT JOIN (
        SELECT
            id,
            class,
            source
        FROM
            ship_class
        WHERE 
            source = 'playback'
    ) as playback ON ship_positions.id = playback.id
    LEFT JOIN (
        SELECT
            id,
            class,
            source
        FROM
            ship_class
        WHERE 
            source = 'live'
    ) as live ON ship_positions.id = live.id
    LEFT JOIN (
        SELECT
            id,
            class,
            source
        FROM
            ship_class
        WHERE 
            source = 'details'
    ) as details ON ship_positions.id = details.id
WHERE
    delta < ${delta} AND
    lat > ${latmin-2} AND
    lat < ${latmax+2} AND
    lon > ${lonmin-2} AND
    lon < ${lonmax+2}
ORDER BY
    delta
LIMIT ${limit}`;
}
