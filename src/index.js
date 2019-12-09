import { WaterTexture } from './WaterTexture';
console.clear();
class App {
  constructor() {
    this.waterTexture = new WaterTexture({ debug:true });
    this.tick = this.tick.bind(this);
    console.log('ok');
    this.init();
  }
  init() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.tick();
  }
  onMouseMove(ev) {
    const point = {
      x: ev.clientX / window.innerWidth,
      y: ev.clientY / window.innerHeight,
    }
    this.waterTexture.addPoint(point);
  }
  tick() {
    this.waterTexture.update();
    requestAnimationFrame(this.tick);
  }
}
console.log('ok');


const myApp = new App();
