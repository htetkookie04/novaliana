const fs = require('fs');
const path = require('path');

// Read current dictionary
const filePath = path.join(__dirname, 'public', 'data', 'dictionary.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Original entries: ${data.length}`);

// Track seen Korean words and keep first occurrence
const seen = new Map();
const uniqueData = [];
let duplicatesRemoved = 0;

for (const entry of data) {
  const korean = entry.korean;
  
  if (!seen.has(korean)) {
    seen.set(korean, true);
    uniqueData.push(entry);
  } else {
    duplicatesRemoved++;
    console.log(`Duplicate found: "${korean}" - removed`);
  }
}

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2), 'utf8');

console.log(`\nUnique entries: ${uniqueData.length}`);
console.log(`Duplicates removed: ${duplicatesRemoved}`);
console.log(`\nDictionary cleaned and saved!`);

