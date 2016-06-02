# HyperV Automation https://www.youtube.com/watch?v=dYspCj0LcKA
# Creating & Deploying Hyper-V Virtual Machine Templates https://neilbryan.ca/creating-deploying-hyper-v-virtual-machine-templates/

$NewVMs=Import-Csv C:\HyperV\NewVMs.csv



foreach($VM in $NewVMs){
    New-VM -Name $VM.name -MemoryStartupBytes 2GB -SwitchName $VM.SW -Path $VM.path
    Copy-Item $SourceVHD -Destination "$path\$VM.name" -Recurse
    Add-VMHardDiskDrive -VMName $VM.name -ControllerType IDE -ControllerNumber 0 -Path "$Path\VMName\VirtualHardDisks\NanoVM.vhd"
    Set-VM -Name $VM.name -DynamicMemory -MemoryMaximumBytes 3GB -MemoryMinimumBytes 512MB -MemoryStartupBytes 1GB -ProcessorCount 2
    Start-VM -Name $VM.name
}