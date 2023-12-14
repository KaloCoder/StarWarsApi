const axios = require("axios");

const url = "https://swapi.dev/api/people/?search=";
const args = process.argv.slice(2);

async function getRequest(n) {
  return await axios.get(url + encodeURIComponent(n));
}

async function getCharacter(args) {
  let result = await Promise.all(args.map((arg) => getRequest(arg)));

  let res = result
    .map((el) => el.data.results)
    .flat()
    .map(({ name, height }) => {
      return { name, height };
    });

  res = res.reduce((acc, item) => {
    if (!acc.some((el) => el.name === item.name)) {
      acc.push(item);
    }
    return acc;
  }, []);

  let heights = res.map(({ height }) => height).sort((a, b) => a - b);
  let names = res.map(({ name }) => name).sort();

  let MinHeight = Object.values(res.find((el) => el.height == heights[0]));
  let MaxHeight = Object.values(res.find((item) => item.height == heights[heights.length - 1]));
  console.log(`Total results: ${res.length}

    All: ${names}

    Min height: ${MinHeight} cm.

    Max height: ${MaxHeight} cm.`);
}
// getCharacter("r2", "skywalker", "xyz", "Padmé Amidala");
getCharacter(args);
