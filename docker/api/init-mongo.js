db = db.getSiblingDB('logo-quiz');

db.createUser(
  {
    user: 'root',
    pwd: 'example',
    roles: [
      {
        role: 'readWrite',
        db: 'logo-quiz'
      }
    ]
  }
);

const level = db.levels.insertOne({ difficulty: 1, name: 'Level 1', scoreToUnlock: 0 });
const logo = db.logos.insertOne({
  obfuscatedLogoUrl: 'obfuscatedImageUrl1',
  realLogoUrl: 'realImageUrl1',
  name: 'Logo 1',
  letters: 'sadhjkasdjaksdhjkasd',
  level: level.insertedId
});
db.logos.insertOne({
  obfuscatedLogoUrl: 'obfuscatedImageUrl2',
  realLogoUrl: 'realImageUrl2',
  name: 'Logo 2',
  letters: 'sadhjkasdjaksdhjkasd',
  level: level.insertedId
});
db.users.insertOne({ name: 'Test' });
