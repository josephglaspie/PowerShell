const shell = require('node-powershell');

let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
});
ps.addCommand('Get-Service').then(cmdsArr => {}).catch(err => {});

ps.invoke()
    .then(output => {
        console.log(output);
    })
    .catch(err => {
        console.log(err);
        ps.dispose();
    });
ps.invoke()
    .then(output => {
        console.log(output);
    })
    .catch(err => {
        console.log(err);
        ps.dispose();
    });
ps.dispose()