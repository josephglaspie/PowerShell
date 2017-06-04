#region Setup NIC
$GlaspiePcPwd = Read-Host "Glaspie-PC password"
$IP = '192.168.1.110'
$Mask = '24'
$GateWay = '192.168.1.1'
$IPType = "IPv4"
$DNS = '127.0.0.1','8.8.8.8'

#remove previous IP settings
$adapter = Get-NetAdapter | ? {$_.Status -eq 'up'}
if (($adapter | Get-NetIPConfiguration).ipv4address.ipaddress){
     $adapter | Remove-NetIPAddress -Confirm:0 }

if (($adapter | Get-NetIPConfiguration).defaultGateway){
     $adapter | Remove-NetRoute -AddressFamily $IPType -Confirm:0 }

#Configure New IPaddress and GW
$adapter | New-NetIPAddress -AddressFamily $IPType -IPAddress $IP -DefaultGateway $GateWay -PrefixLength $Mask 

#Configure DNS
$adapter | Set-DnsClientServerAddress -ServerAddresses $DNS
#endregion

#region enable RDP
#1) Enable Remote Desktop
set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server'-name "fDenyTSConnections" -Value 0

#2) Allow incoming RDP on firewall
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"

#3) Enable secure RDP authentication
set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -name "UserAuthentication" -Value 1   
#endregion

#region enable PSremoting from any machine
winrm s winrm/config/client '@{TrustedHosts="*"}'
Enable-PSRemoting -Confirm:0
#endregion

#region DisableIE enhanced Secuity
$AdminKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A7-37EF-4b3f-8CFC-4F3A74704073}"
$UserKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A8-37EF-4b3f-8CFC-4F3A74704073}"
Set-ItemProperty -Path $AdminKey -Name "IsInstalled" -Value 0
Set-ItemProperty -Path $UserKey -Name "IsInstalled" -Value 0
Stop-Process -Name Explorer
Write-Host "IE Enhanced Security Configuration (ESC) has been disabled." -ForegroundColor Green
#endregion

#region Setup HyperV Dirs
if(!(Test-Path "C:\HyperV\ISOs")){MKDIR "C:\HyperV\ISOs"}
if(!(Test-Path "C:\HyperV\VMs")){MKDIR "C:\HyperV\VMs"}
if(!(Test-Path "C:\HyperV\VHDXs\Base")){MKDIR "C:\HyperV\VHDXs\Base"}
#endregion

<#
just keeping this because of the good roboform examples
NET USE \\192.168.1.8\isos\BuildScripts /u:glaspie $GlaspiePcPwd
if(!(Test-Path \\192.168.1.8\isos\BuildScripts\Git-2.8.3-64-bit.exe)){
    $url = "https://github.com/git-for-windows/git/releases/download/v2.8.3.windows.1/Git-2.8.3-64-bit.exe"
    $output = "C:\GitHub\Git-2.8.3-64-bit.exe"
    $start_time = Get-Date
    (New-Object System.Net.WebClient).DownloadFile($url, $output)
    Write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    }
robocopy \\192.168.1.8\isos C:\HyperV\VHDXs\Base *.vhdx
robocopy \\192.168.1.8\isos\BuildScripts\ C:\GitHub 
NET USE \\192.168.1.8\isos\BuildScripts /D
   C:\GitHub\Git-2.8.3-64-bit.exe /VERYSILENT

#>

#region Setup Apps
Update-Help -Force
Set-ExecutionPolicy -ExecutionPolicy Bypass -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install git 7zip.install notepadplusplus python -y
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Force
Get-ExecutionPolicy
Set-Location C:\GitHub
git clone https://github.com/josephglaspie/ScriptsHome.git
#endregion

#region Install Active Directory, HyperV, and DNS Binaries REBOOT
Get-WindowsFeature AD-Domain-Services,Hyper-V,DNS,AS-NET-Framework,WAS-NET-Environment | Install-WindowsFeature -IncludeManagementTools -IncludeAllSubFeature -Confirm:0
$FeaturesTXT = "c:\temp\Features.txt"
New-Item $FeaturesTXT -ItemType File -Force 
Get-WindowsFeature | where installed >> $FeaturesTXT
if(!$env:COMPUTERNAME -eq 'HyperV1'){
    Rename-Computer HyperV1 -Restart:1 -Confirm:0}
Restart-Computer -Force
#endregion
