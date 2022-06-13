const btnC1 = document.querySelector('.black');
const btnC2 = document.querySelector('.color1');
const btnC3 = document.querySelector('.color2');
const btnC4 = document.querySelector('.color3');
const pixelBoard = document.getElementById('pixel-board');
const inputLines = document.getElementById('board-size');
const btnClear = document.getElementById('clear-board');
const btnVqv = document.getElementById('generate-board');

// Defiiniçaão de cores aleatórias
window.onload = () => {
  for (let c = 2; c <= 4; c += 1) {
    const NumR = Math.trunc(Math.random() * 255);
    const NumG = Math.trunc(Math.random() * 255);
    const NumB = Math.trunc(Math.random() * 255);
    const color = ('RGB(' + NumR + ', ' + NumG + ', ' + NumB + ')');
    if (c === 2) {
      btnC2.style.backgroundColor = color;
    }
    if (c === 3) {
      btnC3.style.backgroundColor = color;
    } else {
      btnC4.style.backgroundColor = color;
    }
  }
};

// Definição do tamanho do Pixel-Board
function lengthBoard() {
  let nLines = inputLines.value;
  if (nLines === '') {
    alert('Board inválido!');
  }
  if (nLines < 5) {
    inputLines.value = 5;
    nLines = inputLines.value;
  }
  if (nLines > 50) {
    inputLines.value = 50;
    nLines = inputLines.value;
  } else {
    nLines = inputLines.value;
  }
  return nLines;
}

// Remover Pixels Criados
function rmPx() {
  const oldLines = document.querySelectorAll('.pxDiv');
  for (let cont = 0; cont < oldLines.length; cont += 1) {
    oldLines[cont].remove('div');
  }
}

// Criação do Pixel-Board
function createBoard() {
  rmPx();
  const totPixels = lengthBoard();
  for (let lin = 0; lin < totPixels; lin += 1) {
    const pixelDiv = document.createElement('div');
    pixelDiv.className = 'pxDiv';
    pixelBoard.appendChild(pixelDiv);
    for (let col = 0; col < totPixels; col += 1) {
      const pxLine = document.querySelectorAll('.pxDiv')[lin];
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pxLine.appendChild(pixel);
    }
  }
}

btnVqv.addEventListener('click', createBoard);

// Seleção de Cores no Color-Palette
function colorSelector(event) {
  const btnSelected = document.querySelector('.selected');
  btnSelected.classList.remove('selected');
  event.target.classList.add('selected');
}

btnC1.addEventListener('click', colorSelector);
btnC2.addEventListener('click', colorSelector);
btnC3.addEventListener('click', colorSelector);
btnC4.addEventListener('click', colorSelector);

// Alterar cor de Pixel clicado
function colorPixel(event) {
  const btnSelected = document.querySelector('.selected');
  const btnDeselected = btnSelected;
  btnDeselected.classList.remove('selected');
  event.target.className = btnSelected.classList;
  event.target.style.backgroundColor = btnSelected.style.backgroundColor;
  event.target.classList.add('pixel');
  btnDeselected.classList.add('selected');
}
pixelBoard.addEventListener('click', colorPixel);

// Botão para limpar Board
function clearBoard() {
  const getPixels = document.querySelectorAll('.pixel');
  console.log(getPixels);
  for (let i = 0; i < getPixels.length; i += 1) {
    getPixels[i].className = 'pixel';
    getPixels[i].style.backgroundColor = '';
  }
}
btnClear.addEventListener('click', clearBoard);
