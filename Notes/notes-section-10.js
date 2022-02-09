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


*/
