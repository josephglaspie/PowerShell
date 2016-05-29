
#region Setup virtual switch
$Switch1 = 'SW1'
New-VMSwitch -Name $Switch1 -NetAdapterName (get-netadapter | ? {$_.status -eq "Up"}).Name |
    Set-VMSwitch -SwitchType External -ErrorAction SilentlyContinue
#endregion

#region NewVMs
$VMname = "VmCore1"
$VHDPath = "C:\HyperV\VHDs\" + $VMname + ".vhdx"
$DifferencingCore = "C:\HyperV\VHDs\Base\2012r2Core.vhdx"

New-VHD -Differencing -ParentPath $DifferencingCore -Path $VHDPath -SizeBytes 20GB 
New-VM -Name $VMname -MemoryStartupBytes 1GB -VHDPath $VHDPath -Path C:\HyperV\VMs -Generation 2 -SwitchName $Switch1 | Start-VM

 #endregion
start-sleep 120
#region SetNIC
$vmName = "VMCore1" 

$Msvm_VirtualSystemManagementService = Get-WmiObject -Namespace root\virtualization\v2 `
    -Class Msvm_VirtualSystemManagementService 

$Msvm_ComputerSystem = Get-WmiObject -Namespace root\virtualization\v2 `
    -Class Msvm_ComputerSystem -Filter "ElementName='$vmName'" 

$Msvm_VirtualSystemSettingData = ($Msvm_ComputerSystem.GetRelated("Msvm_VirtualSystemSettingData", `
    "Msvm_SettingsDefineState", $null, $null, "SettingData", "ManagedElement", $false, $null) | % {$_})

$Msvm_SyntheticEthernetPortSettingData = $Msvm_VirtualSystemSettingData.GetRelated("Msvm_SyntheticEthernetPortSettingData")

$Msvm_GuestNetworkAdapterConfiguration = ($Msvm_SyntheticEthernetPortSettingData.GetRelated( `
    "Msvm_GuestNetworkAdapterConfiguration", "Msvm_SettingDataComponent", `
    $null, $null, "PartComponent", "GroupComponent", $false, $null) | % {$_})

$Msvm_GuestNetworkAdapterConfiguration.DHCPEnabled = $false
$Msvm_GuestNetworkAdapterConfiguration.IPAddresses = @("192.168.1.111")
$Msvm_GuestNetworkAdapterConfiguration.Subnets = @("255.255.255.0")
$Msvm_GuestNetworkAdapterConfiguration.DefaultGateways = @("192.168.1.1")
$Msvm_GuestNetworkAdapterConfiguration.DNSServers = @("192.168.1.110", "8.8.8.8")

$Msvm_VirtualSystemManagementService.SetGuestNetworkAdapterConfiguration( `
$Msvm_ComputerSystem.Path, $Msvm_GuestNetworkAdapterConfiguration.GetText(1))
#endregion


#$pwd = ConvertTo-SecureString "Passw0rd" -AsPlainText -Force
#$cred = New-Object System.Management.Automation.PSCredential ("Administrator", $pwd)
#Start-Sleep 120
#$VM_IPAddress = (Get-VM $VMname | Select-Object -ExpandProperty networkadapters).ipaddresses
#$VM_IPAddress[0]


#region QuickVM
New-VM -Name VM1 -MemoryStartupBytes 1024MB -NewVHDPath C:\HyperV\VHDs `
    -NewVHDSizeBytes 20GB -Path C:\HyperV\VMs -Generation 2
#endregion

#region Remove VM
Stop-VM -Name $VMname
Get-VMHardDiskDrive -VMName $VMname | Remove-VMHardDiskDrive 
Remove-VM -Name $VMname -Force -Confirm:0
rm C:\HyperV\VMs\* -Recurse -Confirm:0
rm $VHDPath -Recurse -Confirm:0 -Force
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

