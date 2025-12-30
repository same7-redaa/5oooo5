Add-Type -AssemblyName System.Drawing

$sourcePath = Get-Item "صور شركات"
$totalOriginal = 0
$totalCompressed = 0

Get-ChildItem -Path $sourcePath.FullName -Recurse -Include *.jpg,*.jpeg,*.png | ForEach-Object {
    try {
        $img = [System.Drawing.Image]::FromFile($_.FullName)
        
        # Create encoder parameter for quality
        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 75)
        
        # Get JPEG codec
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        
        # Save with compression (overwrite original)
        $tempFile = $_.FullName + ".tmp"
        $img.Save($tempFile, $jpegCodec, $encoderParams)
        $img.Dispose()
        
        $originalSize = $_.Length
        $compressedSize = (Get-Item $tempFile).Length
        
        # Replace original with compressed
        Move-Item -Path $tempFile -Destination $_.FullName -Force
        
        $totalOriginal += $originalSize
        $totalCompressed += $compressedSize
        
        Write-Host "Success $($_.Name): $([math]::Round($originalSize/1MB, 2))MB to $([math]::Round($compressedSize/1MB, 2))MB" -ForegroundColor Green
    }
    catch {
        Write-Host "Error with $($_.Name): $_" -ForegroundColor Red
        if ($img) { $img.Dispose() }
    }
}

Write-Host ""
Write-Host "Total: $([math]::Round($totalOriginal/1MB, 2))MB to $([math]::Round($totalCompressed/1MB, 2))MB" -ForegroundColor Cyan
Write-Host "Saved: $([math]::Round(($totalOriginal - $totalCompressed)/1MB, 2))MB" -ForegroundColor Yellow
