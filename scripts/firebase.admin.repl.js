#!/usr/bin/env node

// Using the firebase-admin approach where database security rules do not apply.
// Here you are authenticating with a private key. The key JSON file is available via
// the Firebase web UI: project settings > service accounts > generate new private key.

var admin = require("firebase-admin");

const serviceAccountKeyFile = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_FILE;
if (!serviceAccountKeyFile) {
  console.error('Set FIREBASE_SERVICE_ACCOUNT_KEY_FILE to the path to your credentials file.');
  process.exit();
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyFile),
  databaseURL: "https://projectionist-d5fef.firebaseio.com"
});

var firestore = admin.firestore();
var storage = admin.storage();

var repl = require("repl");

var replServer = repl.start({
  prompt: "firebase> ",
});

replServer.context.admin = admin;
replServer.context.firestore = firestore;
replServer.context.storage = storage;
