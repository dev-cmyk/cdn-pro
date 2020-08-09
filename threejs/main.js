let scene, camera, renderer, model, hemiLight, spotLight, directionalLight, pointLight;

function init () {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 4);
    scene.add(hemiLight);

    spotLight = new THREE.SpotLight(0xffffff, 4);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024*4;
    spotLight.shadow.mapSize.height = 1024*4;
    scene.add(spotLight);

    directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
    scene.add( directionalLight );
    dirHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
    scene.add( dirHelper );

    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    //pointLight = new THREE.PointLight( 0xffffff, 10, 1000 );
    //pointLight.position.set( 10, 10, 10 );
    // scene.add( pointLight );

    // sphereSize = 1;
    // pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    // scene.add( pointLightHelper );

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 25, 25);

    scene.add(new THREE.AxesHelper(500));

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 3;
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.setClearColor( 0xcccccc );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.enableDamping = true;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = 1.7;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 1;
    //controls.addEventListener('change', light_update);
    document.body.appendChild(renderer.domElement);

    // textureLoader = new THREE.TextureLoader();
    // textureLoader.load('/threejs/envi-map/empty_warehouse_01_1k.hdr', function (texture) {
    //     var material = new THREE.MeshBasicMaterial();
    //     material.envMap = texture;
    // });

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('/threejs/envi-map/empty_warehouse_01_1k.hdr');

    new THREE.GLTFLoader().load('/threejs/DCPT_Gltf/DCPT.gltf', result => {
        model = result.scene.children[0];
        model.position.set(0, -10, 20);
        model.traverse(n => {
            if(n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                if(n.material.map) n.material.map.anisotropy = 16;
            }
        });
        scene.add(model);

        animate();
    });

}

// function light_update() {
//     pointLight.position.copy(camera.position);
// }

function animate() {
    requestAnimationFrame(animate);
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
    );
    renderer.render(scene, camera);
    controls.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
//light_update();