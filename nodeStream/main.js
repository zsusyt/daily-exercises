const { PassThrough, Writable } = require('stream');

const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing is now false

pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok');  // will not emit 'data'
pass.resume();     // must be called to make stream emit 'data'