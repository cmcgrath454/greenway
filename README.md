# Greenway Yard & Landscape Website
This website can be accessed at https://greenwayyard.com

## File Structure
'dist' directory is deployed to hosting service

'src' directory holds the source files used to build the 'dist' directory

## Development Notes
```npm run dev``` is set up to run a local server, with a browserSync proxy for liveloading, and uses gulp to watch for changes to HTML & SASS files

```npm start``` runs a local server

## Gulp
I am utilizing a Gulp file for an automated build process

```gulp``` runs the full build process below

1. Delete all files in 'dist'
2. Populate 'dist' with minified JS files
3. Processes SASS file into CSS, adds vendor prefixes, compresses the CSS files, and populates them into 'dist'
4. Copies all other files over to 'dist'
5. Critical CSS inline styling is added to all HTML files in 'dist' for optimal speed

```gulp dev``` creates watches for changes in HTML, SASS, and JS files and runs the same build process with the following differences:

- Files are cached, so the build process only runs on changed files (after the initial build)
- CSS is not compressed and a CSS Map is included for debugging purposes
- Critical CSS inline styling is not generated
