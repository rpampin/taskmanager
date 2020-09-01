# Client
FROM node:14.9.0-alpine AS client 
WORKDIR /src
COPY TaskManager/ClientApp . 
RUN npm install
RUN npm audit fix
RUN npm run-script build

# NuGet restore
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY *.sln .
COPY TaskManager/*.csproj TaskManager/
RUN dotnet restore
COPY . .

# publish
FROM build AS publish
WORKDIR /src/TaskManager
RUN dotnet publish -c Release -o /src/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app
COPY --from=publish /src/publish .
COPY --from=client /src/build ClientApp/build
# ENTRYPOINT ["dotnet", "TaskManager.dll"]
# heroku uses the following
CMD ASPNETCORE_URLS=http://*:$PORT dotnet TaskManager.dll