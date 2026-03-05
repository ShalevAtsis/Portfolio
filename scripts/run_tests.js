const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log('Running tests...');
    // Run tests, asking for json reporter output
    const output = execSync('npx playwright test --reporter=json', {
        stdio: 'pipe',
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024 // 10MB
    });
    console.log('All tests passed!');
    fs.writeFileSync('clean_failures.txt', 'All passed');
} catch (error) {
    console.log('Tests failed. Parsing results...');
    try {
        const results = JSON.parse(error.stdout);
        let report = '';

        if (results.errors && results.errors.length > 0) {
            report += 'GLOBAL ERRORS:\n';
            results.errors.forEach(e => {
                report += e.message + '\n';
            });
        }

        results.suites?.forEach(suite => {
            const processSuite = (s, prefix = '') => {
                s.specs?.forEach(spec => {
                    spec.tests?.forEach(test => {
                        test.results?.forEach(res => {
                            if (res.status === 'failed' || res.status === 'timedOut') {
                                report += `\n\nFAIL: ${prefix}${spec.title}\n`;
                                const msgLines = res.error?.message?.split('\n') || [];
                                report += msgLines.slice(0, 20).join('\n') + '\n';
                            }
                        });
                    });
                });
                s.suites?.forEach(child => processSuite(child, prefix + s.title + ' > '));
            };
            processSuite(suite);
        });

        fs.writeFileSync('clean_failures.txt', report);
        console.log('Failures written to clean_failures.txt');
    } catch (e) {
        console.log('Failed to parse JSON', e.message);
        fs.writeFileSync('raw_stdout.txt', error.stdout || '');
        fs.writeFileSync('raw_stderr.txt', error.stderr || '');
    }
}
