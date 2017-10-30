//http://cdn.rawgit.com/rannn505/node-powershell/236b6c3a/docs/docs.html#node-powershell-shell-class
const shell = require('node-powershell');
let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
});
ps.addCommand('import-module C:\\git\\RefreshTeam\\winGet-Data\\Get-RefreshData\\Get-RefreshData.psm1').then(cmdsArr => {}).catch(err => {});
ps.addCommand('$list="CPWIQAYV"').then(cmdsArr => {}).catch(err => {});
ps.addCommand('$secpasswd = ConvertTo-SecureString "SuperSecretPW!" -AsPlainText -Force').then(cmdsArr => {}).catch(err => {});
ps.addCommand('$creds=New-Object System.Management.Automation.PSCredential ("jxg2980", $secpasswd)').then(cmdsArr => {}).catch(err => {});
ps.addCommand('Get-RefreshSNOW -ComputerNames $list -credentials $creds').then(cmdsArr => {}).catch(err => {});

ps.invoke()
    .then(output => {
        console.log(output);
    })
    .catch(err => {
        console.log(err);
        ps.dispose();
    });
ps.dispose().then(code => {}).catch(err => {});