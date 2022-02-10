/*
IMPORTANT SECTION
# SECTION 10 - AUTHENTICATION, AUTHORIZATION AND SECURITY
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////


# ⎛⎝(•‿•)⎠⎞
#   125. Modelling Users
#   126. Creating New Users
#   127. Managing Passwords
#   128. How Authentication with JWT Works
#   129. Signing up Users
#   130. Logging in Users
#   131. Protecting Tour Routes - Part 1
#   132. Protecting Tour Routes - Part 2
#   133. Advanced Postman Setup
#   134. Authorization: User Roles and Permissions
#   135. Password Reset Functionality: Reset Token
#   136. Sending Emails with Nodemailer
#   137. Password Reset Functionality: Setting New Password
#   138. Updating the Current User: Password
#   139. Updating the Current User: Data
#   140. Deleting the Current User
#   141. Security Best Practices
#   142. Sending JWT via Cookie
#   143. Implementing Rate Limiting
#   144. Setting Security HTTP Headers
#   145. Data Sanitization
#   146. Preventing Parameter Pollution

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   125. Modelling Users
>> Created userModel.js

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   126. Creating New Users
>> Created authController.js 

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   127. Managing Passwords
>> Added Validation and encrypted password 
>> userModel.js
-> When we are working with authentication, one of the most fundamental principles is to never ever store plain passwords in a database.
-> We should really always encrypt user's passwords.
-> the term "hash" or "hashing" is used all the time and so that basically means encryption 
-> Will be using a popular hashing algorithm called bcrypt

>>BCRYPT
->> This algorithm will first salt then hash our password in order to make it really strong to protect it against brute force attacks.
? salt our password means that its gonna add a random string to the password so that two equal passwords do not generate the same hash

* npm i bcryptjs


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   128. How Authentication with JWT Works
->> JSON WEB TOKENS
>> JSON Web tokens are a stateless solution for authentication. So there is no need to store any session state on the server, which of course is perfect for RESTful APIs like the one that we're building.

? All the communication must happen over https in order to prevent that anyone can get access to passwords or JSON Web Tokens.

>> A json web token is made up of 3 parts 
->  Header
->  Payload
->  Signature

-> The signing algorithm takes the header, the payload and the secret to create a unique signature
>> So only the data plus the secret can create this signature 
>> Then together with the header and the payload, these signature forms the JWT, which then gets sent to the client.

-> We need to verify the JWT to check if its altered on the server.
>> This is quite simple.
-> The server takes the Header and Payload from the JWT once its received and together with the secret that is still saved on the server, basically create a test signature. 
>> Now we just compare the test signature and original signature to verify the user.

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   129. Signing up Users
* npm i jsonwebtoken

//NPM INSTALLS AND OTHER TASKS
* npm i bcryptjs
* npm i jsonwebtoken

//docs
https://github.com/auth0/node-jsonwebtoken#readme

-> Website to check token
>> https://jwt.io/



#   133. Advanced Postman Setup

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   130. Logging in Users

>> The concept of logging a user in basically means to sign a JSON web token and send it back to the client. But in this case we only issue the token in case that the user actually exists, and that the password is correct

->> INSTANCE METHOD 
>> An instance method is basically a method that is gonna be available on all documents. 
>> Its defined on a userSchema. 


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   131. Protecting Tour Routes - Part 1
>> There is a standard for sending a JSON web token as a header. 
>> The standard for sending a token is that we should always use a header called authorization

#   132. Protecting Tour Routes - Part 2
*/
