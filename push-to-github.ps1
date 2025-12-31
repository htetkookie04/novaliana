# Script to push code to GitHub
# Run this in a PowerShell window outside of Cursor

Write-Host "Changing to dictionary directory..."
cd D:\dictionary

Write-Host "Removing git lock file if it exists..."
if (Test-Path .git\index.lock) {
    Remove-Item -Force .git\index.lock -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

Write-Host "Adding all files..."
git add .

Write-Host "Committing changes..."
git commit -m "Initial commit"

Write-Host "Pushing to GitHub..."
git push -u origin master

Write-Host "Done!"

