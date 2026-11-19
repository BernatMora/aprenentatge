$ErrorActionPreference = 'Stop'
try {
    $root = $PSScriptRoot
    foreach ($file in @('index.html', 'Radio-Feina.ico', 'Engega-Radio-Feina.cmd', 'Arrenca-Radio-Feina.ps1')) {
        if (-not (Test-Path -LiteralPath (Join-Path $root $file))) { throw ('Falta ' + $file + '. Descomprimeix tota la carpeta del ZIP.') }
    }
    $shell = New-Object -ComObject WScript.Shell
    $programs = Join-Path ([Environment]::GetFolderPath('Programs')) 'Radio-Feina'
    [void](New-Item -ItemType Directory -Force -Path $programs)
    $desktop = [Environment]::GetFolderPath('Desktop')
    foreach ($folder in @($desktop, $programs)) {
        $link = $shell.CreateShortcut((Join-Path $folder 'Radio-Feina.lnk'))
        $link.TargetPath = Join-Path $root 'Engega-Radio-Feina.cmd'
        $link.WorkingDirectory = $root
        $link.IconLocation = (Join-Path $root 'Radio-Feina.ico') + ',0'
        $link.Description = 'Radio-Feina - musica i converses'
        $link.Save()
    }
    Write-Host 'Dreceres creades a l escriptori i al menu Inici.'
    exit 0
} catch { Write-Host ('ERROR: ' + $_.Exception.Message); exit 1 }
