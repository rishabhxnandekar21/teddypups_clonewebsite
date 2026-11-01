const fs = require('fs');
const readline = require('readline');

async function main() {
  const fileStream = fs.createReadStream('C:\\Users\\risha\\.gemini\\antigravity\\brain\\962ecb7c-22a5-4f7b-8efd-16ca45d0d993\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('"step_index":2314') || line.includes('"step_index": 2314')) {
      const obj = JSON.parse(line);
      console.log('--- FOUND PROMPT 5 CONTENT ---');
      console.log(obj.content);
      fs.writeFileSync('d:\\Rish\\Projects\\TeddyPupsUAE\\scratch\\prompt5_full.txt', obj.content);
      break;
    }
  }
}
main();
