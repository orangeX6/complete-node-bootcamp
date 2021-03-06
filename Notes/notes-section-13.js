/*

# SECTION 12 - SERVER-SIDE RENDERING WITH PUG TEMPLATES
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



# ⎛⎝(•‿•)⎠⎞
#   198. Section Intro
#   199. Image Uploads Using Multer: Users
#   200. Configuring Multer
#   201. Saving Image Name to Database
#   202. Resizing Images
#   203. Adding Image Uploads to Form
#   204. Uploading Multiple Images: Tours
#   205. Processing Multiple Images
#   206. Building a Complex Email Handler
#   207. Email Templates with Pug: Welcome Emails
#   208. Sending Password Reset Emails
#   209. Using Sendgrid for "Real" Emails
#   210. Credit Card Payments with Stripe
#   211. Integrating Stripe into the Back-End
#   212. Processing Payments on the Front-End
#   213. Modelling the Bookings
#   214. Creating New Bookings on Checkout Success
#   215. Rendering a User's Booked Tours
#   216. Finishing the Bookings API
#   217. Final Considerations

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   199. Image Uploads Using Multer: Users
-> middleware for multipart form data
-> works for all types of files you want to upload
* npm i multer


? const upload = multer({ dest: 'public/img/users' }); 

// upload.single('image')
// upload.array('images', 5)
exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   202. Resizing Images
->  resizing images 
-> Sharp - 
>> Sharp is a nice and easy to use image library for nodejs
* npm i sharp

*  sharp(req.file.buffer).resize(500, 500);


#   206. Building a Complex Email Handler

-> HTML TO TEXT 
* npm i html-to-text

#   209. Using Sendgrid for "Real" Emails
-> Send in blue //SMTP Service
-> https://temp-mail.org/ // DISPOSABLE EMAIL  


#   210. Credit Card Payments with Stripe
>> Stripe 
* npm i stripe
*/
