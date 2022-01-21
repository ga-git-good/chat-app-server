### Description

Oui Chat is an online chat room application that allows people to create and add new members to their chat rooms.

### Deployment
Be deployed online, where the rest of the world can access it:

√  Host on your public Github page, not Github Enterprise.
√  Deploy client application on GH pages.
√  Deploy server application on Heroku.
  
### Version Control
Demonstrate using version control by:

√  Sharing your work through a git repository hosted on Github.
√  Making frequent, cohesive commits dating back to the first day of the project  week.
√  1 commit on the first day of project week on both repos.
√  At least 1 commit every day during project week (not necessarily on both repos).
√  All repositories must have commits from every team member.
√  When pairing, include each developer's name in the commit message.
  
### Documentation
Produce documentation on Github:

√ Create 2 Github repos (one for your front-end and one for your back-end)
√ Pin both repositories on GitHub as a Popular Repository

*Both front-end and back-end repos should include README's with:*

√  An explanation of the what the app does and how it works.
√  A link to the other repo
   *  front end repo: https://github.com/ga-git-good/chat-app
   *  back end repo: https://github.com/ga-git-good/chat-app-server
√  A link to both deployed sites
   *  deployed site: https://ga-git-good.github.io/chat-app/
   *  backend site: https://gg-chat-api.herokuapp.com
√  List of technologies used
   *  List of Technologies:
      *  React
      *  Socket.io
      *  node.js
      *  bootstrap
      *  mongoDB
√  List unsolved problems which would be fixed in future iterations.
    * in order to delete a room you must be in the room
    * sending pictures in chat
√  Document your planning, process and problem-solving strategy
    * morning and evening meetings in discord server:
      * discuss plan for the day/ road blocks/ what is needed for MVP
        * evening meeting recap of the day and any new obstacles
√  Complete the repository Description field and Website field with a meaningful  sentence description of the application and link to the live URL github image 
  
*Your front-end repo's README should also have:*

√   Link to wireframes and user stories
      
  WireFrame:
    ![Imgur](https://i.imgur.com/nYaLgj5.png)
  
*Your back-end repo's README should also have:*

√ Link to Entity Relationship Diagram (ERD).

  ERD:
    ![Imgur](https://i.imgur.com/V8UWMCx.png)

√ A catalog of routes (paths and methods) that the API expects.
  *express routes:
    * Room_Routes:
      * /create-room POST
      * /show-rooms GET
      * /show-server-users GET
      * /add-user-to-room POST
    * Socket-routes:
      * 'new-connection'
      * 'destroy-socket'
      * 'join-room'
      * 'delete-room'
    * User-Routes:
      * /sign-up POST
      * /sign-in POST
      * /change-password PATCH
      * /sign-out DELETE
      * /delete-account DELETE
      * /upload-image POST
      * /go-offline DELETE
    * Image-Route
      * /img GET

### Auth Specifications
√  Sign-up with email, password, and password confirmation.
√* Login with email and password.
        *Sign-In with user name instead of email*
√  Logout when logged in.
√  Change password with current and new password.
√  Sign-up and Sign-in must only be available to not signed in users.
√  Logout and Change password must only be available to signed in users.
√  Give feedback to the user after each action's success or failure.
√  All forms must clear after submit success and user sign-out
√  (Optional) Reset form to initial state on failure

### Client Specifications
 
√  Use a front-end Javascript app using React.js to communicate with your API  (both read and write) and render data that it receives in the browser.
√  Have semantically clean HTML and CSS
√  User must be able to create a new resource
√  User must be able to update a resource
√  User must be able to delete a resource
√  User must be able to view a single or multiple resource(s)
√  All resource actions that change data must only be available to a signed in user.
√  Give feedback to the user after each action's success or failure.
√  All forms must clear after submit success and user sign-out
√  (Optional) Reset form to initial state on failure

### API Specifications
 
√  Use MongoDB, Mongoose, and Express to build an API.
√  Create at least 4 RESTful routes for handling GET, POST, PUT/PATCH, and DELETE requests for a resource other than User.
√  Have at least 1 resource that has a relationship to User
√  Any actions which change data must be authenticated and the data must be "owned" by the User performing the change.

### Team Requirements

*Application must meet Team Project Prompt requirements*
  
  ### Chat Room
  Pitch
  √  Create a website where users can sign in to different chat rooms and chat with other users.

  √  This project will require real time messaging with Socket.io
  
  ### MVP User Stories
  √  As an unregistered user, I would like to sign up with email and password.
  √* As a registered user, I would like to sign in with email and password.
        *Sign-in is with user name instead of email*
  √  As a signed in user, I would like to change password.
  √  As a signed in user, I would like to sign out.
  √  As a signed in user, I would like to send a chat message (socket)
  √  As a signed in user in a room, I would like to see the messages in a chat (socket)
  √  As a signed in user in a room, I would like create my own profile
  √  As a signed in user in a room, I would like to update my own profile
  √  As a signed in user in a room, I would like to delete my profile
  
  ### Reach Goal(s)
  √  Allow for users to create and join different chat rooms
  √  Allow users to send private messages.
    
  *You and your team will be evaluated by each other and the consultant team on:*

  √  Planning
  √  Decision Making
  √  Workflow
  √  Source Control
  √  Team Contribution
  √  Every developer must contribute code to both repositories
  √  Pair Programming
  √  Communication
