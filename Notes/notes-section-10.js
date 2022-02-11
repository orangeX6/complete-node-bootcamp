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
#   133. Advanced Postman Setup
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   134. Authorization: User Roles and Permissions
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   135. Password Reset Functionality: Reset Token
>> The password reset token should basically be a random string but at the same time, it doesn't need to be as cryptographically strong as the password hash that we created before. We can just use the very simple, random bytes function from the built-in crypto module
* const crypto = require('crypto');
 ? It is built in node modules

 >> We need to send the reset token and then we have the encrypted version in our database. And that encrypted one is basically useless to change the password. 
 ? Its just like when we are saving only the encrypted password in our database which we encrypted using bcrypt

 * validateBeforeSave: false
 ->> This will DEACTIVATE all the validators that we specified in our schema.
 >> because we're trying to save a document, but we do not specify all of the mandatory data, i.e. the fields that we marked as required, we need to disable validation 
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   136. Sending Emails with Nodemailer
-> npm i nodemailer

>> We won't be using gmail.. but just FYI 
>> For gmail 
 const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
-> Activate in gmail "less secure app" option

? The reason for not using gmail is actually gmail is not at all a good idea for prod app as you can only send 500 mails per day.

-> Some well known services to use are 
>> send grid
>> mail gun

->> mailtrap.io
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   137. Password Reset Functionality: Setting New Password
#   138. Updating the Current User: Password
#   139. Updating the Current User: Data
#   140. Deleting the Current User

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   141. Security Best Practices
-> COMPROMISED DATABASE 
>> Strongly encrypt passwords with salt and hash (bcrypt)
>> Strongly encrypt password reset tokens (SHA 256)

-> BRUTE FORCE ATTACKS
>> Use bcrypt (to make login requests slow)
>> Implement rate limiting
>> Implement maximum login attempts

-> CROSS SITE SCRIPTING(XSS) ATTACKS
? Attacker tries to inject scripts into our page to run his malicious code.
? it is especially dangerous on the client side as it allows attacker to read local storage, which is why we should never store jwt in local storage
>> Store JWT in HTTPOnly cookies
#Instead, it should be stored in an HTTP-only cookie that makes it so that the browser can only receive and send the cookie but cannot access or modify it in any way. And so, that then makes it impossible for any attacker to steal the JSON web token that is stored in the cookie.
>> Sanitize user input data
>> Set special HTTP Headers (helmet package)

-> DENIAL OF SERVICE ATTACKS 
>> Implement rate limiting
>> Limit body payload (in body parser)
>> Avoid evil regular expressions (long time to execute)

-> NOSQL QUERY INJECTION
>> Use mongoose for MongoDB (because of schema types)
>> Sanitize user input data

-> OTHER BEST PRACTICES 
>> Always use HTTPS
>> Create random password reset token with expiry dates
>> Deny access to JWT after password change
>> Don't commit sensitive config data to Git
>> Don't send error details to clients
>> Prevent cross-site request forgery (csurf package)
>> Prevent parameter pollution causing uncaught exceptions

//LOGIN ATTEMPTS IMPLEMENTATION
passwordAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  isBlocked: {
    type: Boolean,
    default: false,
    select: false
  },
  unBlockDate: {
    type: Date,
    select: false
  }
//Users have 3 attempts
userSchema.methods.loginAttempts = function() {
  if (!this.isBlocked) {
    if (this.passwordAttempts >= 2) {
      this.isBlocked = true;
      //set unlock time
      const unlockTime = 1000 * 60 * 2; //only for testing
      this.unBlockDate = Date.now() + unlockTime;
    }
    this.passwordAttempts++;
  } else if (this.unBlockDate - Date.now() < 0) {
    this.resetBlockSettings();
  }
};
 
userSchema.methods.resetBlockSettings = function() {
  this.isBlocked = false;
  this.unBlockDate = undefined;
  this.passwordAttempts = 0;
};


authRoute:

Note: I have implemented the email validation, which is in another post in this section... if you find that I have more code than the original

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
 
  //1.  Check if email and password exist
  if (!validator.isEmail(email)) {
    return next(new AppError("Please provide a valid email", 400));
  }
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
 
  //2.  Check if the user exist && password is correct
  // necesitamos que password se muestre momentaneamente
 
  const user = await User.findOne({ email }).select(
    "+password +validated +passwordAttempts +isBlocked +unBlockDate"
  );
 
  if (!user) {
    return next(new AppError("Account not found, please register first.", 400));
  }
  
  if (!user.validated) {
    return next(
      new AppError(
        "Your account has not been validated. Please check your inbox",
        400
      )
    );
  }
  if (user.unBlockdate || user.unBlockDate - Date.now() < 0) {
    user.resetBlockSettings();
  }
  if (user.isBlocked) {
    const timeRemaining = Math.round(
      (user.unBlockDate - Date.now()) / 1000 / 2
    );
    return next(
      new AppError(
        `Your account has been blocked. Please try again in ${timeRemaining} minutes`,
        400
      )
    );
  }
 
  //if there is no user and password DO NOT match, return error
  //checking if user exists and password match
  if (!user || !(await user.correctPassword(password, user.password))) {
    
    //check if user fails on 3 attempts
    user.loginAttempts();
    await user.save({ validateBeforeSave: false });
 
    return next(new AppError("Incorrect email and password", 401));
  }
  //3.  If eveything is OK, send token to client & clean failed attempts if so
 
  user.resetBlockSettings();
  createSendToken(user, 200, res);
});


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   142. Sending JWT via Cookie
>> So first of all, a cookie is basically just a small piece of text that a server can send to clients. Then when the client receives a cookie, it will automatically store it and then automatically send it back along with all future requests to the same server.

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


#   143. Implementing Rate Limiting
* npm i express-rate-limit
>>  rate limiting prevents the same IP from making too many requests to our API and that will then help us preventing attacks like denial of service, or brute force attacks.

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


#   144. Setting Security HTTP Headers
>> Using helmet npm package in order to set a couple of really important security http headers.
* npm i helmet

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


#   145. Data Sanitization
>> So, data sanitization basically means to clean all the data that comes into the application from malicious code. So, code that is trying to attack our application. In this case, we're trying to defend against two attacks.
//  Data Sanitization against NoSQL query injection
* npm i express-mongo-sanitize

//  Data Sanitization against XSS
* npm i xss-clean

///////////////////////////////////////////
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
IMPORTANT NoSQL Query Injection DEMO
>> We will now simulate a NoSQL query injection 
-> Let's try to log in as someone, even without knowing their email address. All right, so basically, simply giving a password, let's say this one here, we will be able to log in, but even without knowing the email address.
>> Again, we're going to do that by simulating a NoSQL query injection, and the easiest way of doing it goes like this. Instead of specifying a real email, we specify this query, basically.
* {
*   "email": {"$gt":""},  
*  "password":"pass1234"
*}
? We use the MongoDB greater than operator and set it equal to nothing, okay? And now, what happens? Indeed, we are now logged in as the admin.


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


#   146. Preventing Parameter Pollution
>> WE WILL USE MIDDLE WARE TO REMOVE THIS DUPLICATE FIELDS AND WILL USE THE LAST SPECIFIED FIELD OF THE DUPLICATES
-> WE WILL USE THE WHITELIST PROPERTY IN OPTIONS OBJECT TO WHITELIST SOME PARAMETERS FOR WHOM ITS THE NORMAL BEHAVIOR 

* npm i hpp

app.use(
  hpp({
    whitelist: ['duration'],
  })
);



//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

*/
