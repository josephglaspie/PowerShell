﻿#region Demo stuff
$demoPath = 'C:\gitHubPersonal\ScriptsHome\Pester\pester-infrastructure-testing\3-pester-infrastructure-testing-m3-exercise-files\Demos\6. Building Infrastructure Tests\'
#endregion

#region Figure out how to read the stuff that was just created

$vm = Get-VM -Name TESTDC -ComputerName $env:COMPUTERNAME

## Name --easy one
$vm.Name

## Memory --needs some manipulation
$memoryStartup = $vm.MemoryStartup / 1GB
$memoryStartup = '{0}{1}' -f $memoryStartup,'GB'
$memoryStartup

## Generation --easy
$vm.Generation

## switch name --a little legwork
$vm.NetworkAdapters
$vm.NetworkAdapters.SwitchName

## path --easy
$vm.Path

## VHD attached to the right VM
$vhd = $vm | Get-VMHardDiskDrive
$vhd.Path

## VHD path
$vhd.Path

## VHD dynamic attribute --harder
Invoke-Command -ComputerName $env:COMPUTERNAME -ScriptBlock {
    (Get-Vhd $using:vhd.Path).VhdType
} | Select -ExpandProperty Value

## VHD size
$vhdSize = Invoke-Command -ComputerName $hyperVHostName -ScriptBlock {
                (Get-Vhd $using:vhd.Path).Size
           }
$vhdSize = $vhdSize /1GB
$vhdSize = '{0}{1}' -f $vhdSize,'GB'
$vhdSize

#endregion

## Now apply all this legwork that you just did to the Pester tests file

## Run the test
Invoke-Pester "$demoPath\New-TestEnvironment.Tests.ps1"