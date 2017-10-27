import _ from 'lodash';
import './style.css';
import Editor from './components/Editor.js';

function generatePalette(row) {
  const colors = [
      "#000",
      "#f00",
      "#0f0",
      "#ff0",
      "#fff",
      "#00f",
  ];
  colors.forEach((color) => {
      const colorItem = document.createElement('li');
      colorItem.style.backgroundColor = color;
      colorItem.dataset.color = color;
      row.appendChild(colorItem);
  });
}

function generateBrashSizes(row) {
  const sizes = [
      "2",
      "8",
      "12",
      "16",
      "20",
  ];
  sizes.forEach((size) => {
    const brushSizeItem = document.createElement('li');

    brushSizeItem.style.width = `${size}px`;
    brushSizeItem.style.height = `${size}px`;
    brushSizeItem.style.borderRadius = `${size}px`;

    brushSizeItem.dataset.size = size;
    row.appendChild(brushSizeItem);
  });
}

function component() {
  const div = document.createElement('div');
  div.classList.add('container');

  const frame = document.createElement('div');
  const canvasWrap = document.createElement('div');
  const canvas = document.createElement('canvas');
  const toolbarWraper = document.createElement('div');
  const palette = document.createElement('ul');
  const sizes = document.createElement('ul');
  const cleanButton = document.createElement('button');

  cleanButton.textContent = 'Clean';

  generatePalette(palette);
  generateBrashSizes(sizes);

  palette.dataset.tool = 'color';
  sizes.dataset.tool = 'size';

  frame.classList.add('frameEditor');
  canvasWrap.classList.add('canvasWrap')
  cleanButton.classList.add('clean');
  toolbarWraper.classList.add('toolbarWraper');
  palette.classList.add('colorList');
  sizes.classList.add('sizeList');

  toolbarWraper.appendChild(cleanButton);
  toolbarWraper.appendChild(palette);
  toolbarWraper.appendChild(sizes);
  canvasWrap.appendChild(canvas);
  frame.appendChild(canvasWrap);
  frame.appendChild(toolbarWraper);

  div.appendChild(frame);

  return div;
}

document.body.appendChild(component());

window.addEventListener('load', () => {
  const editor = new Editor();

  document.querySelector('ul.colorList').addEventListener('click', (evt) => {
    if (evt.target.dataset.color === editor.getColor()) { return; }
    evt.stopPropagation();
    editor.setColor(evt.target.dataset.color);
  });

  document.querySelector('ul.sizeList').addEventListener('click', (evt) => {
    if (evt.target.dataset.size === editor.getSize()) { return; }
    evt.stopPropagation();
    editor.setSize(evt.target.dataset.size);
  });

  document.querySelector('.clean').addEventListener('click', (evt) => {
    evt.stopPropagation();
    editor.clean();
  });
});
