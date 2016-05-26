
#region Setup virtual switch
$Switch1 = 'SW1'
New-VMSwitch -Name $Switch1 -NetAdapterName (get-netadapter | ? {$_.status -eq "Up"}).Name |
    Set-VMSwitch -SwitchType External -ErrorAction SilentlyContinue
#endregion

#region QuickVM
New-VM -Name VM1 -MemoryStartupBytes 1024MB -NewVHDPath C:\HyperV\VHDs `
    -NewVHDSizeBytes 20GB -Path C:\HyperV\VMs -Generation 2
#endregion

#region NewVMs
$VMname = "VmCore1"
$VHDPath = "C:\HyperV\VHDs\" + $VMname + ".vhdx"
$DifferencingCore = "C:\HyperV\VHDs\Base\2012r2Core.vhdx"

New-VHD -Differencing -ParentPath $DifferencingCore -Path $VHDPath -SizeBytes 20GB 
New-VM -Name $VMname -MemoryStartupBytes 1GB -VHDPath $VHDPath -Path C:\HyperV\VMs -Generation 2 -SwitchName $Switch1 | Start-VM

 #endregion

$pwd = ConvertTo-SecureString "Passw0rd" -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential ("Administrator", $pwd)

$VM_IPAddress = (Get-VM $VMname | Select-Object -ExpandProperty networkadapters).ipaddresses
$VM_IPAddress[0]
#region Configure static IP address on the domain controller before installing ADDS
function Initialize-VMNetwork
{
param(
[string]$ComputerName,
[pscredential]$Credential
)

    $session = New-CimSession -ComputerName $ComputerName -Credential $Credential
    $VMNetAdapter = Get-NetAdapter -CimSession $session

    $params1 = @{
        CimSession = $session
        IPAddress = '192.168.1.111'
        PrefixLength = 24
        InterfaceIndex = $VMNetAdapter.InterfaceIndex
    }

  
    New-NetIPAddress @params1
    
    Set-NetFirewallProfile -Enabled False -CimSession $session
}

Initialize-VMNetwork -ComputerName $VM_IPAddress[0] -Credential $Cred 


#endregion


#region Modify local network adapter (we will lose contact with our VM after setting static IP address)

# Give a static IP address to the network adapter for the internal switch
$localNetAdapter = Get-NetAdapter *InternalSwitch*

$params2 = @{
IPAddress = '192.168.0.2'
DefaultGateway = '192.168.0.1'
PrefixLength = 24
InterfaceIndex = $localNetAdapter.InterfaceIndex 
}

New-NetIPAddress @params2

# Make the network profile "Private"
Get-NetConnectionProfile -InterfaceAlias *InternalSwitch* | Set-NetConnectionProfile -NetworkCategory Private

# Configure the DNS server to be the new DC
Set-DnsClientServerAddress -InterfaceIndex $localNetAdapter.InterfaceIndex -ServerAddresses 192.168.0.1 

Test-WSMan 192.168.0.1

#endregion

#region Remove VM
Get-VMHardDiskDrive -VMName $VMname | Remove-VMHardDiskDrive 
Remove-VM -Name $VMname -Force -Confirm:0
#endregion

#region Prep VHDs
#    Install new VM, then sysprep it's VHD. 
#         Setup machine as you want then log in and sysprep with unattend 
#         cd %windir%\system32\sysprep
#         Sysprep /generalize /oobe /shutdown /unattend:c:\location-of-unattend.xml
#    After the machine shuts down, proceed Move VHD to it's own folder, write protect it, 
#    delete original host and use VHD as parent Disk: https://neilbryan.ca/creating-deploying-hyper-v-virtual-machine-templates/
#    The full script is here http://www.powershellmagazine.com/2013/04/30/powershell-summit-2013-build-your-demo-environment-or-a-test-lab-with-windows-powershell/
#    but I cannot figure out how to use Convert-WindowsImage.ps1

    
#endregion

