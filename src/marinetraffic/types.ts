import { ShipClass } from "../features/types";

type ShipClassLookupDict = { [key: string]: ShipClass };

export const shipClassMainLookup: ShipClassLookupDict = {
  "0": "other",
  "1": "navigation",
  "2": "fishing",
  "3": "special",
  "4": "highspeed",
  "6": "ferry",
  "7": "cargo",
  "8": "tanker",
  "9": "recreational",
};

export const shipClassSubtypeLookup: ShipClassLookupDict = {
  "40": "military",
  "45": "military",
  "178": "military",
  "230": "military",
  "252": "military",
  "11": "container",
};

export const shipClassTypeNameLookup: ShipClassLookupDict = {
  "Military Ops": "military"
};

export interface LiveShip {
  LAT: string;
  LON: string;
  SPEED: string;
  COURSE: string;
  HEADING: string;
  ELAPSED: string;
  DESTINATION: string;
  FLAG: string;
  LENGTH: string;
  ROT: string;
  SHIPNAME: string;
  SHIPTYPE: string;
  SHIP_ID: string;
  WIDTH: string;
  L_FORE: string;
  W_LEFT: string;
  DWT: string;
  GT_SHIPTYPE: string;
}

export interface PlaybackShip {
  SHIP_ID: string;
  MMSI: string;
  SHIPNAME: string;
  TYPE_COLOR: string;
  LENGTH: string;
  WIDTH: string;
  W_LEFT: string;
  L_FORE: string;
  HIDDEN_SAT: boolean;
  POSITIONS: {
    LON: string;
    LAT: string;
    SPEED: string;
    COURSE: string;
    EPOCH: number;
    SAT: string;
    GAP_MINUTES: string;
    HEADING: string;
  }[];
}

export interface DetailedShip {
  light_iw: boolean;
  vessel_history_limit: number;
  country_code: string;
  show_chartering_btn: boolean;
  has_voyage_forecast_snippet: boolean;
  reported_draught: string;
  no_data_available: boolean;
  dest_class: string;
  port_data_y: string;
  port_data_x: string;
  last_pos: number;
  last_pos_tooltip: number;
  elapsed: number;
  timezone_offset: number;
  show_load_status: number;
  vsl_length: number;
  vsl_code: string;
  type_summary: string;
  load_status: {
    reported_draught: string[];
    max_draught: string[];
  };
  vessel_in_fleet: number;
  ship_id: string;
  ship_type: string;
  mmsi: string;
  imo: string;
  type_name: string;
  country: string;
  shipname: string;
  course: string;
  dwt: string;
  speed: string;
  ship_lat: string;
  ship_lon: string;
  draught: string;
  last_port_id: string;
  last_port_name: string;
  last_port_country: string;
  last_port_unlocode: string;
  next_port_id: string;
  next_port_name: string;
  next_port_country: string;
  next_port_unlocode: string;
  photos_count: string;
  station_operator: string;
  past_track_url: string;
  forecast_url: string;
  base_name: string;
  station_name: string;
}
