import { AsyncDuckDB, DuckDBAccessMode } from "@duckdb/duckdb-wasm";

export const ShipNameCreateCommand = `
    CREATE TABLE IF NOT EXISTS ship_name (
        id UINTEGER NOT NULL,
        name VARCHAR NOT NULL,
        length FLOAT,
        width FLOAT,
        PRIMARY KEY (id)
    );`;

export const ShipFlagCreateCommand = `
    CREATE TABLE IF NOT EXISTS ship_flag (
        id UINTEGER NOT NULL,
        flag VARCHAR NOT NULL,
        PRIMARY KEY (id)
    );`;

export const ShipClassCreateCommand = `
    CREATE TABLE IF NOT EXISTS ship_class (
        id UINTEGER NOT NULL,
        class VARCHAR NOT NULL,
        source VARCHAR NOT NULL,
        PRIMARY KEY (id, source)
    );`;

export const ShipMmsiCreateCommand = `
    CREATE TABLE IF NOT EXISTS ship_mmsi (
        id UINTEGER NOT NULL,
        mmsi VARCHAR  NOT NULL,
        PRIMARY KEY (id)
    );`;

export const PositionFrameCreateCommand = `
    CREATE TABLE IF NOT EXISTS ship_positions (
        ts UBIGINT, 
        id UINTEGER NOT NULL,
        lat FLOAT NOT NULL,
        lon FLOAT NOT NULL,
        speed INT,
        heading INT,
        source VARCHAR,
        PRIMARY KEY (ts, id)
    );`;

export const initDb = async (db: AsyncDuckDB) => {
  const conn = await db.connect();
  await conn.query(ShipNameCreateCommand);
  await conn.query(ShipFlagCreateCommand);
  await conn.query(ShipClassCreateCommand);
  await conn.query(ShipMmsiCreateCommand);
  await conn.query(PositionFrameCreateCommand);
  await conn.close();
};
