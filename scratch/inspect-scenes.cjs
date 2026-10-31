const fs = require('fs');

function inspectScene1() {
  const html = fs.readFileSync('scratch/scene1-doors.html', 'utf8');
  const names = [...html.matchAll(/class="[^"]*tp-door__name">([^<]+)<\/span>/g)].map(m => m[1]);
  console.log('--- Scene 1 (Doors) ---');
  console.log('Names count:', names.length, names);
  // check peephole svg
  const peephole = html.match(/<svg[^>]*class="tp-door__peephole"[^>]*>[\s\S]*?<\/svg>/);
  if (peephole) console.log('Peephole SVG found:', peephole[0].slice(0, 150));
}

function inspectScene2() {
  const html = fs.readFileSync('scratch/scene2-phone.html', 'utf8');
  console.log('\n--- Scene 2 (Phone) ---');
  console.log('HTML slice:', html.slice(0, 1000));
}

function inspectScene3() {
  const html = fs.readFileSync('scratch/scene3-passport.html', 'utf8');
  console.log('\n--- Scene 3 (Passport) ---');
  console.log('HTML slice:', html.slice(0, 1000));
}

function inspectScene4() {
  const html = fs.readFileSync('scratch/scene4-faq.html', 'utf8');
  console.log('\n--- Scene 4 (FAQ) ---');
  console.log('HTML slice:', html.slice(0, 1000));
}

function inspectScene5() {
  const html = fs.readFileSync('scratch/scene5-contact.html', 'utf8');
  console.log('\n--- Scene 5 (Contact) ---');
  console.log('HTML slice:', html.slice(0, 1000));
}

inspectScene1();
inspectScene2();
inspectScene3();
inspectScene4();
inspectScene5();

const colors = [...fs.readFileSync('scratch/scene1-doors.html', 'utf8').matchAll(/style="--door:([^;"]+)"/g)].map(m => m[1]);
console.log('Door colors in scene 1:', colors);
