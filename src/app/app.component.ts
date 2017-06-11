import { Component, Inject } from '@angular/core';
import * as THREE from 'three';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private scene = new THREE.Scene();
  private width = window.innerWidth;
  private heigth = window.innerHeight;
  private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private loader = new THREE.ObjectLoader();
  private light = new THREE.DirectionalLight(0xffffff, 1);
  private ray = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private geometry = new THREE.BoxGeometry(20, 20, 20, 20, 20, 20);
  private cube = new THREE.Mesh(this.geometry, new THREE.MeshNormalMaterial());
  private model;

  private init() {
    let drag = false;
    const geometry = new THREE.SphereGeometry(5);
    const helper = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    this.scene.add(helper);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x3d3d3d, 1);
    this.scene.position.x = this.scene.position.y = this.scene.position.z = 0;

    document.body.appendChild(this.renderer.domElement);
    // this.cube.position.x = this.cube.position.y = this.cube.position.z = 0;

    // this.light.position.x = 100;
    // this.light.position.y = 100;
    // this.light.position.z = 100;

    // this.camera.position.y = 0;
    // this.camera.position.z = 50;
    // this.camera.position.x = 0;

    // console.log(this.cube);

    // this.scene.add(this.cube);

    this.loader.load('../assets/model.json', (object) => {
      object.position.x = object.position.y = object.position.z = 0;
      object.children[0]['geometry'].center();
      this.model = object;
      this.light.position.x = 100;
      this.light.position.y = 100;
      this.light.position.z = 100;

      this.camera.position.y = 0;
      this.camera.position.z = 650;
      this.camera.position.x = 0;

      this.scene.add(object);
      this.scene.add(this.light);
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    window.addEventListener('mousedown', (event) => {
      drag = true;
    }, false);

    window.addEventListener('mousemove', (event) => {
      this.ray.setFromCamera(this.mouse, this.camera);
      const intersects = this.ray.intersectObject(this.model.children[0]);
      if (intersects.length > 0) {
        helper.position.set(0, 0, 0);
        helper.lookAt(intersects[0].face.normal);
        helper.position.copy(intersects[0].point);
      }
    }, false);

    window.addEventListener('keydown', (event) => {
      const keyCode = event.which;
      if (keyCode === 39) {
          this.model.children[0].rotation.y += 0.1;
      } else if (keyCode === 37) {
          this.model.children[0].rotation.y -= 0.1;
      } else if (keyCode === 40) {
          this.model.children[0].rotation.x += 0.1;
      } else if (keyCode === 38) {
          this.model.children[0].rotation.x -= 0.1;
      }
      // if (keyCode === 39) {
      //     this.cube.rotation.y += 0.1;
      // } else if (keyCode === 37) {
      //     this.cube.rotation.y -= 0.1;
      // } else if (keyCode === 40) {
      //     this.cube.rotation.x += 0.1;
      // } else if (keyCode === 38) {
      //     this.cube.rotation.x -= 0.1;
      // }
    }, false);

    window.addEventListener('mouseup', () => {
      drag = false;
    }, false);

  }

  private render() {
    requestAnimationFrame(() => { this.render(); });
    this.renderer.render(this.scene, this.camera);
  };

  constructor() {
    this.init();
    this.render();
  }
}



// import { Component, Inject } from '@angular/core';
// import * as THREE from 'three';
// import * as firebase from 'firebase';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   private scene = new THREE.Scene();
//   private width = window.innerWidth;
//   private heigth = window.innerHeight;
//   private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   private renderer = new THREE.WebGLRenderer({ antialias: true });
//   private loader = new THREE.ObjectLoader();
//   private light = new THREE.DirectionalLight(0xffffff, 1);
//   private ray = new THREE.Raycaster();
//   private mouse = new THREE.Vector2();
//   private geometry = new THREE.BoxGeometry(20, 20, 20, 20, 20, 20);
//   private cube = new THREE.Mesh(this.geometry, new THREE.MeshNormalMaterial());
//   private model;

//   private init() {
//     let drag = false;
//     const geometry = new THREE.SphereGeometry(1);
//     const helper = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
//     this.scene.add(helper);

//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     this.renderer.setClearColor(0x3d3d3d, 1);
//     this.scene.position.x = this.scene.position.y = this.scene.position.z = 0;

//     document.body.appendChild(this.renderer.domElement);
//     // this.cube.position.x = this.cube.position.y = this.cube.position.z = 0;

//     // this.light.position.x = 100;
//     // this.light.position.y = 100;
//     // this.light.position.z = 100;

//     // this.camera.position.y = 0;
//     // this.camera.position.z = 50;
//     // this.camera.position.x = 0;

//     // console.log(this.cube);

//     // this.scene.add(this.cube);

//     this.loader.load('../assets/model.json', (object) => {
//       console.log(object);
//       object.position.x = object.position.y = object.position.z = 0;
//       object.children[0]['geometry'].center();
//       this.model = object;
//       this.light.position.x = 100;
//       this.light.position.y = 100;
//       this.light.position.z = 100;

//       this.model.rotation.x = 0.5;

//       this.camera.position.y = 10;
//       this.camera.position.z = 70;
//       this.camera.position.x = 0;

//       this.scene.add(object);
//       this.scene.add(this.light);
//     });


//     window.addEventListener('resize', () => {
//       this.camera.aspect = window.innerWidth / window.innerHeight;
//       this.camera.updateProjectionMatrix();
//       this.renderer.setSize(window.innerWidth, window.innerHeight);
//     }, false);

//     window.addEventListener('mousedown', (event) => {
//       drag = true;
//     }, false);

//     window.addEventListener('mousemove', (event) => {
//       this.ray.setFromCamera(this.mouse, this.camera);
//       if (this.model) {
//         const intersects = this.ray.intersectObjects(this.model.children, true);
//         if (intersects.length > 0) {
//           helper.position.set(0, 0, 0);
//           helper.lookAt(intersects[0].face.normal);
//           helper.position.copy(intersects[0].point);
//         }
//       }
//     }, false);

//     window.addEventListener('keydown', (event) => {
//       const keyCode = event.which;
//       if (keyCode === 39) {
//           this.model.rotation.y += 0.1;
//       } else if (keyCode === 37) {
//           this.model.rotation.y -= 0.1;
//       } else if (keyCode === 40) {
//           this.model.rotation.x += 0.1;
//       } else if (keyCode === 38) {
//           this.model.rotation.x -= 0.1;
//       }
//       // if (keyCode === 39) {
//       //     this.cube.rotation.y += 0.1;
//       // } else if (keyCode === 37) {
//       //     this.cube.rotation.y -= 0.1;
//       // } else if (keyCode === 40) {
//       //     this.cube.rotation.x += 0.1;
//       // } else if (keyCode === 38) {
//       //     this.cube.rotation.x -= 0.1;
//       // }
//     }, false);

//     window.addEventListener('mouseup', () => {
//       drag = false;
//     }, false);

//   }

//   private render() {
//     requestAnimationFrame(() => { this.render(); });
//     this.renderer.render(this.scene, this.camera);
//   };

//   constructor() {
//     this.init();
//     this.render();
//   }
// }
