import dotenv from "dotenv";

const result = dotenv.config({
  debug: true
});

if (result.error) {
  throw result.error;
}

console.log(JSON.stringify(result.parsed, null, 4));
