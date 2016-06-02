#Create New Forest and Domain
$DomainName = "Glaspie.Local"
$pw = ConvertTo-SecureString "Passw0rd" -AsPlainText -Force
Install-ADDSForest -CreateDnsDelegation:0 `
    -DatabasePath 'C:\Windows\NTDS' `
    -DomainMode Win2012R2 `
    -DomainName $DomainName `
    -ForestMode Win2012R2 `
    -InstallDns:1 `
    -LogPath 'C:\Windows\NTDS' `
    -NoRebootOnCompletion:0 `
    -SysvolPath 'C:\Windows\SYSVOL' `
    -Force:1 `
    -SafeModeAdministratorPassword $pw