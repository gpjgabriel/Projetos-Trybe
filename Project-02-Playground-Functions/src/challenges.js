// Desafio 1
// Crie uma função usando o operador &&
function compareTrue(a, b) {
  if (a && b === true) {
    return true;
  } return false;
}

// Desafio 2
// Crie uma função que calcule a área de um triângulo
function calcArea(base, height) {
  let area = (base * height) / 2;
  return area;
}

// Desafio 3
// Crie uma função que divida a frase
function splitSentence(string) {
  let list = string.split(' ');
  return list;
}

// Desafio 4
// Crie uma função que use concatenação de strings
function concatName(string) {
  let firstList = string[0];
  let lastList = string[((string.length) - 1)];
  let fullName = `${lastList}, ${firstList}`;
  // let fullName = (lastList + ', ' + firstList);
  return fullName;
}

// Desafio 5
// Crie uma função que calcule a quantidade de pontos no futebol
function footballPoints(wins, ties) {
  let points = 0;
  if (wins || ties !== 0) {
    points = (wins * 3) + (ties);
  } return points;
}

// Desafio 6
// Crie uma função que calcule a repetição do maior número
function highestCount(arrList) {
  let x = arrList;
  let maior = -100;
  let c = 0;
  for (let i = 0; i < x.length; i += 1) {
    if (x[i] > maior) {
      maior = x[i];
      c = 0;
    } if (x[i] === maior) {
      c += 1;
    }
  }
  return c;
}

// Desafio 7
// Crie uma função de Caça ao Rato
function catAndMouse(mouse, cat1, cat2) {
  let dist1 = cat1 - mouse;
  let dist2 = cat2 - mouse;
  if ((dist1 * (-1)) === dist2) {
    return 'os gatos trombam e o rato foge';
  }
  if (dist1 < dist2) {
    return 'cat1';
  }
  return 'cat2';
}

// Desafio 8
// Crie uma função FizzBuzz
function fizzBuzz(arrBuz) {
  let fb = [];
  for (let i = 0; i < arrBuz.length; i += 1) {
    if (arrBuz[i] % 3 === 0 && arrBuz[i] % 5 === 0) {
      fb.push('fizzBuzz');
      continue;
    }
    if (arrBuz[i] % 3 === 0) {
      fb.push('fizz');
      continue;
    }
    if (arrBuz[i] % 5 === 0) {
      fb.push('buzz');
      continue;
    } else {
      fb.push('bug!');
    }
  } return fb;
}

// Desafio 9
// Crie uma função que Codifique e Decodifique
function encode(arrEncode) {
  let vog = ['a', 'e', 'i', 'o', 'u'];
  let numb = [1, 2, 3, 4, 5];
  let list = arrEncode.split('');
  let newList = '';
  for (let i = 0; i < list.length; i += 1) {
    for (let c = 0; c < vog.length; c += 1) {
      if (vog[c] === list[i]) {
        list[i] = numb[c];
      }
    } newList += list[i];
  } return newList;
}

function decode(arrCode) {
  let vog = ['a', 'e', 'i', 'o', 'u'];
  let numb = ['1', '2', '3', '4', '5'];
  let list = arrCode.split('');
  let newList = '';
  for (let i = 0; i < list.length; i += 1) {
    for (let c = 0; c < numb.length; c += 1) {
      if (numb[c] === list[i]) {
        list[i] = vog[c];
      }
    } newList += list[i];
  } return newList;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
