# Project Reorganization Plan

## Current Structure Analysis

### Files to Move:
1. **Scripts (Root → scripts/):**
   - `app.js` → `scripts/main-generator.js`
   - `cleanup-generate-files.js` → `scripts/helpers/cleanup.js`
   - `remove-duplicates.js` → `scripts/helpers/remove-duplicates.js`

2. **Images:**
   - `src/image/Kookie.png` → `public/assets/images/Kookie.png`
   - `src/image/novaliana.jpg` → `public/assets/images/novaliana.jpg`
   - `public/image/novaliana.jpg` → `public/assets/images/novaliana.jpg` (consolidate)

3. **CSS Files (Optional - keeping with components is recommended):**
   - CSS files are currently co-located with components (best practice)
   - If moving: `src/**/*.css` → `public/assets/css/`

### Path Dependencies to Update:

#### 1. `app.js` (will become `scripts/main-generator.js`):
   - Current: `path.join(__dirname, 'public', 'data', 'dictionary.json')`
   - New: `path.join(__dirname, '..', 'public', 'data', 'dictionary.json')`
   
   - Current: `path.join(__dirname, 'app.js')`
   - New: `path.join(__dirname, 'main-generator.js')` (or update to reference itself correctly)

#### 2. React Components:
   - Current image imports: `./image/novaliana.jpg` or `../image/novaliana.jpg`
   - New: `/assets/images/novaliana.jpg` (public path)

#### 3. Dictionary JSON:
   - Already correct: `/data/dictionary.json` (served from public folder)

## Step-by-Step Execution Plan

### Phase 1: Create Folder Structure
```bash
mkdir scripts
mkdir scripts/helpers
mkdir public/assets
mkdir public/assets/images
mkdir public/assets/css  # Optional
```

### Phase 2: Move Script Files
1. Move `app.js` → `scripts/main-generator.js`
2. Move `cleanup-generate-files.js` → `scripts/helpers/cleanup.js`
3. Move `remove-duplicates.js` → `scripts/helpers/remove-duplicates.js`

### Phase 3: Update Script Paths
- Update `__dirname` references in `scripts/main-generator.js`:
  - `'public'` → `'..', 'public'`
  - `'app.js'` → `'main-generator.js'` (if self-referencing)

### Phase 4: Move and Consolidate Images
1. Move `src/image/*` → `public/assets/images/`
2. Remove duplicate `public/image/novaliana.jpg` (keep the one in assets)
3. Update all image references in components

### Phase 5: Update Component Image Imports
Search and replace in all `.js` files:
- `./image/` → `/assets/images/`
- `../image/` → `/assets/images/`
- `src/image/` → `/assets/images/`

### Phase 6: Test
1. Run `node scripts/main-generator.js` to test script paths
2. Start React app and verify images load
3. Verify dictionary.json loads correctly

## Files That Need Path Updates

### Scripts:
- `scripts/main-generator.js` (formerly app.js)
  - Line ~229: `path.join(__dirname, 'public', ...)` → `path.join(__dirname, '..', 'public', ...)`
  - Line ~253: `path.join(__dirname, 'app.js')` → `path.join(__dirname, 'main-generator.js')`
  - Line ~324: Same as above
  - Line ~361: `path.join(__dirname, 'public', ...)` → `path.join(__dirname, '..', 'public', ...)`
  - Line ~463: Same as above

### React Components (check for image imports):
- Search for: `import.*image|require.*image|\.\/image|\.\.\/image`

## Notes:
- CSS files are recommended to stay with components (current structure is fine)
- If you want to move CSS to public/assets/css, you'll need to update all import statements
- The `public/data/` folder structure is already correct
- All scripts should be run from project root: `node scripts/main-generator.js`

