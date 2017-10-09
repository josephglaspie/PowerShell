#https://blogs.technet.microsoft.com/heyscriptingguy/2017/02/06/debugging-powershell-script-in-visual-studio-code-part-1/
param([int]$count=50, [int]$DelayMilliseconds=200)

function write-item($itemCount){
    $i = 1

    while($i -le $itemCount){
        $str = "Output $i"
        Write-Output $str

        $i = $i + 1

        Start-Sleep -Milliseconds $DelayMilliseconds #Put line break here
    }
}

function Do-Work($workCount){
    Write-Output "Doing Work..."
    write-item $workCount
    Write-Host "Done!"
}

Do-Work $count