import * as THREE from "three";
import { WaterTexture } from './WaterTexture';

class App {
    constructor(){
        this.waterTexture = new WaterTexture({ debug: false });

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
        this.camera.position.z = 50;

        this.touchTexture = new WaterTexture();

        this.scene = new THREE.Scene();

        this.tick = this.tick.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.init();

    }
    addPlane(){
      let geometry = new THREE.PlaneBufferGeometry(5,5,1,1);
      let material = new THREE.MeshNormalMaterial();
      let mesh = new THREE.Mesh(geometry, material);

      window.addEventListener("mousemove", this.onMouseMove);
      this.scene.add(mesh);
    }

    init(){
    	this.addPlane();
    	this.tick();
    }

    onMouseMove(ev){
      const point = {
    x: ev.clientX/ window.innerWidth,
    y: ev.clientY/ window.innerHeight,
      }
      this.waterTexture.addPoint(point);
}
    render(){
        this.renderer.render(this.scene, this.camera);
    }
    tick(){
        this.render();
        this.waterTexture.update();
        requestAnimationFrame(this.tick);
    }
}


const myApp = new App();
