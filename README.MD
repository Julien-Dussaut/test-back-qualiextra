# API REST TEST BACK QUALIEXTRA

The API is already deployed and accessible at this url : <https://test-back-qualiextra.onrender.com>. Documentation is available [here](https://test-back-qualiextra.onrender.com).

## This file will help you to install, configure and start the API

>Before you start, make sure you have node installed on your computer.
>
>To verify this, open a terminal and type ```node --version```
>
>If a version number appears, you can continue. If not, visit the [Node documentation](https://nodejs.org/en/download) page to install it.
---
> ⚠️ **Attention :** If you're planning to use gmail, your must generate an API key for this application if your account has two-factor authentication activated.
>
> You can verify this by visiting [this page](https://myaccount.google.com/apppasswords?continue=https://myaccount.google.com/security?rapt%3DAEjHL4MXnhwFlGgKlBasm027Nfudp4GOPzum1vALDzjFQDAuO86_TNgNa1eCxPDuy_7HJRvutdrbS2kLJBB0Z2QNIWSQs2p3kz_zqz9fNX5mXJmyX8vKqb8&pli=1&rapt=AEjHL4N_rK06D-chHdWFYhOCLFlkmgQ6epF9a-a-M8dCKydnu92RYehxOBOrxQpm6oo9S6NWNGe5AaiAQiUPjtrH5-KFFRRm70FQs3aA87Ul5SmtgN4RXYk)
>
>If a message tells you that this option isn't available for your account, two-factor authentication isn't activated and you'll use your regular password
>
>If not, you will be invited to create a API KEY.
>
>Name your access and submit.
>
>A key will appear, which will replace your password in this API.
>
---

- Clone the repository on your machine ```git clone REPOSITORY_URL```
- Navigate to the local repository you just cloned and type ```npm install``` in your terminal
- Create a .env file or copy / paste the ```.env.example``` file and remove ```.example``` at the root of the project and set the environnement variables as explained below
  - Declare a PORT variable and indicate the port number you want the application run (fallback will be 3000)
    - Example :  ```PORT=3000```
  - Declare an SERVICE_EMAIL variable with the name of the mail service you're want to use (you'll find at the bottom of this file a list of the common mail services to avoid any typo mistake)
    - Example : ```SERVICE_EMAIL="gmail"```
  - Declare an EMAIL variable with the mail address you want to use to sent the verification email
    - Example :  ```EMAIL="user@example.com"```
  - Declare a PASS with the password for the mail address or your API KEY (generated earlier if needed)
    - Example :  ```PASS="4321"```
  - Copy / paste the instruction below in your console to generate a secure secret key for the token
    ```node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"```
  - Declare a JWT_SECRET variable and past the output in the previous code in it
    - Example :  ```JWT_SECRET="mqslkfdlmqskjdfldsqqs6df46qsd54f6qs5d4"```
  - In case of a production deployement, you also need to declare a variable for the base url
    - Example : ```BASE_URL="DOMAIN WHERE API IS DEPLOYED"```
  - Your .env file should look like this :
      >
      >PORT=3000
      >
      >SERVICE_EMAIL="YOUR EMAIL SERVICE"
      >
      >EMAIL="YOUR EMAIL ADDRESS"
      >
      >PASS="YOUR EMAIL PASSWORD OR API CODE"
      >
      >JWT_SECRET="6a6fb1f2ef5a51491c715d47e18f4fa24ea69b713a269c0a8749d24c50508c70003aee062f7d9fe37b8809897f7f757ebb870784369cdf2e147e9be4ea854a94"
      >
      >BASE_URL="<https://example.com>"
      >
- Start the application with the command ```nodemon server```
- The API is now running on the port you specified in your .env file (or on the port 3000 if you didn't specify any)
- The documentation is available at this url : <http://localhost:YOUR_PORT_NUMBER/api-docs>
- Database is in sqlite so there is no need to configure it
- Three users are automatically created when the API is started
  >Ada Lovelave
  >
  >email : <ada.lovelace@example.com>
  >
  >password : AlgoWoman1852*
  >
  >Admin
  >
  >---
  >Alan Turing
  >
  >email : <alan.turing@example.com>
  >
  >password : Enigma3945+
  >
  >User
  >
  >---
  >
  >Denis Ritchie
  >
  >email : <denis.ritchie@example.com>
  >
  >password : Cunix1941!
  >
  >User

---

### Requests limiters

Some rate limiters are implemented in this API, the default values are the followings :

- Global requests limiter : 100 requests in 15 minutes
- Login requests limiter : 5 requests in 15 minutes
- Resend verification email limiter : 3 requests in 1 hour
  
You can adjust this limiters by defining environment variables in your .env file :

#### Global
>
>TIME_GLOBAL_LIMITER=5 (in minutes)
>
>GLOBAL_REQUESTS_NUMBER=1000

#### Login
>
>TIME_LOGIN_LIMITER=35 (in minutes)
>
>LOGIN_REQUESTS_NUMBER=1000

#### Resend verification email

>
>LOGIN_REQUESTS_NUMBER=1000 (in minutes)
>
>RESEND_REQUESTS_NUMBER=8

---

### Common email services

>gmail
>
>yahoo
>
>hotmail
>
>outlook
>
>outlook365
>
>icloud
>
>mailgun
>
>sendgrid
>
>postmark
>
>mandrill
>
>sendinblue
>
>zoho
>
>yandex
>
>mail.ru
>
>aol
