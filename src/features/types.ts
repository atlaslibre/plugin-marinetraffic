interface StoreDataFramesMessage {
  type: "store-data-frames";
  target: "db";
  frames: DataFrame[];
}

interface StorePositionFramesMessage {
  type: "store-position-frames";
  target: "db";
  frames: PositionFrame[];
}

interface QueryMessage {
  type: "query";
  target: "db";
  query: string;
}

export type DbInterfaceMessage =
  | QueryMessage
  | StoreDataFramesMessage
  | StorePositionFramesMessage;

export type ShipClass =
  | "other"
  | "navigation"
  | "fishing"
  | "special"
  | "highspeed"
  | "ferry"
  | "cargo"
  | "tanker"
  | "recreational"
  | "military"
  | "container";


export interface DataFramex {
  id: number;
  name: string;
  class: ShipClass;
  flag?: string | null;
  mmsi?: string | null;
  length?: number | null;
  width?: number | null;
  source: string;
}

interface NameDataFrame 
{
  type: "name";
  id: number;
  name: string;
  length: number;
  width: number;
}


interface ClassDataFrame 
{
  type: "class";
  id: number;
  class: string;
  source: string;
}

interface FlagDataFrame 
{
  type: "flag"
  id: number,
  flag: string;
}

interface MmsiDataFrame 
{
  type: "mmsi"
  id: number,
  mmsi: string;
}

export type DataFrame = NameDataFrame | ClassDataFrame | FlagDataFrame | MmsiDataFrame;

export interface PositionFrame {
  ts: number;
  id: number;
  lat: number;
  lon: number;
  speed?: number;
  heading?: number;
  source: string;
}
