# Flashcard App

### A Thinkful Capstone Project

This application saves and displays flashcard decks to the user. 

Users can view a deck of flashcards, edit decks, study decks, create new decks, and add and remove cards from decks

Currently the server is not deployed, but the client site can be found [here](https://flashcard-app-kvsf.onrender.com/).  
At the moment, the site is usable but no flashcards will be saved or retrieved for viewing (it's kinda useless).  
To run the server, see installation instructions. Server may only be run on a local machine

---

## Implementation

The website was created using React.js and Bootstrap. Client side rendering ensures dynamic and scalable content. 

Navigation of the site is done with React Routing. Any URL that does not match predefined routes sends the user to a 404 page

There is little error checking so if a user tries to access a deck or card that does not exist, they are left on a loading screen

Default Bootstrap styling with desktop-first development ensures an easy to read, easy on the eyes look (albeit generic)

## Installation

*Default installation runs the client and server simultaneously. Some machines may require the user to run client and server separately. See alternate instructions*

1. Fork and Clone repository
2. Open terminal to local repo
3. run ```npm install``` and ```npm start```  

#### Alternate Installation

1. Fork and Clone repository
2. Open two terminals to local repo
3. run ```npm install``` in one terminal
4. run ```npm start:server``` in one terminal and ```npm start:react``` in other terminal
