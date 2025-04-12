import { bulkInsert, runQuery } from "./db/commands";
import { getDbInstance } from "./db/duckdb-setup";
import { initDb } from "./db/migrations";
import { DbInterfaceMessage } from "./features/types";

const db = await getDbInstance();
const version = await db.getVersion();

//@ts-ignore
window.db = db;

console.log(`DuckDB ready version: ${version}`);

await initDb(db);

chrome.runtime.onMessage.addListener(
  (msg: DbInterfaceMessage, _sender, sendResponse) => {
    if (msg.target !== "db") return;

    (async () => {
      if (msg.type === "store-data-frames") {
        if (msg.frames.length === 0) return;

        const name_frames = msg.frames
          .filter((f) => f.type == "name")
          .map((f) => ({id: f.id, name: f.name, length: f.length, width: f.width}));
        const class_frames = msg.frames
          .filter((f) => f.type == "class")
          .map((f) => ({id: f.id, class: f.class, source: f.source}));
        const mmsi_frames = msg.frames
          .filter((f) => f.type == "mmsi")
          .map((f) => ({id: f.id, mmsi: f.mmsi}));
        const flag_frames = msg.frames
          .filter((f) => f.type == "flag")
          .map((f) => ({id: f.id, mssi: f.flag}));

        await bulkInsert(db, "ship_name", name_frames);
        await bulkInsert(db, "ship_class", class_frames);
        await bulkInsert(db, "ship_mmsi", mmsi_frames);
        await bulkInsert(db, "ship_flag", flag_frames);

        return;
      }

      if (msg.type === "store-position-frames") {
        if (msg.frames.length === 0) return;

        await bulkInsert(db, "ship_positions", msg.frames);
        return;
      }

      if (msg.type === "query") {
        const response = await runQuery(db, msg.query);
        sendResponse(response);
      }
    })();

    return !msg.type.startsWith("store-");
  }
);
