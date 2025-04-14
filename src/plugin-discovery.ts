import { registerPlugin } from "./shared/registration";

registerPlugin({
  type: "actor",
  name: "Marinetraffic",
  attribution: "Ship data by MarineTraffic.com",
  replay: true,
  locate: true,
  status: true
})
