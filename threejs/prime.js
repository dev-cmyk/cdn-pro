var container, controls;
var camera, scene, renderer;
var model;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 25, 25);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);

    directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemiLight);

    spotLight = new THREE.SpotLight(0xffffff, 2.5);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 1024*4;
    spotLight.shadow.mapSize.height = 1024*4;
    scene.add(spotLight);

    new THREE.RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .setPath('/threejs/envi-map/')
        .load('empty_warehouse_01_1k.hdr', function (texture) {

            var envMap = pmremGenerator.fromEquirectangular(texture).texture;

            //scene.background = envMap;
            scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            animate();
            
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
            });

        });

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.enableDamping = true;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = 1.7;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 1;

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    animate();

}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
    );
    controls.update();
}