// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

let distance = 10;

camera.position.set(distance, distance, 0); // set camera position
camera.lookAt(0, 0, 0); // set camera target
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Create lights
const pointLight1 = new THREE.PointLight(0xffffcc, 1);
const pointLight2 = new THREE.PointLight(0xffffcc, 1);
const pointLight3 = new THREE.PointLight(0xffffcc, 1);
const pointLight4 = new THREE.PointLight(0xffffcc, 1);
const pointLight5 = new THREE.PointLight(0xffffcc, 1);

// Position lights
pointLight1.position.set(0, distance, 0);
pointLight2.position.set(distance, distance, 0);
pointLight3.position.set(-distance, distance, 0);
pointLight4.position.set(0, distance, distance);
pointLight5.position.set(0, distance, -distance);

// Add lights to scene
scene.add(pointLight1);
scene.add(pointLight2);
scene.add(pointLight3);
scene.add(pointLight4);
scene.add(pointLight5);



var skyGeometry = new THREE.SphereGeometry(500, 100, 100)
var skyMaterial = new THREE.MeshBasicMaterial( { color: 0x7EA9FF } );
var skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
skySphere.material.side = THREE.BackSide;
scene.add(skySphere);

skyGeometry.dispose();
skyMaterial.dispose();



var planeSize = 100

// load the grass texture
var textureLoader = new THREE.TextureLoader();
var grassTexture = textureLoader.load('backimg.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(planeSize*0.025, planeSize*0.025);

grassTexture.dispose();

// create a green plane
var planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
var planeMaterial = new THREE.MeshBasicMaterial({map: grassTexture});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // rotate to lay flat on the ground
scene.add(plane);

planeGeometry.dispose();
planeMaterial.dispose();

// Create boxes
const size = 20;
const divisions = 10;
const boxSize = 0.2;
const gridX = 10;
const gridY = 10;
var boxGeometry = new THREE.BoxGeometry(boxSize, boxSize*2, 20);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x111111});

for ( let i = 0; i <= gridX; i ++ ) {
    if(i != 3 && i != 7){
        const box = new THREE.Mesh( boxGeometry, boxMaterial );
        box.position.x = i*2-10;
        box.position.z = 0;
        scene.add(box);
    }
}

boxGeometry = new THREE.BoxGeometry(20, boxSize*2, boxSize);
for ( let j = 0; j <= gridY; j ++ ) {
    if(j != 5){
        const box = new THREE.Mesh( boxGeometry, boxMaterial );
        box.position.x = 0;
        box.position.z = j*2-10;
        scene.add(box); 
    }
}

var boxGeometry2 = new THREE.BoxGeometry(boxSize, boxSize*2, 8);
for(let k = 0; k < 4; k++){
    const box = new THREE.Mesh( boxGeometry2, boxMaterial );
    switch(k){
        case 0:
            box.position.x = 4;
            box.position.z = 6;
            break;
        case 1:
            box.position.x = 4;
            box.position.z = -6;
            break;
            
        case 2:
            box.position.x = -4;
            box.position.z = 6;
            break;
        case 3:
            box.position.x = -4;
            box.position.z = -6;
    }
    
    scene.add(box);
}

var boxGeometry3 = new THREE.BoxGeometry(4, boxSize*2, boxSize);
for(var l = -1; l < 2; l++){
    const box = new THREE.Mesh( boxGeometry3, boxMaterial );
    box.position.z = 0;
    box.position.x = l*8;
    scene.add(box);
}



boxGeometry.dispose();
boxGeometry2.dispose();
boxGeometry3.dispose();
boxMaterial.dispose();

var gameState = [
    [01,02,03,04,05,06,07,08,09,10],
    [11,12,13,14,15,16,17,18,19,20],
    [21,22,23,24,25,26,27,28,29,30],
    [31,32,33,34,35,36,37,38,39,40],
    [00,00,-1,-1,00,00,-1,-1,00,00],
    [00,00,-1,-1,00,00,-1,-1,00,00],
    [00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00],
    [00,00,00,00,00,00,00,00,00,00],
                ];

                
// Load the glTF model
const loader = new THREE.GLTFLoader();
const url = "Tower.gltf";

var towerclone;
var model;
loader.load(url, (gltf) => {
    model = gltf.scene;
    //console.log(model); // Add this line to check if the model is loaded
    model.position.set(-6, 0, 16.5); // set initial position
    model.scale.set(0.06, 0.06, 0.06); // adjust model scale if necessary
    model.rotation.y = Math.PI;
    model.rotation.x = Math.PI/2;
    model.rotation.z = Math.PI;

    // Set the material color to royal blue
    model.traverse((o) => {
        if (o.isMesh) {
            o.material.color.set(0x1B3FAB);
        }
    });

    model.name = 'tower';
    //alert(model.name);

    // Event handler functions
    var clickedPiece = 0;
    var blueGroup = new THREE.Group();
    var blueSpriteGroup = new THREE.Group();
    for(var i = 0; i < 40; i++){
        towerclone = model.clone();
        towerclone.position.x += i * 2 - Math.floor(i / 10)*20;
        towerclone.position.z -= Math.floor(i / 10)*2;
        renderer.domElement.addEventListener("mousedown", onModelMouseDown);
        renderer.domElement.addEventListener("mousemove", onModelMouseMove);
        renderer.domElement.addEventListener("mouseup", onModelMouseUp);
        towerclone.id = i+1;

        let spritePath = '';
        let tempi = i+1;
        if(tempi <= 6){spritePath = 'sprites/bomb.png'}
        else if(tempi <= 7){spritePath = 'sprites/spy.png'}
        else if(tempi <= 15){spritePath = 'sprites/scout.png'}
        else if(tempi <= 20){spritePath = 'sprites/miner.png'}
        else if(tempi <= 24){spritePath = 'sprites/sergeant.png'}
        else if(tempi <= 28){spritePath = 'sprites/lieutenant.png'}
        else if(tempi <= 32){spritePath = 'sprites/captain.png'}
        else if(tempi <= 35){spritePath = 'sprites/1star.png'}
        else if(tempi <= 37){spritePath = 'sprites/3star.png'}
        else if(tempi <= 38){spritePath = 'sprites/4star.png'}
        else if(tempi <= 39){spritePath = 'sprites/marshall.png'}
        else if(tempi <= 40){spritePath = 'sprites/flag.png'}

        const map = new THREE.TextureLoader().load(spritePath);



        const material = new THREE.SpriteMaterial({map: map});
        
        const sprite = new THREE.Sprite(material);
        sprite.position.x = towerclone.position.x-3;
        sprite.position.y = 3;
        sprite.position.z = towerclone.position.z-7.5;
        sprite.scale.set(1.5,1.5,1.5);

        sprite.id = i+1;

        blueSpriteGroup.add(sprite);
        blueGroup.add(towerclone);

        var isMouseDown = false;
        const modelPosition = new THREE.Vector3();
        //let mouseDownPosition = new THREE.Vector2();
        

        var pieceX = 0;
        var pieceZ = 0;

        //alert()
        function onModelMouseDown(event) {
            //alert()
            isMouseDown = false;
            // Check if the mouse is over the tower
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(blueGroup, true);
            if (intersects.length > 0) {
                clickedPiece = ((intersects[0].object.id-((blueSpriteGroup.children[0].id)-1)) / 3);
                isMouseDown = true;
                pieceX = blueGroup.children[clickedPiece].position.x;
                pieceZ = blueGroup.children[clickedPiece].position.z;
                //alert()
            }
            else{
                //alert()
            }
            //alert()
            
        }

        function onModelMouseMove(event) {
            //alert()
            if (isMouseDown) {
                // Get the new position of the model
                const newPosition = new THREE.Vector3(
                    event.clientX / window.innerWidth * 2 - 1,
                    -(event.clientY / window.innerHeight) * 2 + 1,
                    0
                );
                newPosition.unproject(camera);
                const direction = newPosition.sub(camera.position).normalize();
                const distance = -camera.position.y / direction.y;
                modelPosition.copy(camera.position).add(direction.multiplyScalar(distance));
                blueGroup.children[clickedPiece].position.copy(modelPosition);
                
                blueGroup.children[clickedPiece].position.x += 3;
                blueGroup.children[clickedPiece].position.z += 7.5;
                blueSpriteGroup.children[clickedPiece].position.x = blueGroup.children[clickedPiece].position.x;
                blueSpriteGroup.children[clickedPiece].position.z = blueGroup.children[clickedPiece].position.z;
                blueSpriteGroup.children[clickedPiece].position.x -= 3;
                blueSpriteGroup.children[clickedPiece].position.z -= 7.5;
            }
        }

        function onModelMouseUp() {
            if (isMouseDown) {
                if(blueGroup.children[clickedPiece].position.x < -6){
                    blueGroup.children[clickedPiece].position.x = -6;
                }
                else if(blueGroup.children[clickedPiece].position.x > 12){
                    blueGroup.children[clickedPiece].position.x = 12;
                }
                if(blueGroup.children[clickedPiece].position.z < -1.5){
                    blueGroup.children[clickedPiece].position.z = -1.5;
                }
                else if(blueGroup.children[clickedPiece].position.z > 16.5){
                    blueGroup.children[clickedPiece].position.z = 16.5
                }

                //if(model.position.z)

                // Snap tower to nearest grid cell
                const gridSize = size / divisions;
                modelPosition.x = Math.round(blueGroup.children[clickedPiece].position.x / gridSize) * gridSize;
                modelPosition.y = 0;
                modelPosition.z = Math.round(blueGroup.children[clickedPiece].position.z / gridSize) * gridSize;

                blueGroup.children[clickedPiece].position.copy(modelPosition);

                blueGroup.children[clickedPiece].position.z += 0.5;

                //alert('a')
                isMouseDown = false;
                //alert(model.position.z)
                let tempX = (blueGroup.children[clickedPiece].position.x+6)/2
                let tempZ = (((blueGroup.children[clickedPiece].position.z)-16.5)/2)*-1

                let oldX = (pieceX+6)/2;
                let oldZ = (((pieceZ)-16.5)/2)*-1;
                //alert(tempX+', '+tempZ);

                let trueId = ((blueGroup.children[clickedPiece].id-((blueSpriteGroup.children[0].id)-1)) / 2);
                trueId += 2;
                trueId /= 1.5;
                //gameState[tempZ][tempX] = trueId;
                //alert(gameState[tempZ][tempX]);

                
                if(gameState[tempZ][tempX] == 0){
                    gameState[tempZ][tempX] = trueId;
                    gameState[oldZ][oldX] = 00;
                }
                else{
                    blueGroup.children[clickedPiece].position.x = pieceX;
                    blueGroup.children[clickedPiece].position.z = pieceZ;
                }
                blueSpriteGroup.children[clickedPiece].position.x = blueGroup.children[clickedPiece].position.x;
                blueSpriteGroup.children[clickedPiece].position.z = blueGroup.children[clickedPiece].position.z;
                blueSpriteGroup.children[clickedPiece].position.x -= 3;
                blueSpriteGroup.children[clickedPiece].position.z -= 7.5;
            }
            isMouseDown = false;
        }
    }
    scene.add(blueGroup);
    scene.add(blueSpriteGroup);
});


const geometry = new THREE.CylinderGeometry( 1.5, 1.5, 0.1, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0x0095aa} );
const cylinder = new THREE.Mesh(geometry, material);
for(let i = 0; i < 6; i++){
    let cylinderClone = cylinder.clone();
    let xPos = 0;
    let zPos = 0;

    switch(i){
        case 0:
            xPos = 4.5;
            zPos = -0.5;
            break;
        case 1:
            xPos = 4;
            zPos = 0.5;
            break;
        case 2:
            xPos = 3;
            zPos = -0.345;
            break;
        case 3:
            xPos = -4.5;
            zPos = -0.345;
            break;
        case 4:
            xPos = -4.63;
            zPos = 0.456;
            break;
        case 5:
            xPos = -3.56;
            zPos = -0.5;
            break;
    }

    cylinderClone.position.x = xPos;
    cylinderClone.position.z = zPos;

    scene.add(cylinderClone);
}






var leafTexture = textureLoader.load('leaf_texture.jpg');
leafTexture.wrapS = THREE.RepeatWrapping;
leafTexture.wrapT = THREE.RepeatWrapping;
leafTexture.repeat.set(5,5);
var bushGeometry = new THREE.SphereGeometry(10, 100, 100)
var bushMaterial = new THREE.MeshBasicMaterial( { map: leafTexture } );
var bushSphere = new THREE.Mesh(bushGeometry, bushMaterial);

var bushRadius = 50;
var bushAngle = 0;
var bushNum = 30;

for(var i = 0; i < bushNum; i++){
    bushAngle += 360/bushNum;
    var bushclone = bushSphere.clone();
    bushclone.position.x = Math.cos(bushAngle*(Math.PI/180))*bushRadius;
    bushclone.position.y = 2;
    bushclone.position.z = Math.sin(bushAngle*(Math.PI/180))*bushRadius;
    bushclone.position.x += Math.random()*6 - 3;
    bushclone.position.y += Math.random()*6 - 3;
    bushclone.position.z += Math.random()*6 - 3;
    bushclone.rotation.y += Math.random()*10

    scene.add(bushclone)
}

bushGeometry.dispose();
bushMaterial.dispose();
leafTexture.dispose();              

var cloudGeometry = new THREE.SphereGeometry(15, 8, 8)
var cloudMaterial = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
var cloudSphere = new THREE.Mesh(cloudGeometry, cloudMaterial);

var cloudGroupNum = 10;
for(var i = 0; i < cloudGroupNum; i++){
    var cloudClone1 = cloudSphere.clone();
    var cloudClone2 = cloudSphere.clone();
    var cloudClone3 = cloudSphere.clone();
    var cloudClone4 = cloudSphere.clone();

    var x = (Math.random()-0.5)*600
    var z = (Math.random()-0.5)*600
    var y = 70 + (Math.random()-0.5)*20

    cloudClone1.position.set(x,y,z);
    cloudClone2.position.set(x+Math.random()*14,y+Math.random()*14,z+Math.random()*14)
    cloudClone3.position.set(x-Math.random()*14,y - Math.random()*14,z-Math.random()*14)
    cloudClone4.position.set(x+Math.random()*14,y,z-Math.random()*14)
    
    cloudGroup = new THREE.Group();

    cloudGroup.add(cloudClone1);
    cloudGroup.add(cloudClone2);
    cloudGroup.add(cloudClone3);
    cloudGroup.add(cloudClone4);

    scene.add(cloudGroup);
    //cloudClone.dispose();
}

bushGeometry.dispose();
bushMaterial.dispose();
leafTexture.dispose();              


// Render the scene
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

let reverse = 1;
var keys = {};
document.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true;
}, false);
document.addEventListener('keyup', function(event) {
    keys[event.keyCode] = false;
}, false);

var radius = 10;
var angle = 0;
var height = 10;
var speed = 1;

// render the scene and update the camera based on user input
function animate() {
    requestAnimationFrame(animate);
    
    camera.lookAt(0,0,0);

    function moveCam(){
        camera.position.set((Math.cos(angle*(Math.PI/180))*radius), height, (Math.sin(angle*(Math.PI/180))*radius))
    }

    // update camera position
    if (keys[87]) { // W key
        if(radius > 1*speed){
            radius -= 0.4*speed;
        }
        moveCam();
    }
    if (keys[83]) { // S key
        if(radius < 40){
            radius += 0.4*speed;
        }
        moveCam();
    }
    if (keys[65]) { // A key
        angle += 1*speed;
        moveCam();
    }
    if (keys[68]) { // D key
        angle -= 1*speed;
        moveCam();
    }
    if (keys[38]) { // Up key
        if(height < 400){
            height += 0.3*speed;
            moveCam();
        }
    }
    if (keys[40]) { // Down key
        if(height > 1*speed){
            height -= 0.3*speed;
            moveCam();
        }
    }
    if (keys[16]) { // Shift key
        speed = 5;
    }
    else{
        speed = 1;
    }

    renderer.render(scene, camera);
}
animate();