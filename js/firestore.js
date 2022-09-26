let db;

function dbInitialize() {
    firebase.initializeApp({
      apiKey: "AIzaSyAtYHZDkMmkInnpEx4juS7QoN3NWjQ-n0E",
      authDomain: "lkrs221105wd.firebaseapp.com",
      projectId: "lkrs221105wd"
    });

    db = firebase.firestore();
}

function dbReadAllMessages() {
    db.collection("message").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        setMessages(querySnapshot.docs.map(function(doc) {
            let message = doc.data();
            message.id = doc.id;
            return message;
        }));
    });
}

function dbCreateMessage(input_name, input_comment, input_password) {
    db.collection("message").add({
        name: input_name,
        comment: input_comment,
        password: input_password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
        updateMessages();
    })
    .catch(function(error) {
    });
}

function dbDeleteMessage(message_id) {
    db.collection("message").doc(message_id).delete().then(function() {
        updateMessages();
    }).catch(function(error) {
    });
}
