const fs = require('fs');
const request = require('request');
const readline = require('readline');
const { RSA_X931_PADDING } = require('constants');


let [URL, localPath] = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(URL, {json: true}, (err, res, body) => {
  if (err) {
    if (!res) {
      console.log('URL is Invalid. Please do not write the response body to the file.');
      process.exit();
    }
  }
  const bytes = body.length.toString();
  if (fs.existsSync(localPath)) {
    rl.question('That file path already exists. Please enter "y" to overwrite this file \n', (key) => {
      if (key != 'y') {
        process.exit();
      }

      fs.writeFile(localPath, bytes, err => {
        if (err) {
          console.log('Invalid File Path. Please re-enter a valid file path.');
          process.exit();
        }
    
        console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
        process.exit();
      });
    });
  } else {
    fs.writeFile(localPath, bytes, err => {
      if (err) {
        console.log('Invalid File Path. Please re-enter a valid file path.');
        process.exit();
      }
  
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
      process.exit();
    });
  }
});

// if (err) {
//   return console.log(err);
// }
// const bytes = body.length.toString();
// fs.writeFile(localPath, bytes, err => {
//   if (err) {
//     return console.log(err);
//   }

//   console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
//   process.exit();
// });


