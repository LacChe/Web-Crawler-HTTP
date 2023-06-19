const fs = require('fs');

const content = '\nEven More content!';

fs.appendFile('./test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});