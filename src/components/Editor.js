'use strict';
import Brush from './Brush.js';

module.exports = class Editor {
  constructor() {
    this.color = '#000';
    this.size = '2';
    this.initEditor();
  }

  initEditor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.bindEvents();
    this.brush = new Brush(this.ctx, this.size, this.color);
  }

  getColor() {
    return this.color;
  }

  getSize() {
    return this.size;
  }

  setColor(color) {
    this.color = color;
  }

  setSize(size) {
    this.size = size;
  }

  bindEvents() {
    const start = (evt) => {
      evt.preventDefault();

      if (evt.which === 3) {
        return;
      }
      this.brush.setStyle(this.color, this.size, 'source-over');
      this.brush.start(evt);
    };

    this.canvas.addEventListener('pointerdown', start);
    this.canvas.addEventListener('touchstart', start);
    this.canvas.addEventListener('mousedown', start);

    const move = (evt) => {
      evt.preventDefault();
      this.brush.move(evt);
    };

    this.canvas.addEventListener('pointermove', move);
    this.canvas.addEventListener('touchmove', move);
    this.canvas.addEventListener('mousemove', move);

    const stop = (evt) => {
      evt.preventDefault();
      this.brush.end(evt);
    };

    this.canvas.addEventListener('pointerup', stop);
    this.canvas.addEventListener('touchend', stop);
    this.canvas.addEventListener('mouseup', stop);
  }

  clean() {
    document.querySelector('.canvasWrap').removeChild(document.querySelector('canvas'));
    document.querySelector('.canvasWrap').appendChild(
      document.createElement('canvas')
    );

    this.initEditor();
  }
};
