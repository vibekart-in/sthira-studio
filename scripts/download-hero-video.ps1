$ErrorActionPreference = 'Stop'
$project = (Get-Location).Path
$outputDirectory = Join-Path $project 'public\media'
$outputFile = Join-Path $outputDirectory 'sthira-hero-source.mp4'
$sourceUrl = 'https://videos.pexels.com/video-files/38675643/16428573_3840_2160_30fps.mp4'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
Write-Host 'Downloading the selected 4K interior clip by Alef Morais / Pexels...' -ForegroundColor Cyan
Invoke-WebRequest -Uri $sourceUrl -OutFile $outputFile -Headers @{ 'User-Agent' = 'Mozilla/5.0'; 'Referer' = 'https://www.pexels.com/' } -UseBasicParsing
$file = Get-Item -LiteralPath $outputFile
if ($file.Length -lt 1MB) { throw 'The downloaded file is unexpectedly small.' }
Write-Host ("Saved {0:N1} MB to {1}" -f ($file.Length / 1MB), $file.FullName) -ForegroundColor Green