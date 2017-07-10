import { Component } from '@angular/core';
import * as THREE from 'three';

import * as _loader from '../assets/OBJLoader2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private loader = new THREE.ObjectLoader();
  private light = new THREE.DirectionalLight(0xffffff, 1);
  private ray = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private baseColor = 0xc9c9c9;
  private intersectColor = 0x00D66B;
  private intersected;
  private model;

  private init() {
    const geometry = new THREE.SphereGeometry(0.8);
    const helper = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    this.scene.add(helper);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x3d3d3d, 1);
    this.scene.position.x = this.scene.position.y = this.scene.position.z = 0;

    document.body.appendChild(this.renderer.domElement);

    const manager = new THREE.LoadingManager();
    const load = new _loader.OBJLoader2(manager);
    const material = new THREE.MeshPhongMaterial();
    load.load('../assets/backet.obj', (object) => {
      console.log(object);
      object.position.x = object.position.y = object.position.z = 0;
      object.children[0]['geometry'].center();

      this.model = object;
      this.light.position.x = 30;
      this.light.position.y = 15;
      this.light.position.z = 0;

      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 60;
      
      const mesh = new THREE.Mesh(object.children[0]['geometry'], material);

      this.scene.add(mesh);
      this.scene.add(this.light);
    });

    // window.addEventListener('resize', () => {
    //   this.camera.aspect = window.innerWidth / window.innerHeight;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    // }, false);

    // window.addEventListener('mousedown', (event) => {
    //   if (this.model && this.intersected) {
    //     //
    //   }
    // }, false);

    // window.addEventListener('mousemove', (event) => {
    //   this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //   this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    //   this.ray.setFromCamera(this.mouse, this.camera);
    //   const intersects = this.ray.intersectObjects(this.model.children, true);
    //   if (intersects.length > 0) {
    //       if (this.intersected !== intersects[0].object) {
    //         if (this.intersected) {
    //           this.intersected.material.color.setHex(this.baseColor);
    //         }
    //         this.intersected = intersects[0].object;
    //         this.intersected.material.color.setHex(this.intersectColor);
    //       }
    //     } else if (this.intersected) {
    //       this.intersected.material.color.setHex(this.baseColor);
    //       this.intersected = null;
    //     }
    // }, false);

    // window.addEventListener('keydown', (event) => {
    //   const keyCode = event.which;
    //   if (keyCode === 65) {
    //       this.model.rotation.y += 0.1;
    //   } else if (keyCode === 68) {
    //       this.model.rotation.y -= 0.1;
    //   } else if (keyCode === 83) {
    //       this.model.rotation.x += 0.1;
    //   } else if (keyCode === 87) {
    //       this.model.rotation.x -= 0.1;
    //   }
    // }, false);

    // window.addEventListener('mouseup', () => {
    // }, false);

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
