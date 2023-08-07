const { randomInt } = require("crypto");
const fs = require("fs");
const path = require("path");
const inPath = "./txt/";
const outPath = "./json";
const decodeVerse = (verse) => {
  // Decode the verse using the UTF-8 encoding and ignore any non-printing characters.
  const decodedVerse = decodeURI(verse);
  return decodedVerse;
};
const bookdOfBible = require('./booksOfTheBible')

function decodeText(encodedText) {
  const decodedText = {};

  for (const key in encodedText) {
    const encodedVerse = encodedText[key].verse;
    const decodedVerse = customDecode(encodedVerse);
    const timeline = encodedText[key].timeline;

    decodedText[key] = {
      verse: decodedVerse,
      timeline: timeline,
    };
  }

  return decodedText;
}

function customDecode(encodedString) {
  const decodedChars = [];
  const byteSequence = [];

  for (let i = 0; i < encodedString.length; i++) {
    const charCode = encodedString.charCodeAt(i);

    if (charCode === 0) {
      byteSequence.push(encodedString.charCodeAt(++i));
    } else {
      if (byteSequence.length > 0) {
        const decodedChar = String.fromCharCode(...byteSequence);
        decodedChars.push(decodedChar);
        byteSequence.length = 0;
      }

      decodedChars.push(String.fromCharCode(charCode));
    }
  }

  return decodedChars.join("");
}
function convertTxtToJson(txtFilePath) {
  const txtContent = fs.readFileSync(txtFilePath, "utf16le");
  const linesArray = txtContent.split("\n"); //.map((line) => line.trim());

  //   console.log(linesArray);

  let obj = {};
  linesArray.map((arr) => {
    const regex = /\d+/g;
    const textWithoutNumbers = decodeVerse(arr.replace(regex, ""));
    let key = arr.split(" ")[0];
    obj[key] = {
      verse: textWithoutNumbers,
      timeline: randomInt(10),
    };
    // console.log(textWithoutNumbers);

    // const decodedVerse = decodeVerse(textWithoutNumbers);
  });

    obj = decodeText(obj);
    // console.log(obj)
  return obj;
}


bookdOfBible.forEach((book) => {
  console.log(book)

  fs.readdir(inPath, (err, files) => {
    var counter = 0;

    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file) => {
      if (file.startsWith(`${book}`)) {
        console.log(file)
      
        const filePath = path.join(inPath, file);
        counter++;
        // console.log(file);

        const jsonString = JSON.stringify(convertTxtToJson(`./${filePath}`));

        // console.log(jsonString);
        const fileName = path.parse(`./${filePath}`).name;

        fs.writeFile(
          `./mid-json/${book}.json`,
          `{"Chapter_${counter}": ${jsonString}}\n`,
          { flag: "a+" },
          (err) => {
            if (err) {
              console.error("Error writing JSON files :", err);
              return;
            }
            console.log("JSON file has been written successfully!!!!!");
          }
        );
  }

      });
  /////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  //   const readline = require("readline");

  //   const secondFIlePath = "./mid-json/Genesis.json"; // Specify the JSON file path here

  //   const readStream = fs.createReadStream(secondFIlePath);
  //   const rl = readline.createInterface({
  //     input: readStream,
  //     crlfDelay: Infinity,
  //   });

  //   let Genesis = {};

  //   rl.on("line", (line) => {
  //     try {
  //       const jsonData = JSON.parse(line);
  //       Genesis[Object.entries(jsonData)[0][0]] =
  //         jsonData[Object.entries(jsonData)[0][0]];
  //     } catch (error) {
  //       console.error("Error parsing JSON:", error);
  //     }
  //   });

  //   rl.on("close", () => {
  //     console.log("End of file");
  //     fs.writeFile(
  //       `./final-json/Genesis.json`,
  //       JSON.stringify({ Genesis }),
  //       { flag: "a+" },
  //       (err) => {
  //         if (err) {
  //           console.error("Error writing JSON file:", err);
  //           return;
  //         }
  //         console.log("JSON file has been written successfully!");
  //       }
  //     );
  //   });
  });

})

