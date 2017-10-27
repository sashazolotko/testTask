'use strict';
const requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

module.exports = class Brush {
  constructor(context, lineWidth, color) {
    if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error('No 2D rendering context given!');
    }

    this.workingStrokes = null;

    this.ctx = context;
    this.state = {
      strokes: [],
      lastLength: 0,
      isTouching: false,
    }

    // init context
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.lineCap = this.ctx.lineJoin = 'round';

  }

  setStyle(color, lineWidth, compositeOperation) {
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.globalCompositeOperation = compositeOperation;
  }

  getEvtXY(event) {
    let { offsetX: x, offsetY: y } = event;

    if (event['touches']) {
      const rect = this.ctx.canvas.getBoundingClientRect();
      x = event['touches'][0].clientX - rect.left;
      y = event['touches'][0].clientY - rect.top;
    }

    return {x, y};
  }

  start(event) {
    this.workingStrokes = [this.getEvtXY(event)];
    this.state.strokes.push(this.workingStrokes);
    this.state.lastLength = 1;
    this.state.isTouching = true;
    requestAnimationFrame(this._draw.bind(this));
  }

  move(event) {
    if (!this.state.isTouching) { return; }

    this.workingStrokes.push(this.getEvtXY(event));
    requestAnimationFrame(this._draw.bind(this));
  }

  end() {
    this.state.isTouching = false;
  }

  _draw() {
    let length = this.workingStrokes.length;

    if (length <= this.state.lastLength) {
        return;
    }

    let startIndex = this.state.lastLength - 1;

    this.state.lastLength = length;

    let pt0 = this.workingStrokes[startIndex];

    this.ctx.beginPath();

    this.ctx.moveTo(pt0.x, pt0.y);

    for (let j = startIndex; j < this.state.lastLength; j++) {

        const pt = this.workingStrokes[j];

        this.ctx.lineTo(pt.x, pt.y);

    }

    this.ctx.stroke();
  }
}
