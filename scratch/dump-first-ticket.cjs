const fs = require('fs');

async function main() {
  const html = await (await fetch('https://puppy.instabizweb.com/gone-home')).text();
  const ticketIdx = html.indexOf('<li class="tp-ticket"');
  const endTicket = html.indexOf('</li>', ticketIdx);
  console.log('--- FIRST TICKET HTML ---');
  console.log(html.slice(ticketIdx, endTicket + 5));
}

main().catch(console.error);
