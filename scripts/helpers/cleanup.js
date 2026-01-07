const fs = require('fs');
const path = require('path');

// Get current directory
const currentDir = __dirname;

// Read all files in the directory
const files = fs.readdirSync(currentDir);

// Filter files that start with 'generate-' or 'add-' and end with '.js'
// But exclude 'app.js'
const filesToDelete = files.filter(file => {
  return (
    file.endsWith('.js') &&
    (file.startsWith('generate-') || file.startsWith('add-')) &&
    file !== 'app.js'
  );
});

console.log(`Found ${filesToDelete.length} files to delete:`);
filesToDelete.forEach(file => console.log(`  - ${file}`));

if (filesToDelete.length === 0) {
  console.log('No files to delete.');
  process.exit(0);
}

// Ask for confirmation (optional - you can remove this if you want automatic deletion)
console.log('\nDeleting files...');

// Delete each file
let deletedCount = 0;
let errorCount = 0;

filesToDelete.forEach(file => {
  try {
    const filePath = path.join(currentDir, file);
    fs.unlinkSync(filePath);
    console.log(`✓ Deleted: ${file}`);
    deletedCount++;
  } catch (err) {
    console.error(`✗ Error deleting ${file}: ${err.message}`);
    errorCount++;
  }
});

console.log(`\n=== Summary ===`);
console.log(`Successfully deleted: ${deletedCount} files`);
if (errorCount > 0) {
  console.log(`Errors: ${errorCount} files`);
}
console.log(`Protected file 'app.js' was not deleted.`);

