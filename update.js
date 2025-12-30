
const fs = require('fs');
const path = require('path');

const replacements = {
    'companies': 'companies',
    'logos': 'logos',
    'reviews': 'reviews',
    'reviews': 'reviews',
    'company-1': 'company-1',
    'company-2': 'company-2',
    'company-3': 'company-3',
    'company-4': 'company-4',
    'company-5': 'company-5',
    'company-6': 'company-6',
    'company-7': 'company-7',
    'company-complex': 'company-complex'
};

function walk(dir, callback) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            if (file === '.git') return;
            const filepath = path.join(dir, file);
            fs.stat(filepath, (err, stats) => {
                if (stats.isDirectory()) {
                    walk(filepath, callback);
                } else if (stats.isFile()) {
                    if (['.html', '.css', '.js', '.json'].includes(path.extname(file))) {
                        callback(filepath);
                    }
                }
            });
        });
    });
}

walk('./', (filepath) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err;
        let newData = data;
        for (const [key, value] of Object.entries(replacements)) {
            newData = newData.split(key).join(value);
            // Also replace encoded versions just in case
            newData = newData.split(encodeURIComponent(key)).join(value);
        }
        if (newData !== data) {
            console.log(`Updating ${filepath}`);
            fs.writeFile(filepath, newData, 'utf8', (err) => {
                if (err) console.error(err);
            });
        }
    });
});
