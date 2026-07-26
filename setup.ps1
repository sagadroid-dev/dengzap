$folders = @(
"src",
"src/pages",
"src/assets",
"src/assets/icons",
"src/assets/images",
"src/pages/login",
"src/pages/register",
"src/pages/edit",
"src/pages/chat",
"src/pages/profile",
"src/pages/settings",
"src/services",
"src/components",
"src/themes",
"src/assets",
"src/utils",
"src/config",
"src/styles",
"public",
"docs"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "Estrutura criada com sucesso!"