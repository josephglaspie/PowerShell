$iso = 'E:\ISOs\en_windows_server_2016_x64_dvd_9327751.iso'
$workdir = 'e:\isos\temp'
$vhdpath = 'e:\isos\tempthevhd.vhdx'

# Load (aka "dot-source) the Function 
. C:\GitHub\ScriptsHome\BuildScripts\Convert-WindowsImage.ps1
# Prepare all the variables in advance (optional) 
$ConvertWindowsImageParam = @{  
    SourcePath          = $iso 
    RemoteDesktopEnable = $True  
    Passthru            = $True  
    Edition    = "ServerDataCenter"
    VHDFormat = "VHDX"
    SizeBytes = 60GB
    WorkingDirectory = $workdir
    VHDPath = $vhdpath
    VHDPartitionStyle = 'GPT'
}

$VHDx = Convert-WindowsImage @ConvertWindowsImageParam