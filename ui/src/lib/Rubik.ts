import * as THREE from 'three';
import { roundRect } from "./CanvasExtensions";

// whether side i (0 to 5 of BoxGeometry) is a side pointing outward
// for a cube in position [x,y,z]
function showSide(i: number, x: number, y: number, z: number) {
    return i === 0 ? x === 1 :
        i === 1 ? x === -1 :
            i === 2 ? y === 1 :
                i === 3 ? y === -1 :
                    i === 4 ? z === 1 :
                        z === -1;
}

class Rubik {
    private size = 5; // the size of one cube
    private coOrdinates: Array<number> = [];
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private cubeGroup: THREE.Group = new THREE.Group();
    private choosenGroup: THREE.Group = new THREE.Group();
    private placeHolderGroup: Array<THREE.Mesh> = [];
    private rotationAxis = new THREE.Vector3(0, 0, 1); // Add this line
    private currentDirectionIndex = 0; // this is the index of coOrdinates array. it will start with -ve value till the length of the array and loop again;
    private raycaster = new THREE.Raycaster();
    private rotationDirections = ['horizontal', 'vertical', 'cross'];
    private rotationAngle: number = 0.5 * Math.PI; // 360 degrees in radians
    private accumulatedRotation: number = 0;
    private sides: Array<THREE.MeshLambertMaterial> = [];
    private blackSide: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial();

    constructor(cubeCount: number = 3) {
        const canvas = document.getElementById('rubikCubeCanvas') as HTMLCanvasElement;
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientWidth, 0.1, 1000);

        this.setupCube(cubeCount);
        this.setupRenderer(canvas.clientWidth, canvas.clientWidth);
        this.setupEnvironment();
        this.createSides();
        this.init()
    }

    private async init(): Promise<void> {
        await this.switchAxis();
        this.animate();
    }

    private setupCube(cubeCount: number): void {
        const quotient = Math.floor(cubeCount / 2);
        const reminder = cubeCount % 2;

        if (cubeCount >= 3 && cubeCount <= 9 && reminder === 1) {
            for (let x = -1 * quotient; x <= quotient; x++) {
                this.coOrdinates.push(x)
            }
        } else {
            throw new Error("cube size should be an ODD number like 3(min), 5, 7 until max 9");
        }
    }

    private setupEnvironment() {
        // const directionalLight = new THREE.DirectionalLight("#606060");
        // directionalLight.position.set(-25, 30, 25);
    
        // // Add a point light behind the cube
        // const pointLight = new THREE.PointLight(0xff0000, 1, 100, 20);
        
    
        // this.scene.add(directionalLight);
        // this.scene.add(pointLight); // Add the point light to the scene
        this.scene.add(new THREE.HemisphereLight(0xffffff));

        // Add the gradient sphere
        // const gradientSphere = this.createGradientSphere();
        // if(gradientSphere) {
        //     gradientSphere.position.copy(pointLight.position);
        //     this.scene.add(gradientSphere); // Add the gradient sphere to the scene
        // }
    
        this.camera.position.x = -15;
        this.camera.position.y = 20;
        this.camera.position.z = 15;
        this.camera.lookAt(this.scene.position);
        // pointLight.position.copy(this.camera.position) // (-10, -20, -30);
    }
    
    
    private createGradientSphere() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
    
        if (ctx) {
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
    
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
    
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(60, 60, 1);
            return sprite;
        }
    }    

    private setupRenderer(width: number, height: number) {
        this.renderer.setClearColor(new THREE.Color(0x000000), 0); // Add the second parameter (alpha) with a value of 0 for transparency
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
    }
    
    private async createSides(): Promise<void> {
        const borderSize = 0.02;
        const borderRadius = 0.1;

        const colors = [
            0x0000ff, // blue
            0x00ff00, // green
            0xffffff, // white
            0xffff00, // yellow
            0xff0000, // red
            0xffa500  // orange
        ];

        const textures = await this.createTextureFromCanvas2D(colors, borderSize, borderRadius);

        this.sides = textures.map((texture) => {
            return new THREE.MeshLambertMaterial({
                map: texture,
                side: THREE.DoubleSide,
            });
        });

        this.blackSide = new THREE.MeshLambertMaterial({
            color: 0x000000,
            side: THREE.DoubleSide
        });

        this.createCubes(this.sides);
    }

    private async createTextureFromCanvas2D(colors: number[], borderSize: number, borderRadius: number) {
        const texturePromises = colors.map((color) => {
            return new Promise<THREE.Texture>((resolve) => {
                const canvas = document.createElement("canvas");
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext("2d");

                if (ctx) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = new THREE.Color(color).getStyle();
                    roundRect(
                        ctx,
                        canvas.width * borderSize,
                        canvas.height * borderSize,
                        canvas.width * (1 - 2 * borderSize),
                        canvas.height * (1 - 2 * borderSize),
                        canvas.width * borderRadius
                    );
                    ctx.fill();

                    const texture = new THREE.Texture(canvas);
                    texture.needsUpdate = true;
                    resolve(texture);
                }
            });
        });

        const textures = await Promise.all(texturePromises);
        return textures;
    }

    private createCubes(sides: Array<THREE.MeshLambertMaterial>): void {
        const cubeGeometry = new THREE.BoxGeometry(0.98 * this.size, 0.98 * this.size, 0.98 * this.size);

        for (const x of this.coOrdinates) {
            for (const y of this.coOrdinates) {
                for (const z of this.coOrdinates) {
                    const materials = [];
                    for (let i = 0; i < 6; i++) {
                        materials.push(showSide(i, x, y, z) ? sides[i] : this.blackSide);
                        // materials.push(sides[i]);
                    }
                    const cubeMesh = new THREE.Mesh(cubeGeometry, materials);
                    cubeMesh.position.x = this.size * x;
                    cubeMesh.position.y = this.size * y;
                    cubeMesh.position.z = this.size * z;
                    cubeMesh.userData.coords = new THREE.Vector3(x, y, z);

                    if (this.coOrdinates[0] === x) { // default is horizontal
                        this.choosenGroup.add(cubeMesh);
                    } else {
                        this.cubeGroup.add(cubeMesh)
                    }
                    this.placeHolderGroup.push(cubeMesh);
                }
            }
        }
        this.scene.add(this.cubeGroup);
        this.scene.add(this.choosenGroup);
        console.log("scene", this.scene, this.coOrdinates);
    }

    private async switchAxis(): Promise<void> {
        const choosenCoordinate = this.coOrdinates[Math.floor(Math.random() * this.coOrdinates.length)] as number;

        await this.resetCubes();

        if (this.currentDirectionIndex === 0) {
            const cur = this.rotationDirections.shift();
            let axis: THREE.Vector3;

            switch (cur) {
                case "horizontal":
                    axis = new THREE.Vector3(1, 0, 0)
                    break;
                case "vertical":
                    axis = new THREE.Vector3(0, 1, 0)
                    break;
                case "cross":
                default:
                    axis = new THREE.Vector3(0, 0, 1)
                    break;
            }
            this.rotationAxis = axis;
            this.rotationDirections.push(cur as string);
        }

        const direction = this.rotationDirections[this.rotationDirections.length - 1];

        for (const cube of this.placeHolderGroup as THREE.Mesh[]) {
            let choosen = false
            // console.log(direction, chhoseCoordinate * this.size, cube.position)

            switch (direction) {
                case "horizontal":
                    choosen = Math.floor(cube.position.x) === choosenCoordinate * this.size;
                    break;
                case "vertical":
                    choosen = Math.floor(cube.position.y) === choosenCoordinate * this.size;
                    break;
                case "cross":
                default:
                    choosen = Math.floor(cube.position.z) === choosenCoordinate * this.size;
                    break;
            }

            const clonedCube = cube.clone();

            if (choosen) {
                await new Promise(resolve => {
                    this.choosenGroup.add(clonedCube);
                    resolve(null);
                });
            } else {
                await new Promise(resolve => {
                    this.cubeGroup.add(clonedCube);
                    resolve(null);
                });
            }
        }
    }

    private updatePlaceHolderGroup() {
        // Loop through the placeHolderGroup
        for (const updatedCube of this.choosenGroup.children as THREE.Mesh[]) {

            const cube = this.placeHolderGroup.filter((c) => c.userData.coords.x === updatedCube.userData.coords.x && c.userData.coords.y === updatedCube.userData.coords.y && c.userData.coords.z === updatedCube.userData.coords.z).at(0) as unknown as THREE.Mesh;
            // Update the positions of the cubes based on the rotation axis and chosen coordinates
            const newPosition = cube.position.clone().applyAxisAngle(this.rotationAxis, this.rotationAngle);
            const x = Math.floor(newPosition.x);
            const y = Math.floor(newPosition.y);
            const z = Math.floor(newPosition.z);

            newPosition.x = (x > 5) ? 5 : (x < -5) ? -5 : (x === -1 || x === 1) ? 0 : x;
            newPosition.y = (y > 5) ? 5 : (y < -5) ? -5 : (y === -1 || y === 1) ? 0 : y;
            newPosition.z = (z > 5) ? 5 : (z < -5) ? -5 : (z === -1 || z === 1) ? 0 : z;
            // console.log("floor", newPosition);
            cube.position.copy(newPosition);
            // cube.setRotationFromAxisAngle(this.rotationAxis, this.rotationAngle);
            cube.rotateOnWorldAxis(this.rotationAxis, this.rotationAngle);
        }
    }

    private async resetCubes(): Promise<void> {
        this.choosenGroup.clear();
        this.cubeGroup.clear();

        this.choosenGroup.rotation.x = 0;
        this.choosenGroup.rotation.y = 0;
        this.choosenGroup.rotation.z = 0;
    }

    private async animate(): Promise<void> {
        const angle = 0.02; // Angle of rotation in radians

        this.choosenGroup.rotateOnWorldAxis(this.rotationAxis, angle);
        this.accumulatedRotation += angle;
        this.renderer.render(this.scene, this.camera);

        // it's time to reset the axis.
        if (this.accumulatedRotation >= this.rotationAngle) {
            this.accumulatedRotation = 0; // Reset the accumulated rotation
            // Call the updatePlaceHolderGroup function at the end of the switchAxis method
            this.updatePlaceHolderGroup();
            await this.switchAxis();
            this.renderer.render(this.scene, this.camera);
        }
        requestAnimationFrame(async () => {
            await this.animate()
        });

    }
}

export default Rubik;