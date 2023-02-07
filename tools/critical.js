import {generate} from 'critical';
import {unlink} from 'fs';

let basePages = ['index.html', 'process.html', 'services.html', 'contact.html'];

basePages.forEach(page => {
    unlink('../' + page, err => {
      if (err) throw err;
    });
    generate({
        inline: true,
        base: '../src/',
        src: page,
        target: {
          html: `../${page}`,
        },
        width: 1300,
        height: 900,
      });
})