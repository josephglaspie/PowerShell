$uri = 'http://localhost:3000/newnote'
$hash = [ordered]@{
    'memberName' = 'Mark'
    'project' = 'From PS'
    'workYesterday' = 'yWork'
    'workToday' = 'tWork'
    'impediment' = 'From poweshell'
}

$JSON = $hash | ConvertTo-Json

Invoke-WebRequest -Uri $uri -Method Post -Body $JSON -ContentType "application/json"