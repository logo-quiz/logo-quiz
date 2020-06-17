db = db.getSiblingDB('logo-quiz');

db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'logo-quiz'
    }
  ]
});

const level1 = db.levels.insertOne({ difficulty: 1, name: 'Level 1', scoreToUnlock: 0 });
const level2 = db.levels.insertOne({ difficulty: 2, name: 'Level 2', scoreToUnlock: 0 });
const level3 = db.levels.insertOne({ difficulty: 3, name: 'Level 3', scoreToUnlock: 2 });

db.logos.insertOne({
  obfuscatedImageUrl:
    'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590512047/owejhyuachpati_itqays.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590512047/pateaahnkdchxf_d8bsqo.jpg',
  name: 'apache',
  letters: 'faweacsherlgxp',
  level: level1.insertedId
});
db.logos.insertOne({
  obfuscatedImageUrl:
    'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590512047/paghrllgqnwauc_eqtqj8.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590512047/xgylauleuaniar_eixmfo.jpg',
  name: 'angular',
  letters: 'pguxnwrutacala',
  level: level1.insertedId
});

db.logos.insertOne({
  obfuscatedImageUrl:
    'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590437652/eihnxzgcgbtfld_ffisqo.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590437747/pdtjmyrksihegb_yjqtty.jpg',
  name: 'git',
  letters: 'eihnxzgcgbtfld',
  level: level2.insertedId
});
db.logos.insertOne({
  obfuscatedImageUrl:
    'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590438437/loiscwaktqnggu_uaps0h.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590438437/vaudgbnoplgaol_w95xfe.jpg',
  name: 'golang',
  letters: 'ixdgglpakyrwno',
  level: level2.insertedId
});

db.logos.insertOne({
  obfuscatedImageUrl:
    'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590438390/voevjwpoeapcnn_td01ho.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590438390/gepznvconqfipc_q9mkkt.jpg',
  name: 'opencv',
  letters: 'voevjwpoeapcnn',
  level: level3.insertedId
});
db.logos.insertOne({
  obfuscatedImageUrl:
    'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590438410/cxarrplnogetuy_khcwnz.jpg',
  realImageUrl: 'https://res.cloudinary.com/dvug9mnfm/image/upload/v1590438410/cfyzxjdirevaat_ritemo.jpg',
  name: 'react',
  letters: 'acyxtdcraotpze',
  level: level3.insertedId
});
db.users.insertOne({ name: 'Test' });
