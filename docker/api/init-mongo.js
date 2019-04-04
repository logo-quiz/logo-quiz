db = db.getSiblingDB('logo-quiz');

db.createUser(
  {
    user: "root",
    pwd: "example",
    roles: [
      {
        role: "readWrite",
        db: "logo-quiz"
      }
    ]
  }
);

db.levels.insertOne({ number: 1, unlock: 0 });
