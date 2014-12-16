
// revolutions per second
var angularSpeed = 0.2;
var lastTime = 0;

// this function is executed on each animation frame
function animate() {
	// update
	var time = (new Date()).getTime();
	var timeDiff = time - lastTime;
	var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
	cube.rotation.y += angleChange;
	lastTime = time;

	// render
	renderer.render(scene, camera);

	// request new frame
	requestAnimationFrame(function () {
		animate();
	});
}

// renderer
var container = document.getElementById("container");
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 700;

// scene
var scene = new THREE.Scene();

// cube (Lenght, Height, Width)
var cube = new THREE.Mesh(new THREE.CubeGeometry(400, 200, 200), new THREE.MeshNormalMaterial());
//cube.overdraw = false;
//scene.add(cube);


var Ellipsoid = createNodeGUI();

//scene.add(Ellipsoid);

var light = new THREE.PointLight();
light.position.set(300, 300, 300);
scene.add(light);


var textShape = new THREE.TextGeometry('yoyoyoyo', {size: 330, height: 150, curveSegments: 6});
var words = new THREE.Mesh(textShape, new THREE.MeshNormalMaterial());
words.position.x = -400;
words.position.y = -400;
words.position.z = -400;
scene.add(words);
// start animation
animate();



function createNodeGUI() {



	var geometry = new THREE.SphereGeometry(200, 60, 30);
	geometry.applyMatrix(new THREE.Matrix4().makeScale(1.0, 0.9, 1.0));
	var Ellipsoid = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
		color: 0x123456
	}));


	return Ellipsoid;
}

function createLight() {

}