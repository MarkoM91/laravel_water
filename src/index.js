import { WaterTexture } from './WaterTexture';
import { EffectComposer, RenderPass } from 'postprocessing';
import { WaterEffect } from './WaterEffect'
import { EffectPass } from 'postprocessing';

console.clear();
class App {
  constructor() {
    this.waterTexture = new WaterTexture({ debug:false });
    this.renderer = new THREE.WebGLRenderer({
      antialias: false
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.append(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
        );
    this.composer = new EffectComposer(this.renderer);
    this.clock = new THREE.Clock();
    this.camera.position.z = 50;

    this.touchTexture = new WaterTexture();


    this.tick = this.tick.bind(this);
    this.scene = new THREE.Scene();
    this.init();
  }

  addPlane() {
    let geometry = new THREE.PlaneBufferGeometry(5, 5, 1, 1);
    let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, material);

    window.addEventListener('mousemove', this.onMouseMove);
    this.scene.add(mesh);
  }

  initComposer() {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.waterEffect = new WaterEffect(  this.touchTexture.texture);

    const waterPass = new EffectPass(this.camera, this.waterEffect);

    renderPass.renderToScreen = false;
    waterPass.renderToScreen = true;
    this.composer.addPass(renderPass);
    this.composer.addPass(waterPass);
  }

  init() {
    this.addPlane();
    this.initComposer();
    this.tick();
  }

  onMouseMove(ev) {
    const point = {
      x: ev.clientX / window.innerWidth,
      y: ev.clientY / window.innerHeight,
    }
    this.touchTexture.addPoint(point);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.composer.render(this.clock.getDelta());
  }

  tick() {
    this.render();
    this.waterTexture.update();
    requestAnimationFrame(this.tick);
  }
}
console.log('ok');


const myApp = new App();
