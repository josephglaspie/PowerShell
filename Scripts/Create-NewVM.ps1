<#
.Synopsis
  Create VMs with spreadsheet
.DESCRIPTION
   Long description
.EXAMPLE
   $NewVMs = Import-Csv C:\GitHub\PowerShell\Scripts\NewVMs.csv
   Foreach($n in $NewVMs){Create-VMs -VMname $n.VMname -SwitchName $n.SwitchName -IPAddress $n.IPAddress -verbose}
.EXAMPLE
   Another example of how to use this cmdlet
#>
function Create-VMs{

    [CmdletBinding()]
    Param
    (
        #Name of the virtual machine
        [Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=0)]
        [string]
        $VMname,

        # Switch the VM will connect to
        [Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=0)]
        [string]
        $SwitchName,

         #IP address of the VM
        [Parameter(Mandatory=$true,
                   ValueFromPipelineByPropertyName=$true,
                   Position=0)]
        [string]
        $IPAddress
    )
#region NewVMs
$VHDPath = "C:\HyperV\VHDs\" + $VMname + ".vhdx"
$DifferencingCore = "C:\HyperV\VHDs\Base\2012r2Core.vhdx"

New-VHD -Differencing -ParentPath $DifferencingCore -Path $VHDPath -SizeBytes 20GB 
New-VM -Name $VMname -MemoryStartupBytes 1GB -VHDPath $VHDPath -Path C:\HyperV\VMs -Generation 2 -SwitchName $SwitchName | Start-VM

 #endregion
Write-Verbose "Pausing for 2 minutes before setting the NIC"
start-sleep 120
#region SetNIC
#$vmName = "VMCore1" 

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
$Msvm_GuestNetworkAdapterConfiguration.IPAddresses = @($IPAddress)
$Msvm_GuestNetworkAdapterConfiguration.Subnets = @("255.255.255.0")
$Msvm_GuestNetworkAdapterConfiguration.DefaultGateways = @("192.168.1.1")
$Msvm_GuestNetworkAdapterConfiguration.DNSServers = @("192.168.1.110", "8.8.8.8")

$Msvm_VirtualSystemManagementService.SetGuestNetworkAdapterConfiguration( `
$Msvm_ComputerSystem.Path, $Msvm_GuestNetworkAdapterConfiguration.GetText(1))
#endregion
}