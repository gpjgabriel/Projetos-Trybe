// Desafio 10
function techList(arrTechList, name) {
  let resultado = [];
  let orderTechList = arrTechList.sort();
  if (Object.keys(arrTechList).length === 0) {
    return 'Vazio!';
  }
  for (let key in orderTechList) {
    let obj = {
      name: name,
      tech: orderTechList[key],
    }; resultado.push(obj);
  } return resultado;
}

// Desafio 11
function generatePhoneNumber(arrNumbers) {
  let cont = 0;
  let padrao = '(xx) xxxxx-xxxx';
  if (arrNumbers.length !== 11) {
    return 'Array com tamanho incorreto.';
  } for (let i = 0; i < arrNumbers.length; i += 1) {
    cont = 0;
    padrao = padrao.replace('x', arrNumbers[i]);
    if (arrNumbers[i] < 0 || arrNumbers[i] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    } for (let c = 0; c < arrNumbers.length; c += 1) {
      if (arrNumbers[c] === arrNumbers[i]) {
        cont += 1;
      }
    } if (cont >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  } return padrao;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < (lineB + lineC) && lineB < (lineA + lineC) && lineC < (lineA + lineB)) {
    return true;
  } return false;
}

// Desafio 13
function hydrate(arrBar) {
  let regex = /\d+/g;
  let formatBar = arrBar.match(regex);
  let plu = 0;
  if (formatBar.length === 1) {
    let sing = formatBar + ' copo de água';
    return sing;
  } if (formatBar.length > 1) {
    for (let i in formatBar) {
      plu += parseInt(formatBar[i]);
    } let resultPlu = plu + ' copos de água';
    return resultPlu;
  }
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
