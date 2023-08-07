// const fs = require("fs");
// const readline = require("readline");

// const bookdOfBible = require('./booksOfTheBible')
// const inPath = "./mid-json/";



// const TheBiBle = bookdOfBible.reduce((obj, book) => {
//   obj[book] = []
//   return obj;
// }, {});

// bookdOfBible.forEach(async(book) => {
//   try {
//     // console.log(book)
    
//     const filePath = `./mid-json/${book}.json`; // Specify the JSON file path here
// fs.access(filePath, fs.constants.F_OK, async(err) => {
//   if (err) {
//     // console.log(`File ${filePath} does not exist.`);
//   } else {
//     console.log(`File ${filePath} exists.`);

//   const readStream = fs.createReadStream(filePath);
// const rl  = await readline.createInterface({
//   input: readStream,
//   crlfDelay: Infinity,
// });
//     rl.on('line', (line) => {
//   // try {
//   //   const jsonData = JSON.parse(line);
//   //   const bookData = Object.entries(jsonData)[0][0];

   
//   //   TheBiBle[book].push(`${bookData}:  ${jsonData}`)
//   //   console.log(jsonData)
//   //   // TheBiBle[b] = jsonData[bookData];
//   // } catch (error) {
//   //   console.error('Error parsing JSON:', error);
//     // }
//     new Promise((resolve, reject) => {
//     try {
//        const jsonData = JSON.parse(line);
//     const bookData = Object.entries(jsonData)[0][0];
//     TheBiBle[book].push(`${bookData}:  ${jsonData}`)
//     console.log(jsonData)
//       resolve();
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//       reject(error);
//     }
//   }).then(async() => {
//     // Handle completion of line processing
//       await fs.appendFile(
//     `./final-json/TheBiBle.json`,
//     JSON.stringify( TheBiBle),
//     (err) => {
//       if (err) {
//         console.error("Error writing JSON file:", err);
//         return;
//       }
//       console.log("JSON file has been written successfully!");
//     }
//   );
//   // console.log(TheBiBle)
//   });
// });

  
  
// // rl.on("close", async () => {

// //   await fs.appendFile(
// //     `./final-json/TheBiBle.json`,
// //     JSON.stringify( TheBiBle),
// //     (err) => {
// //       if (err) {
// //         console.error("Error writing JSON file:", err);
// //         return;
// //       }
// //       console.log("JSON file has been written successfully!");
// //     }
// //   );
// //   // console.log(TheBiBle)

// // });
//       }
// });
// } catch (error) {
//   console.log(error.message)
// }

  
// }, 
// )
const fs = require("fs");
const readline = require("readline");

const bookdOfBible = require('./booksOfTheBible');
const inPath = "./mid-json/";

const TheBiBle = {};

async function processFile(book) {
  try {
    const filePath = `./mid-json/${book}.json`; // Specify the JSON file path here
    const fileExists = await fs.promises.access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      console.log(`File ${filePath} exists.`);

      const readStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      rl.on('line', (line) => {
        try {
          const jsonData = JSON.parse(line);
          const bookData = Object.keys(jsonData)[0];

          if (!TheBiBle[book]) {
            TheBiBle[book] = [];
          }

          TheBiBle[book].push({ [bookData]: jsonData[bookData] });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });

      rl.on("close", async () => {
        await fs.promises.appendFile(
          `./final-json/TheBiBle.json`,
          JSON.stringify(TheBiBle, null, 2), // Use 2 spaces for indentation
          (err) => {
            if (err) {
              console.error("Error writing JSON file:", err);
              return;
            }
            console.log("JSON file has been written successfully!");
          }
        );
      });
    } else {
      console.log(`File ${filePath} does not exist.`);
    }
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

async function processFiles() {
  for (const book of bookdOfBible) {
    await processFile(book);
  }
}

processFiles().catch((error) => {
  console.error('Error processing files:', error);
});
