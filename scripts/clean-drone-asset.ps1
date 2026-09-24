# ---------------------------------------------------------------------------
# clean-drone-asset.ps1
#
# The source photo (image.png) is a stock cut-out with a transparent background,
# but it still carries two baked-in artifacts:
#   1. a very faint white "plate" haze
#   2. semi-transparent grey watermark lettering
#
# This script removes every semi-transparent light pixel (haze + watermark),
# then crops the canvas to the aircraft's alpha bounding box so the asset is
# tightly framed and ready for object-contain placement.
#
# Usage:  powershell -ExecutionPolicy Bypass -File scripts/clean-drone-asset.ps1
# ---------------------------------------------------------------------------

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'image.png'
$targets = @(
  (Join-Path $root 'src\assets\drone.png'),
  (Join-Path $root 'public\drone.png')
)

$HazeLumThreshold = 120   # luminance above which a transparent-ish pixel is haze
$HazeAlphaThreshold = 200 # alpha below which such a pixel counts as haze
$ContentAlpha = 8         # alpha above which a pixel counts as aircraft content

$bmp = New-Object System.Drawing.Bitmap($source)
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$data = $bmp.LockBits(
  $rect,
  [System.Drawing.Imaging.ImageLockMode]::ReadWrite,
  [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
)

$bytes = New-Object byte[] ($data.Stride * $bmp.Height)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

$removed = 0
for ($i = 0; $i -lt $bytes.Length; $i += 4) {
  $a = $bytes[$i + 3]
  if ($a -eq 0) { continue }

  $lum = 0.2126 * $bytes[$i + 2] + 0.7152 * $bytes[$i + 1] + 0.0722 * $bytes[$i]

  if ($a -lt $HazeAlphaThreshold -and $lum -gt $HazeLumThreshold) {
    $bytes[$i] = 0; $bytes[$i + 1] = 0; $bytes[$i + 2] = 0; $bytes[$i + 3] = 0
    $removed++
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bmp.UnlockBits($data)
Write-Host "Removed $removed haze/watermark pixels."

# --- alpha bounding box -----------------------------------------------------
$minX = $bmp.Width; $minY = $bmp.Height; $maxX = -1; $maxY = -1
for ($y = 0; $y -lt $bmp.Height; $y++) {
  for ($x = 0; $x -lt $bmp.Width; $x++) {
    if ($bmp.GetPixel($x, $y).A -gt $ContentAlpha) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

if ($maxX -lt 0) { throw 'No opaque content found in the source image.' }

$pad = [Math]::Round(($maxX - $minX + 1) * 0.02)
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX + 1) + 2 * $pad)
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY + 1) + 2 * $pad)

Write-Host "Content box: x=$minX y=$minY w=$($maxX - $minX + 1) h=$($maxY - $minY + 1)"
Write-Host "Crop box   : x=$cropX y=$cropY w=$cropW h=$cropH (ratio $([Math]::Round($cropW / $cropH, 2)):1)"

$cropped = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($cropped)
$g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage(
  $bmp,
  (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)),
  (New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)),
  [System.Drawing.GraphicsUnit]::Pixel
)
$g.Dispose()
$bmp.Dispose()

foreach ($target in $targets) {
  $cropped.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host "Wrote $target"
}
$cropped.Dispose()
