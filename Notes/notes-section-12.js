/*

# SECTION 12 - SERVER-SIDE RENDERING WITH PUG TEMPLATES
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



# ⎛⎝(•‿•)⎠⎞
#   174. Section Intro
#   175. Recap: Server-Side vs Client-Side Rendering
#   176. Setting up Pug in Express
#   177. First Steps with Pug
#   178. Creating Our Base Template
#   179. Including Files into Pug Templates
#   180. Extending Our Base Template with Blocks
#   181. Setting up the Project Structure
#   182. Building the Tour Overview - Part 1
#   183. Building the Tour Overview - Part 2
#   184. Building the Tour Page - Part 1
#   185. Building the Tour Page - Part 2
#   186. Including a Map with Mapbox - Part 1
#   187. Including a Map with Mapbox - Part 2
#   188. Building the Login Screen
#   189. Logging in Users with Our API - Part 1
#   190. Logging in Users with Our API - Part 2
#   191. Logging in Users with Our API - Part 3
#   192. Logging out Users
#   193. Rendering Error Pages
#   194. Building the User Account Page
#   195. Updating User Data
#   196. Updating User Data with Our API
#   197. Updating User Password with Our API

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   175. Recap: Server-Side vs Client-Side Rendering
#   176. Setting up Pug in Express
#   177. First Steps with Pug
#   178. Creating Our Base Template
#   179. Including Files into Pug Templates
#   180. Extending Our Base Template with Blocks
>> Template engines are used to fill up the template with our data. 
>> Pug is one of the template engines
>> Pug is most commonly used template engine with express.

doctype html
html
  head 
    title Natours | #{tour}
    link(rel='stylesheet' href='css/style.css')
    link(rel='shortcut icon' type='image/png' href='img/favicon.png')

  body 
    h1= tour
    h2= user.toUpperCase()
    //- h1 The Park Camper 
    // will display in browser inspect

    - const x = 9 
    h2= 2 * x

    p This is just some text

* npm i pug

-> Pug files (>>)  
-> in html (*)

-> Writing html elements 
>> h1 The Park Camper 
* <h1>The Park Camper</h1>

-> Defining properties
>>link(rel='stylesheet' href='css/styles.css')
* <link rel="stylesheet" href="css/style.css"/>

-> Using variables 
>> h1= tour

-> Writing comments 
>> // this is a comment
* <!-- this is a comment -->

-> A comment to a pug file but wont be displayed in html output
>>  //- h1 The Park Camper 

-> JS in pug 
>>  h2= user.toUpperCase()
? - const -> - will make sure that code does not appear in html
>>  - const x = 9 
>>  h2= 2 * x

-> IF STATEMENT and EACH LOOP WITH MULTIPLE PARAMS 
 -if (guide.role === 'lead-guide') 
  span.overview-box__label Lead guide

 each img, i in tour.images
  .picture-box
    img.picture-box__img.picture-box__img--1(src=`/img/tours/${img}`, alt=`${i+1}`)
    
-> interpolation (works just like js template literals (``))
>>    title Natours #{tour}

-> class 
>> htmltag.classname
>> nav.nav.nav--tours

-> Including child templates 
>> include _header

-> Extending base template (Child template includes base)
>> extends base

-> Looping
>> each tour in tours

-> Space in two elements
>>    span.card__footer-value= `$${tour.price}` 
>>    | (add empty space here ( ))
>>    span.card__footer-text per person

-> Mixins
?  So mixins are basically reusable pieces of code that we can pass arguments into. So a bit like a function.

mixin overviewBox(label, text,icon)
  .overview-box__detail
    svg.overview-box__icon
      use(xlink:href=`/img/icons.svg#icon-${icon}`)
    span.overview-box__label= label
    span.overview-box__text= text

- const date = tour.startDates[0].toLocaleString('en-US', {month:'long', year:'numeric'})
        +overviewBox('Next date', date, 'calendar')
        +overviewBox('Difficulty', tour.difficulty, 'trending-up')
        +overviewBox('Participants', `${tour.maxGroupSize} people`, 'user')
        +overviewBox('Rating', `${tour.ratingsAverage} / 5`, 'star')

-> Append (Adds script to the end of the page)
block append head
  script(src=`js/mapbox.js`)

-> Prepend(Adds script to the start of the page) 
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   181. Setting up the Project Structure
#   182. Building the Tour Overview - Part 1
#   183. Building the Tour Overview - Part 2
#   184. Building the Tour Page - Part 1
#   185. Building the Tour Page - Part 2
#   186. Including a Map with Mapbox - Part 1
#   187. Including a Map with Mapbox - Part 2
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

#   189. Logging in Users with Our API - Part 1
#   190. Logging in Users with Our API - Part 2
#   191. Logging in Users with Our API - Part 3
  * npm i cookie-parser
  location.assign('/');
  res.locals.user = currentUser;

  //////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
#   192. Logging out Users
#   193. Rendering Error Pages
#   194. Building the User Account Page
#   195. Updating User Data
#   196. Updating User Data with Our API
#   197. Updating User Password with Our API



*/
