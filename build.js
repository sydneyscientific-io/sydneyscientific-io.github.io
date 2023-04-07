#!/usr/bin/env node

const { readFile, writeFile } = require('fs');
const { join } = require('path');


const script_start = '<script type="text/template">';
const script_end = '</script>';

if (require.main === module) {
    const html_filename = join(__dirname, 'index.html');
    readFile(join(__dirname, '180 companies.md'), 'utf8', (err, markdown) => {
        if (err != null) throw err;
        readFile(html_filename, 'utf8', (er, html) => {
            if (er != null) throw er;
            /* could us jsdom instead */
            const fst = html.indexOf(script_start) + script_start.length;
            const snd = html.indexOf(script_end, fst);
            writeFile(html_filename,
                      `${html.substring(0, fst)}\n${markdown}${html.substring(snd)}`,
                      'utf8', (e) => { if (e != null) throw e; });
        });
    });
}

