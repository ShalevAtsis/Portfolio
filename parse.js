const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, 'test-results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

if (results.errors && results.errors.length > 0) {
    console.log('Global Errors:');
    results.errors.forEach(e => console.log(e.message));
}

results.suites.forEach(suite => {
    suite.specs?.forEach(spec => {
        spec.tests?.forEach(test => {
            test.results?.forEach(res => {
                if (res.status === 'failed' || res.status === 'timedOut') {
                    console.log(`\n\nFAIL: ${spec.title}`);
                    const msgLines = res.error?.message?.split('\n') || [];
                    // Print just the first 10 lines of the error to save terminal space
                    console.log(msgLines.slice(0, 10).join('\n'));
                }
            });
        });
    });
});
