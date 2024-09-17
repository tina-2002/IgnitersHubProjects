const fs = require('fs');

function evaluateExpression(expression) {
    try {
        // Safely evaluate the mathematical expression
        return eval(expression);
    } catch (error) {
        return 'Error'; // Return 'Error' if evaluation fails
    }
}

function processFile(inputFile, outputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        const lines = data.split('\n');
        const results = lines.map(line => {
            // Split the expression from the '=' sign
            const [expression] = line.split('=');
            
            if (expression) {
                const trimmedExpression = expression.trim();
                const result = evaluateExpression(trimmedExpression);
                return `${trimmedExpression} = ${result}`;
            }
            return ''; // Return empty if no expression
        });

        // Write the result to output file
        fs.writeFile(outputFile, results.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
            } else {
                console.log(`Results saved to ${outputFile}`);
            }
        });
    });
}

const inputFile = 'input.txt'; // Ensure input.txt exists in the same folder
const outputFile = 'output.txt';

processFile(inputFile, outputFile);
