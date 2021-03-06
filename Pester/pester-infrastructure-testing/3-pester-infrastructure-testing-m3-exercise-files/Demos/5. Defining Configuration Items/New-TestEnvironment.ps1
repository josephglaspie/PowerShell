## Be as specific as possible defining parameters. This allows you to easily see each 
## configuration item in the script so tests can be built around it.

$vmName = 'TESTDC'
#$hyperVHostName = 'HYPERVSRV'

## Create the VM
$newVmParams = @{
    Name = $vmName
    MemoryStartupBytes = 4GB
    Generation = 1
    SwitchName = 'LabSwitch'
    Path = 'C:\VMs'
    ComputerName = $hyperVHostName
}

New-VM @newVMParams

## Create and add the VHD to the VM

if (Test-Path -Path "\\$hyperVHostName\c$\VHDs\TESTDC.vhdx" -PathType Leaf) 
{
    throw 'There is already an existing VHD created for the VM'    
}

$newVhdParams = @{
    Path = 'C:\VHDs\TESTDC.vhdx'
    Dynamic = $true
    SizeBytes = 40GB
    ComputerName = $hyperVHostName
}

$vhd = New-Vhd @newVhdParams

$addHdParams = @{
    VMName = $vmName
    Path = $vhd.Path
    ComputerName = $hyperVHostName
}

Add-VMHardDiskDrive @addHdParams