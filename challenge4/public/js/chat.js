/*
 * This file contains code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to log out.
 * 4. Redirect a user to index.html if they are not logged in.
 */
(function() {
var app;
var messagesList = document.getElementById("messages");
var logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        app = user;
        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general').limitToLast(100);

        // This event listener will be called for each item
        // that has been added to the list.
        // Use this to generate each chat message,
        // both on initial page load and whenever someone creates a new message.
        messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();

            var text = message.text;
            var timestamp = message.timestamp;

            var messageDiv = document.createElement("div");

            messageDiv.id = id;

            var profileImage = document.createElement("img");
            var messageContent = document.createElement('p');
            var username = document.createElement('h2');
            var timestamp = document.createElement('h5');
            var editButton = document.createElement("button");
            var deleteButton = document.createElement("button");

            // add event listener to edit button
            editButton.addEventListener("click", function(e)  {
                e.preventDefault();
                var postRef = database.ref("channels/general/").child(id);
                var editMessage = prompt("Enter new message", "");

                postRef.update({
                    text: editMessage,
                    photoURL: profileImage,
                    timestamp: data.val().timestamp,
                    newTimestamp: new Date().getTime(),
                    name: username
                });
            });


            // add event listener to delete button
            deleteButton.addEventListener("click", function(e)  {
                e.preventDefault();
                database.ref("channels/general/").child(id).remove();
            });

            profileImage.setAttribute("src", message.photoURL);

            // adding style to the profile image
            profileImage.className = "profile-pic";

            messageContent.textContent = text;
            username.textContent = message.name;
            editButton.textContent = "Edit Message";
            deleteButton.textContent = "Delete Message";

            // I'm styling these buttons with Css
            editButton.className = "regular-button";
            deleteButton.className = "delete-button";

            timestamp.textContent= moment(timestamp).format('MMMM Do, YYYY h:mm:ss A');
            messageDiv.appendChild(profileImage);
            messageDiv.appendChild(username);
            messageDiv.appendChild(timestamp);
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(editButton);
            messageDiv.appendChild(deleteButton);
            messagesList.appendChild(messageDiv);

            //adding style to message boxes
            messageDiv.className = "message-box";
            
        });

        // This event listener will be called whenever an item in the list is edited.
        // Use this to update the HTML of the message that was edited.
        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val().text;
            var newMessage = document.getElementById(id);
            newMessage.querySelector('p').innerHTML = message;
            newMessage.querySelector('h4').innerHTML = 'edited at ' + moment
            (data.val().newTimestamp).format('MMMM Do YYYY, h:mm:ss a');
        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            var messageDeleted = document.getElementById(id);
            messagesList.removeChild(messageDeleted);
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('channels/general');

    // Get the message the user entered
    var message = messageInput.value;
    messageInput.focus();
    messageInput.select();

    // Create a new message and add it to the list.
    messages.push({
        text: message,
        photoURL: app.photoURL,
        name: app.displayName,
        timestamp: new Date().getTime() // unix timestamp in milliseconds
    })
    .then(function () {
        messageInput.value = '';
        // message created succesfully
    })
    .catch(function(error) {
        // message not created succesfully
    });
});
})();
