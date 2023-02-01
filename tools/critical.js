import {generate} from 'critical';

let basePages = ['index.html', 'process.html', 'services.html', 'contact.html'];

basePages.forEach(page => {
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