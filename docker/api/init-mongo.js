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

db.levels.insertOne({ difficulty: 1, name: 'Level 1', scoreToUnlock: 0 });
