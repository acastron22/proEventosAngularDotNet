Foi criado três pastas, application, domain e persistence

As pastas terão comunicação entre si

utlizando os comandos:
--- "dotnet sln ProEventos.sln add ProEventos.Persistence"
--- "dotnet sln ProEventos.sln add ProEventos.Application"
--- "dotnet sln ProEventos.sln add ProEventos.Domain"
--- "dotnet sln ProEventos.sln add ProEventos.API"

REPOSITORY E PERSISTENCE são a mesma coisa

Adiciono as referencias:
--- dotnet add ProEventos.API/ProEventos.API.csproj reference ProEventos.Application
---- ---- Assim, o proj de application foi referenciado em ProEventos.api

adiciona as referencias em application e persistence

Adiciono as soluções das pastas a solução do projeto
