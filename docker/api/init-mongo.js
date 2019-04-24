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
  obfuscatedImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1556079120/icoxvadghaep_u0ckga.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1556079231/nafshzcbeupcaq_n4hacg.jpg',
  name: 'apache',
  letters: 'faweacsherlgxp',
  level: level.insertedId
});
db.logos.insertOne({
  obfuscatedImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1556079519/koylerilznauga_nn6qkr.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1556079524/rkuhcwlagajbnn_xkykgu.jpg',
  name: 'angular',
  letters: 'pguxnwrutacala',
  level: level.insertedId
});
db.users.insertOne({ name: 'Test' });
