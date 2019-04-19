# LogoQuiz

1. Run database
```
docker-compose -f ./docker/api/mongo.yml up
```

2. Run backend
```
ng serve api
```
The backend will run in port 3333

3. Run frontend
```
ng serve logo-quiz
```
The frontend will run in port 4200
