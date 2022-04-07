call npx rimraf .\dist
call npx tsc
call docker build . -t scraper_service