# ResQFood Project (Cloud Computing)
<div align=justify>

**Authors :**
| Name                              | Student ID  | Universitas                 |
| ----------------------------------|-------------|-----------------------------|
| Raihan Rifaldi                    | C214D4KY1110 | Universitas Islam Indonesia |
| Rosy Maharani                     | C297D4KX0265 | UPN "Veteran" Yogyakarta    |

<br>

| Method | Endpoint                       | Description                        |
| ------ | ------------------------------ | ---------------------------------- |
| POST   | /register                      | Create a user (register)           |
| POST   | /login                         | Get user data                      |
| PUT    | /profile/user_id               | Edit user data                     |
| GET    | /profile/user_id               | View user data                     |
| GET    | /profile/donation/:user_id     | View posted donation's user        |
| DELETE | /profile/donation/:donation_id | Delete user's donation post        |
| GET    | /profile/sell/:user_id         | View posted sell's user            |
| DELETE | /profile/sell/:sell_id         | Delete user's sell post            |
| --     | --                             | --                                 |
| GET    | /donation/user_id              | View donation's user               |
| POST   | /donation                      | Create donation post               |
| GET    | /donation                      | Display all donations created      |
| --     | --                             | --                                 |
| GET    | /sell/user_id                  | View sell's user                   |
| POST   | /sell                          | Create sell post                   |
| GET    | /sell                          | Display all sells created          |
| GET    | /sell/search=?title            | Search sell by title               |

**Requirements & Tools :**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-black?style=for-the-badge&logo=docker)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**Service in GCP :**
- App Engine = Deployment
- Firestore = Database 
- Cloud Storage = bucket

### Postman Testing

- [x] Feature Users
- [x] Feature Login & Register
- [x] Feature Sell
- [x] Feature Donation
- [x] Feature Search 

<!-- ## Endpoints




## Checklist

### Endpoints

- [x] GET /
- [x] POST /users
- [x] GET /users/{id}
- [x] PUT /users/{id}
- [x] PUT /users/{id}/password
- [x] POST /authentications
- [x] PUT /authentications
- [x] DELETE /authentications
- [x] POST /predictions
- [x] GET /predictions/{userId}
- [x] POST /diseases
- [x] GET /diseases/{nameDiseases}
- [x] PUT /diseases/{nameDiseases}
- [x] DELETE /diseases/{nameDiseases}
- [x] POST /articles
- [x] GET /articles/{id}
- [x] PUT /articles/{id}
- [x] PUT /articles/{id}/image
- [x] DELETE /articles/{id}


### Deployment

- [x] Integrate with Google Cloud Storage Bucket
- [x] Deploy dev API in GCP
- [x] Deploy prod API in GCP
- [x] Deploy ML model in GCP


### Postman Testing

- [x] Feature Users
- [x] Feature Authentications
- [x] Feature Predictions
- [x] Feature Diseases
- [x] Feature Articles -->
