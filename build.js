#!/usr/bin/env node

const { readFile, writeFile } = require('fs');
const { join } = require('path');


if (require.main === module) {
    const html_filename = join(__dirname, 'index.html');
    readFile(join(__dirname, '180 companies.md'), 'utf8', (err, markdown) => {
        if (err != null) throw err;
        readFile(html_filename, 'utf8', (er, html) => {
            if (er != null) throw er;
            const fst = html.indexOf('`');
            const snd = html.indexOf('`', fst+1);
            writeFile(html_filename,
                      `${html.substring(0, fst)}\`${markdown}\`${html.substring(snd+1)}`,
                      'utf8', (e) => { if (e != null) throw e; });
        });
    });
}

