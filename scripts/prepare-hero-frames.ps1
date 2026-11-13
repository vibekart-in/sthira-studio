param(
    [string]$InputVideo = 'public\media\sthira-hero-source.mp4',
    [string]$OutputDirectory = 'public\images\hero-sequence',
    [int]$FrameCount = 144
)
$ErrorActionPreference = 'Stop'
if (-not (Test-Path -LiteralPath $InputVideo)) { throw "Source video not found: $InputVideo" }
$ffmpeg = Get-Command ffmpeg -ErrorAction Stop
$ffprobe = Get-Command ffprobe -ErrorAction Stop
$probeText = & $ffprobe.Source -v error -select_streams v:0 -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $InputVideo
if ($LASTEXITCODE -ne 0) { throw 'FFprobe could not read the source video duration.' }
$duration = [double]::Parse(([string]$probeText).Trim(), [Globalization.CultureInfo]::InvariantCulture)
if ($duration -le 1) { throw "Invalid source video duration: $duration" }
$fps = ($FrameCount / $duration).ToString('0.######', [Globalization.CultureInfo]::InvariantCulture)
$staging = "$OutputDirectory.staging"
$previous = "$OutputDirectory.previous"
if (Test-Path -LiteralPath $staging) { Remove-Item -LiteralPath $staging -Recurse -Force }
New-Item -ItemType Directory -Path $staging -Force | Out-Null
$filter = "fps=$fps,scale=1600:-2:flags=lanczos,tpad=stop_mode=clone:stop_duration=1"
$outputPattern = Join-Path $staging 'frame-%03d.webp'
& $ffmpeg.Source -hide_banner -loglevel error -y -i $InputVideo -vf $filter -frames:v $FrameCount -an -c:v libwebp -quality 74 -compression_level 5 $outputPattern
if ($LASTEXITCODE -ne 0) { throw 'FFmpeg frame extraction failed.' }
$count = (Get-ChildItem -LiteralPath $staging -Filter 'frame-*.webp' -File).Count
if ($count -ne $FrameCount) { throw "Expected $FrameCount frames; generated $count. Existing output remains untouched." }
if (Test-Path -LiteralPath $previous) { Remove-Item -LiteralPath $previous -Recurse -Force }
if (Test-Path -LiteralPath $OutputDirectory) { Move-Item -LiteralPath $OutputDirectory -Destination $previous }
Move-Item -LiteralPath $staging -Destination $OutputDirectory
$size = (Get-ChildItem -LiteralPath $OutputDirectory -Filter 'frame-*.webp' -File | Measure-Object -Property Length -Sum).Sum
Write-Host "Created $count WebP frames at $fps fps in $OutputDirectory" -ForegroundColor Green
Write-Host ("Total sequence size: {0:N1} MB" -f ($size / 1MB))