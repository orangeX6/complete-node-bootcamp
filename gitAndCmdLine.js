/*
Writing documentations in javascript.
->> jsdoc.app
>> When you hover over the function for whom the comment is written you can get the information about the function in any file in the program

->>313 Setting up git
/*
 * git init - create an empty repository
 * git config --global user.name "Your Name" - set your name
 * git config --global user.email "Your Email" - set your email
 * git status
 *
 -> ADD files to staging area
 * git add -A
 *
-> Add commit     
 * git commit -m "Initial commit"
 *
 -> check log
 * git log
 -> Reset to a particular commit
 >> git reset --hard <commit-hash>
 * git reset --hard a53bb5b7e9df4477bdce5d6ab085e4b2fbed3051
 -> check current branch
 * git branch

 -> create new branch
 * git branch <branch-name>

 -> switch to a branch
 * git checkout -b <branch-name>

  -> Merge changes into current branch
 * git merge new-feature

  -> GIT CHEAT SHEET 
  >> https://www.bing.com/search?q=github+git+cheat+sheet&cvid=e8fe724304de4b9aa10cd7cbe093c582&aqs=edge.1.69i57j0l7j69i60.3774j0j1&pglt=931&FORM=ANNTA1&PC=ASTS

  *    https://training.github.com/downloads/github-git-cheat-sheet.pdf

  -> Push branch to github
  *  git push origin master 

  -> Create readme file
  * touch README.md
  >> md stands for mark down, just a typing format that we can use to write down documents

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

    >> Windows equivalent of linux commands -(written once if works on both)
    ->     ls          dir, ls both work
    ->    cd ..
    ->    cd folderName
    ->    cd../..
    ->    clear
    ->    mkdir
    ->    touch one.js two.js three.js (for creating multiple files)    
    ->    New-item index.js -type file
    ->    rm and del
    ->    mv filename folderPath  mv bankList.js ../
    ->    rmdir (remove empty directory)
    ->    rm -R Test (remove non empty directory) R for recursive

        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////

    ->> PARCEL 
    277. Introduction to NPM
    -> NPM stands for Node Package Manager
    -> Its both a software on our computer and a package repository

    !!! NEVER include the node module package,package.json file while uploading it to github.
    ->> Initialize npm
    >> npm init

    -> In case you delete the node module package, u can simply get it back by the following command
    >> npm i
    -> It will check the dependencies in package.json file and install all the packages with their version numbers

    278. Bundling With Parcel and NPM Scripts
    -> INSTALLING PARCEL
    >> npm i parcel --save-dev
    ? Installing a specific version>?
    * npm i parcel@1.12.4
    ->INSTALLING PACKAGES GLOBALLY
    * npm i parcel -g
    A dev dependency is basically a tool we need to build an application, but not a dependency that we actually include in our code

    There are two ways to use parcel -
    * 1. npx
    >> IN WORKING DIRECTORY
    -> npx parcel index.html

    * 2. npm scripts (HOW WE OFTEN USE)
    >> Add the following in scripts tag in package.json
    ->> "start" : "parcel index.html",
    >> And then in terminal just simply type
    ->> npm run start

    >> Whenever we are done developing the project, it is time to build the final bundle, a bundle which is compressed and has code elimination
    For that we need another parcel command
    >> Add the following in scripts tag in package.json
    -> "build": "parcel build index.html"

    ->>/////////////// MAINTAINING STATE \\\\\\\\\\\\\\\\\<<-
    >>WITH PARCEL WE CAN MAINTAIN THE STATES OF THE OBJECTS USING THE FOLLOWING
    ? The data in the object is not reloaded every time we reload the page.

    if (module.hot) {
    module.hot.accept();
    }
*/
