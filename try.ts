const decodeVerse = (verse) => {
  // Decode the verse using the UTF-8 encoding and ignore any non-printing characters.
  const decodedVerse = decodeURI(verse, "utf-8", "ignore");
  return decodedVerse;
};
const verse =
  "Itan ọrun on aiye ni wọnyi nigbati a dá wọn, li ọjọ́ ti OLUWA Ọlọrun dá aiye on ọrun.";
const decodedVerse = decodeVerse(verse);

// Create a JSON object to store the decoded verse.
const jsonObject = {
  verse: decodedVerse,
};

// Write the JSON object to a file.
const fs = require("fs");
fs.writeFile("decoded_verse.json", JSON.stringify(jsonObject), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("The decoded verse has been written to a JSON file.");
  }
});
