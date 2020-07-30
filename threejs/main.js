let scene, camera, renderer;

function init () {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    hlight = new THREE.AmbientLight(0x404040, 1);
    scene.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    light = new THREE.PointLight(0xffffff, 3);
    light.position.set(0, 300, 500);
    scene.add(light);

    light2 = new THREE.PointLight(0xcffffff, 3);
    light.position.set(500, 100, 0);
    scene.add(light2);

    light3 = new THREE.PointLight(0xffffff, 3);
    light.position.set(0, 100, -500);
    scene.add(light3);

    light4 = new THREE.PointLight(0xffffff, 3);
    light.position.set(-5000, 300, 0);
    scene.add(light4);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    //camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 30;
    camera.position.y = 30;
    camera.position.z = 30;


    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();
        loader.load('/threejs/DCPT_Gltf/DCPT.gltf', function (gltf) {
            car = gltf.scene.children[0];
            car.scale.set(1, 1, 1);
            scene.add(gltf.scene);
            animate();
        })

}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();