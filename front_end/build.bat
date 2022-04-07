call mkdir public
call cd ../client
call npx react-scripts build
xcopy .\build ..\front_end\public /E /H /C /I /Y
call cd ../front_end
call docker build . -t scraper_front_end