const fs = require('fs');
const prompt = require('prompt-sync')();

function getUserInput(promptMessage) {
    return prompt(promptMessage);
}

function createSVG(text, textColor, shape, shapeColor, filename) {
    var shapeContent = `<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />`;
    if (shape == 'circle'){
        shapeContent = `<circle r="100" cx="150" cy="150" fill="${shapeColor}" />`
    } else if (shape == 'triangle'){
        shapeContent = `<polygon points="150,0 0,300 300,300" style="fill:${shapeColor}" />`
    }
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
            ${shapeContent}
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="${textColor}">${text}</text>
        </svg>
    `;
    fs.writeFileSync(`${filename}.svg`, svgContent);
}

function main() {
    const text = getUserInput('Enter up to three characters: ');

    if (text.length > 3) {
        console.log('Error: Please enter up to three characters.');
        return;
    }

    var textColor = getUserInput('Enter text color (keyword or hex code)[blue]: ');
    if (textColor == null || textColor == ''){
        textColor = 'blue';
    }
    const shapeOptions = ['circle', 'triangle', 'square'];
    const shape = getUserInput(`Choose a shape (${shapeOptions.join(', ')}): `);

    if (!shapeOptions.includes(shape.toLowerCase())) {
        console.log('Invalid shape input.');
        return;
    }

    var shapeColor = getUserInput('Enter shape color (keyword or hex code)[lime]: ');
    if (shapeColor == null || shapeColor == ''){
        shapeColor = 'lime';
    }
    var filename = getUserInput('Enter a name for your logo[logo]: ');
    if (filename == null || filename == ''){
        filename = 'logo';
    }

    createSVG(text, textColor, shape, shapeColor, filename);

    // Setting Content-Type header for logo.svg
    const express = require('express');
    const app = express();

    app.get('/logo.svg', (req, res) => {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.sendFile(__dirname + '/logo.svg');
    });

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });

    console.log('Generated logo.svg');
}

main();
process.exit();