import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let sun;

const container = document.getElementById('canvas-container');

function init() {
    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // LIGHT
    const light = new THREE.PointLight(0xffffff, 3, 200);
    scene.add(light);

    createStars();
    createSun();

    animate();
}

// --- STARS ---
function createStars() {
    const geo = new THREE.BufferGeometry();
    const count = 2000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        pos[i] = (Math.random() - 0.5) * 200;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);
}

// --- SUN ---
function createSun() {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const mat = new THREE.MeshStandardMaterial({
        color: 0xffcc33,
        emissive: 0xffaa00,
        emissiveIntensity: 3
    });

    sun = new THREE.Mesh(geo, mat);
    scene.add(sun);
}

// --- ANIMATION ---
function animate() {
    requestAnimationFrame(animate);

    if (sun) {
        sun.rotation.y += 0.003;
    }

    controls.update();
    renderer.render(scene, camera);
}

init();