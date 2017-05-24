#region Install apps
$Original=Get-ExecutionPolicy
Set-executionpolicy bypass
Write-Host "Installing Chocolatey" -ForegroundColor Green
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex

Write-Host "Installing Apps" -ForegroundColor Green
choco install 7zip git greenshot node beyondcompare slack atom notepadplusplus visualstudiocode nodejs sql-server-management-studio keepass rdcman rsat expresso adobereader pycharm-community consolez python vlc -y
#endregion
Set-ExecutionPolicy $Original
 
