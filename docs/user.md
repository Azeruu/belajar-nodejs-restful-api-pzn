# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "Reza",
    "email" : "reza@gmail.com",
    "password" : "rahasia"
}
```
Response Body Success :
```json
{
    "data" :{
        "email" : "reza@gmail.com",
        "username" : "Reza"
    }
}
```
Response Body Error :
```json
{
    "errors" : "username already registered"
}
```
## Login User API
Endpoint : POST /api/users/login

Request Body :
```json
{
    "email" : "reza@gmail.com",
    "pasword" : "rahasia"
}
```
Request Body Succes : 
```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```
Request Bosy Error :
```json
{
    "errors" : "Email or password Wrong"
}
```
## Update User API
Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body : 
```json
{
    "email" : "rezabaru@gmail.com",
    "password" : "rahasia baru"
}
```
Request Body Succes :
```json
{
    "data" : {
        "username" : "Reza",
        "email" : "rezabaru@gmail.com"
    }
}
```
Request Body Error :
```json
{
    "errors" : " nama maksimum 100 "
}
```
## Get User API
Endpoint : GET /api/users/current

Headers :
- Authorization : token

Request Body succes :
```json
{
    "data" : {
        "username" : "Reza",
        "email" : "reza@gmail.com"
    }
}
```
Request Body Error : 
```json
{
    "errors" : "Unauthorized"
}
```
## Logout User API
Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body succes :
```json
{
    "data" : "ok"
}
```
Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```