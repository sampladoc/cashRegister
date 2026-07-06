import fs from "fs";
import path from "path";
import { parseInputLines } from "./parser.js";
import { calculateChange } from "./cashRegister.js";

const OUTPUT_DIR = "output";
const ERROR_DIR = "errors";

function createTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, "-");
}

function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

function run(inputPath, outputPath) {
    ensureDirectoryExists(OUTPUT_DIR);
    ensureDirectoryExists(ERROR_DIR);

    const timestamp = createTimestamp();

    const finalOutputPath = outputPath || path.join(OUTPUT_DIR, `change-${timestamp}.txt`);

    const errorPath = path.join(ERROR_DIR, `change-errors-${timestamp}.txt`);

    const fileContent = fs.readFileSync(inputPath, "utf8");
    const transactions = parseInputLines(fileContent);

    const output = [];
    const errors = [];

    transactions.forEach((transaction) => {
        try {
            output.push(calculateChange(transaction.owedInCents, transaction.paidInCents));
        } catch (err) {
            output.push("");
            errors.push(`Line ${transaction.lineNumber}: Paid ($${(transaction.paidInCents / 100).toFixed(2)}) is less than Owed ($${(transaction.owedInCents / 100).toFixed(2)})`);
        }
    });

    fs.writeFileSync(finalOutputPath, output.join("\n"));

    if (errors.length > 0) {
        const errorReport = [
            "========== INPUT ERRORS ==========",
            "",
            ...errors,
            "",
            `${errors.length} invalid transaction(s) found.`,
        ].join("\n");

        fs.writeFileSync(errorPath, errorReport);

        console.log(errorReport);
        console.log(`\nError report written to: ${errorPath}`);
    } else {
        console.log("Successfully processed all transactions.");
    }

    console.log(`Output written to: ${finalOutputPath}`);
}

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath) {
    console.error("Usage: node src/index.js input.txt [output.txt]");
    process.exit(1);
}

run(inputPath, outputPath);