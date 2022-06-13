const generateToken = (req, _res, next) => {
   // Parte do código abaixo (token) foi retirado de: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details 
  const charsToken = '0123456789abcdefghijABCDEFGHIJ';
  const tokenLength = 16;
  let token = '';
  while (token.length < tokenLength) {
    token += charsToken[Math.floor(Math.random() * charsToken.length)];
  }
  req.token = token;
  next();
};

module.exports = generateToken;