import { config } from "dotenv";

const result = config({
  debug: true
});

if (result.error) {
  throw result.error;
}

console.log(JSON.stringify(result.parsed, null, 4));
