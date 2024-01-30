 //RECENT
// const { expressjwt: jwt } = require("express-jwt");



// function authJwt()
// {
//     const secret = process.env.secret;
//     return jwt({
//         secret,
//         algorithms:['HS256'],
//         isRevoked:isrevoked
//     }).unless(
//         {
//             path:[
//                 {url:/\/public\/public{.*}/,methods:['GET','OPTIONS']},
//                 {url:/\/api\/v1\/products{.*}/,methods:['GET','OPTIONS']},////I enetered POST here
//                 {url:/\/api\/v1\/categories{.*}/,methods:['GET','OPTIONS']},
//                 '/api/v1/users/login',
//             '/api/v1/users/register'
//         ]
//         }
//     )
    
// }
// async function isrevoked(req,payload,done){
//     if(!payload.isAdmin){
//       console.log("d")
//         done(null,false)
        
//     }
//     else
//     done(null,true);
//     console.log("l")
// }

// module.exports = authJwt;




const expressJwt = require("express-jwt");


function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback,
  }).unless({
    path: [
      //   { url: `${api}/products`, method: ["GET", "OPTIONS"] },
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["PUT", "OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevokedCallback(req, payload, done) {
  if (!payload.isAdmin) {
    //done(null, true);
  }
  done();
}
module.exports = authJwt;



















//module.exports= authJwt;


// var { expressjwt: jwt } = require("express-jwt");

// function authJwt() {
//     console.log("start")
//   const secret = process.env.secret;
//   return jwt({
//     secret,
//     algorithms: ['HS256'],
//     isRevoked: isRevoked
//   }).unless({
//     path: [
//       { url: /\/api\/v1\/products{.*}/, methods: ['GET', 'OPTIONS'] },
//       { url: /\/api\/v1\/categories{.*}/, methods: ['GET', 'OPTIONS'] },
//       '/api/v1/users/login',
//       '/api/v1/users/register'
//     ]
//   });
// }

// async function isRevoked(req, payload, done) {
//     console.log('isrevok');
//   if (!payload.isAdmin) {
//     console.log("Access denied: user is not an admin");
//     done(null, true);
//   } else {
//     done(null, false);
//   }
// }

// module.exports = authJwt;
