docker build -t=personaldrive:v1 .
docker run --env DB_URL="mongodb+srv://ashutosh_asg:uMd968kvQDSyiy7@fyndlearn.e16ttjp.mongodb.net/?retryWrites=true&w=majority" -p 8080:8080 -p 4000:4000 personaldrive:v1
docker tag personaldrive:v1 ashutoshgairola/personaldrive:v1



docker push ashutoshgairola/personaldrive:v1   (if you want to push youre latest changes)



1> install docker 
2> check if socker is indstalled by docker ps -a
3> docker login
4> docker pull ashutoshgairola/personaldrive:v1
5> docker run --env DB_URL="mongodb+srv://ashutosh_asg:uMd968kvQDSyiy7@fyndlearn.e16ttjp.mongodb.net/?retryWrites=true&w=majority" -p 8080:8080 -p 4000:4000 personaldrive:v1

