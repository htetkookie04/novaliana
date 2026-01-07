const fs = require('fs');
const path = require('path');

/**
 * Delete all .js files in the current folder that start with 'generate-' or 'add-'
 * But make sure NOT to delete 'app.js'
 */
function deleteFiles() {
  const currentDir = __dirname;
  const files = fs.readdirSync(currentDir);
  
  let deletedCount = 0;
  let skippedCount = 0;
  const deletedFiles = [];
  const skippedFiles = [];
  
  console.log(`\n=== Deleting files in: ${currentDir} ===\n`);
  
  files.forEach(file => {
    // Only process .js files
    if (!file.endsWith('.js')) {
      return;
    }
    
    // Skip app.js
    if (file === 'app.js') {
      skippedFiles.push(file);
      skippedCount++;
      console.log(`⏭ Skipped: ${file} (protected file)`);
      return;
    }
    
    // Check if file starts with 'generate-' or 'add-'
    if (file.startsWith('generate-') || file.startsWith('add-')) {
      const filePath = path.join(currentDir, file);
      
      try {
        fs.unlinkSync(filePath);
        deletedFiles.push(file);
        deletedCount++;
        console.log(`✓ Deleted: ${file}`);
      } catch (err) {
        console.error(`✗ Error deleting ${file}: ${err.message}`);
      }
    }
  });
  
  console.log(`\n=== Summary ===`);
  console.log(`Files deleted: ${deletedCount}`);
  if (deletedFiles.length > 0) {
    console.log(`Deleted files: ${deletedFiles.join(', ')}`);
  }
  console.log(`Files skipped: ${skippedCount}`);
  if (skippedFiles.length > 0) {
    console.log(`Skipped files: ${skippedFiles.join(', ')}`);
  }
  console.log(`\n=== Complete ===\n`);
  
  return { deletedCount, skippedCount, deletedFiles, skippedFiles };
}

// Run the function if this script is executed directly
if (require.main === module) {
  deleteFiles();
}

module.exports = { deleteFiles };

