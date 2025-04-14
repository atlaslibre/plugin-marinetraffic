import { shipClassMainLookup } from "../marinetraffic/types";
import { storeDataFrames, storePositionFrames } from "./db-interface";
import { PositionFrame } from "./types";

type TrackElement = [
  lon: string,
  lat: string,
  speed: string,
  course1: string,
  course2: string,
  dt: string,
  ts: number,
  source: string,
  unk1: string,
  unk2: string,
  unk3: string,
  unk4: string,
  unk5: string,
  unk6: string,
  unk7: string,
  unk8: string,
  unk9: string,
  unk10: string,
  unk11: string,
  unk12: string,
  unk13: string
];

interface TrackShip {
  url: string;
  track: TrackElement[];
}

const ship_id_lookup = /shipid:(\d+)/;

export const handleTrackUpdate = (msg: TrackShip) => {
  const positionframes: PositionFrame[] = [];

  const lookup_result = ship_id_lookup.exec(msg.url);

  if(lookup_result === null)
    return;

  const ship_id = parseInt(lookup_result[1]);

  for (let i = 0; i < msg.track.length; i++) {
    const frame = msg.track[i];

    positionframes.push({
      ts: frame[6],
      id: ship_id,
      lat: parseFloat(frame[1]),
      lon: parseFloat(frame[0]),
      speed: parseFloat(frame[2]) / 10.0,
      heading: parseFloat(frame[3]),
      source: "track",
    });
  }

  storePositionFrames(positionframes);
};
