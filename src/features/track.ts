import { ActorPosition, ActorTrack } from "../shared/types";

export interface TrackQueryRow {
  ts: number;
  id: string;
  lat: number;
  lon: number;
  heading?: number;
  speed?: number;
  delta: number;
}

export function transformToTrack(rows: TrackQueryRow[]): ActorTrack {
  const pos = rows.map(
    (row): ActorPosition => ({
      ts: row.ts,
      lat: row.lat,
      lon: row.lon,
      alt: 0,
      heading: row.heading,
      speed: row.speed, // todo convert knots
    })
  );

  return {
    id: `mt-${rows[0].id}`,
    track: pos,
  };
}

export function generateTrackQuery(ids: string[], ts: number, delta: number) {
  const idsPart =
    ids.length > 0 ? `AND id IN (${ids.map((id) => `'${id}'`).join(",")})` : "";

  return `SELECT
    ts,
    id,
    lat,
    lon,
    heading,
    speed,
    abs(${ts} - CAST(ts AS REAL)) as delta
FROM
    ship_positions
WHERE
    delta < ${delta}
    ${idsPart}
ORDER BY
    ts`;
}
