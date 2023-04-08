import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js';

// Include the CSS3DRenderer script
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
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

type coords = {
    x: number;
    y: number;
    z: number;
}

class Rubik {
    private size = 5; // the size of one cube
    private coOrdinates: Array<number> = [];
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera;
    // private camera: THREE.OrthographicCamera;
    private renderer: THREE.WebGLRenderer;
    private cubeGroup: THREE.Group = new THREE.Group();
    private choosenGroup: THREE.Group = new THREE.Group();
    private rubikGroup: THREE.Group = new THREE.Group();
    private placeHolderGroup: Array<THREE.Mesh> = [];
    private rotationAxis = new THREE.Vector3(0, 0, 1); // Add this line
    private currentDirectionIndex = 0; // this is the index of coOrdinates array. it will start with -ve value till the length of the array and loop again;
    private rotationDirections = ['horizontal', 'vertical', 'cross'];
    private rotationAngle: number = 0.5 * Math.PI; // 360 degrees in radians
    private accumulatedRotation: number = 0;
    private sides: Array<THREE.MeshLambertMaterial> = [];
    private blackSide: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial();
    // private controls: OrbitControls;
    private cssRenderer;
    private cssScene: THREE.Scene = new THREE.Scene();
    private cssTitle: CSS3DObject;
    private cssCanvas: CSS3DObject;
    private cssCamera: THREE.PerspectiveCamera;
    private canvas: HTMLCanvasElement;
    private titleTween: TWEEN.Tween<coords> | null = null;
    private canvasTween: TWEEN.Tween<coords> | null = null;
    private titleBeforeScrollPosition: coords = { x: 120, y: 0, z: -480 };
    private canvasBeforeScrollPosition: coords = { x: -260, y: 0, z: -960 };
    private titleAfterScrollPosition: coords = { x: -240, y: -140, z: -720 };
    private canvasAfterScrollPosition: coords = { x: -340, y: 200, z: -960 };

    constructor(rubikCubeCanvas: HTMLCanvasElement, cssCanvas: HTMLDivElement, titleHolder: HTMLDivElement, canvasHolder: HTMLDivElement, cubeCount: number = 3) {
        this.canvas = rubikCubeCanvas;
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.cssRenderer = new CSS3DRenderer({ element: cssCanvas })
        this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.cssCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        this.cssTitle = new CSS3DObject(titleHolder);
        this.cssCanvas = new CSS3DObject(canvasHolder);

        this.setupCube(cubeCount);
        this.setupRenderer(window.innerWidth, window.innerHeight);
        this.createSides();
        // this.createTitlePlaneFromCanvas2D();
        this.setupEnvironment();
        this.setupTitleRenderer();
        this.onWindowResize()
        this.init()
    }

    private async init(): Promise<void> {
        await this.switchAxis();
        this.animate(0);
    }

    private setupTitleRenderer() {
        // before scroll
        this.cssTitle.position.set(
            this.titleBeforeScrollPosition.x,
            this.titleBeforeScrollPosition.y,
            this.titleBeforeScrollPosition.z
        );
        this.cssCanvas.position.set(
            this.canvasBeforeScrollPosition.x,
            this.canvasBeforeScrollPosition.y,
            this.canvasBeforeScrollPosition.z
        );

        // after scroll
        // this.cssTitle.position.set(-240, -140, -720);
        // this.cssCanvas.position.set(-340, 200, -960);

        this.cssScene.add(this.cssTitle);
        this.cssScene.add(this.cssCanvas);
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
        this.scene.add(new THREE.HemisphereLight(0xffffff));

        // Create an AxesHelper with a size of 5 units
        const axesHelper = new THREE.AxesHelper(5);

        // Add the AxesHelper to your scene
        this.scene.add(axesHelper);

        // Create a GridHelper
        const gridSize = 50;
        const gridDivisions = 10;
        const gridColor = 0xAAAAAA;
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColor);

        // Add the GridHelper to the scene
        this.cssScene.add(gridHelper);

        this.camera.position.x = -20;
        this.camera.position.y = 20;
        this.camera.position.z = 20;

        this.cssCamera.position.x = 0;
        this.cssCamera.position.y = 0;
        this.cssCamera.position.z = 60;

        this.camera.matrixAutoUpdate = true
        // this.camera.lookAt(this.scene. position);
        // this.cssScene. (this.scene.position)
        // this.cssScene.position.set(
        //     this.scene.position.x,
        //     this.scene.position.y,
        //     this.scene.position.z
        // );
        this.camera.lookAt(this.scene.position);
        this.cssCamera.lookAt(this.cssScene.position);
        // this.camera.lookAt(this.rotationAxis);
        // this.camera.lookAt(new THREE.Vector3(0, 0, -60));
    }

    private setupRenderer(width: number, height: number) {
        this.renderer.setClearColor(new THREE.Color(0x000000), 0); // Add the second parameter (alpha) with a value of 0 for transparency
        this.renderer.setSize(480, 480);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
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
        this.rubikGroup.add(this.cubeGroup);
        this.rubikGroup.add(this.choosenGroup);

        this.rubikGroup.position.set(0, 0, 0); // Change the x position to -15
        // this.rubikGroup.rotateY(-0.25 * Math.PI)
        // this.rubikGroup.rotateZ(0.25 * Math.PI)
        // this.rubikGroup.rotateY(0.20 * Math.PI)
        this.scene.add(this.rubikGroup);
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

    private async animate(time: number): Promise<void> {
        const angle = 0.02; // Angle of rotation in radians

        this.choosenGroup.rotateOnWorldAxis(this.rotationAxis, angle);
        this.accumulatedRotation += angle;

        // this.cssTitle.rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.002)
        // this.cssTitle.position.x += 1 * Math.cos(0.00002);
        // this.cssTitle.position.z += 1 * Math.sin(0.00002);

        this.renderer.render(this.scene, this.camera);
        this.cssRenderer.render(this.cssScene, this.cssCamera);

        // this.titleTween?.update(time);
        // this.canvasTween?.update(time);
        TWEEN.update(time);

        // it's time to reset the axis.
        if (this.accumulatedRotation >= this.rotationAngle) {
            this.accumulatedRotation = 0; // Reset the accumulated rotation
            // Call the updatePlaceHolderGroup function at the end of the switchAxis method
            this.updatePlaceHolderGroup();
            await this.switchAxis();
            this.renderer.render(this.scene, this.camera);
        }
        requestAnimationFrame(async (time2) => {

            await this.animate(time2)
        });

    }

    moveCameraFront() {
        this.camera.position.set(
            this.camera.position.x - 2.5,
            this.camera.position.y + 2.5,
            this.camera.position.z + 5
        );
        this.camera.updateProjectionMatrix()
        console.log("called as well...")
    }
    moveCameraBack() {
        this.camera.position.set(
            this.camera.position.x + 2.5,
            this.camera.position.y - 2.5,
            this.camera.position.z - 5
        );
        this.camera.updateProjectionMatrix()
        console.log("called...")
    }

    onWindowResize() {
        let w = Math.floor(window.innerWidth);
        w = w > 480 ? 480 : w;
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${w}px`;
        // const aspectRatio = 1;
        // this.camera.aspect = aspectRatio;
        // this.camera.updateProjectionMatrix();
        this.cssCamera.updateProjectionMatrix();

        this.renderer.setSize(w, w);
        this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    }

    updatePosition(obj: CSS3DObject, startPosition: coords, endPosition: coords, easeIn: boolean = true, duration: number = 1000) {
        return new TWEEN.Tween(startPosition)
            .to(endPosition, duration)
            .easing(easeIn ? TWEEN.Easing.Sinusoidal.In : TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(() => {
                obj.position.set(startPosition.x, startPosition.y, startPosition.z);
            })
    }

    updateScrollDown() {
        this.titleTween = this.updatePosition(this.cssTitle, { ...this.titleBeforeScrollPosition }, { ...this.titleAfterScrollPosition });
        this.canvasTween = this.updatePosition(this.cssCanvas, { ...this.canvasBeforeScrollPosition }, { ...this.canvasAfterScrollPosition });
        this.canvasTween.chain(this.titleTween)
        .start();
    }

    updateScrollUp() {
        this.titleTween = this.updatePosition(this.cssTitle, { ...this.titleAfterScrollPosition }, { ...this.titleBeforeScrollPosition }, false);
        this.canvasTween = this.updatePosition(this.cssCanvas, { ...this.canvasAfterScrollPosition }, { ...this.canvasBeforeScrollPosition }, false);
        this.titleTween.chain(this.canvasTween)
        .start();
    }

}

export default Rubik;