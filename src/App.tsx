import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CubeTemplate } from "./entities/cube";

const angleCardParams = new CubeTemplate(0.5, 0.05);

const cardParams = new CubeTemplate(0.3, 0.04, angleCardParams.width);

const mainBoardParams = new CubeTemplate(
  angleCardParams.width * 2 + cardParams.width * 9,
  0.06
);

const angleCardPositions: Record<number, [number, number, number]> = {
  0: [
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
  ],
  1: [
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
  ],
  2: [
    mainBoardParams.halfWidth - angleCardParams.halfWidth,
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
  ],
  3: [
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
    mainBoardParams.halfHeight + angleCardParams.halfHeight,
    -(mainBoardParams.halfWidth - angleCardParams.halfWidth),
  ],
};

const cardTemplateArray = () => {
  const { width, height, length } = cardParams;
  return Array.from(
    { length: 9 },
    () =>
      new THREE.Mesh(
        new RoundedBoxGeometry(width, height, length, 10, 0.01),
        new THREE.MeshNormalMaterial()
      )
  );
};

const App = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = Math.max(window.innerHeight, 480);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    renderer.setClearColor(0xadadad);
    renderer.setPixelRatio(2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 2, 4);
    orbit.minPolarAngle = 0;
    orbit.maxPolarAngle = Math.PI / 2 - 0.1;
    orbit.rotateSpeed = 0.2;
    orbit.enablePan = false;
    orbit.enableZoom = true;
    orbit.maxDistance = 5;
    orbit.minDistance = 2;
    orbit.update();

    if (!mountRef.current) return;

    mountRef.current.appendChild(renderer.domElement);

    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    const monopoly = new THREE.Group();
    const rotatedGroupCard = () => new THREE.Group();

    const mainboard = new THREE.Mesh(
      new RoundedBoxGeometry(
        mainBoardParams.width + 0.2,
        mainBoardParams.height,
        mainBoardParams.length + 0.2,
        10,
        0.01
      ),
      new THREE.MeshNormalMaterial()
    );

    const startTopPositions = (i: number): [number, number, number] => [
      -mainBoardParams.halfWidth +
        angleCardParams.width +
        cardParams.halfWidth +
        i * cardParams.width,
      mainBoardParams.halfHeight + cardParams.halfHeight,
      -mainBoardParams.halfWidth + cardParams.halfLength,
    ];

    const northCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startTopPositions(i));

      return card;
    });

    const eastCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startTopPositions(i));

      return card;
    });

    const rotatedEastCardTemplateArray = rotatedGroupCard();

    eastCardTemplateArray.forEach((card) => {
      rotatedEastCardTemplateArray.add(card);
    });

    rotatedEastCardTemplateArray.rotation.set(0, -Math.PI / 2, 0);

    const startBottomPositions = (i: number): [number, number, number] => [
      -mainBoardParams.halfWidth +
        angleCardParams.width +
        cardParams.halfWidth +
        i * cardParams.width,
      mainBoardParams.halfHeight + cardParams.halfHeight,
      mainBoardParams.halfWidth - cardParams.halfLength,
    ];

    const southCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startBottomPositions(i));

      return card;
    });

    const westCardTemplateArray = cardTemplateArray().map((card, i) => {
      card.position.set(...startBottomPositions(i));

      return card;
    });

    const rotatedWestCardTemplateArray = rotatedGroupCard();

    westCardTemplateArray.forEach((card) => {
      rotatedWestCardTemplateArray.add(card);
    });

    rotatedWestCardTemplateArray.rotation.set(0, -Math.PI / 2, 0);

    const angleCardTemplateArray = Object.values(angleCardPositions).map(
      (position) => {
        const angleCardTemplate = new THREE.Mesh(
          new RoundedBoxGeometry(
            angleCardParams.width,
            angleCardParams.height,
            angleCardParams.length,
            10,
            0.01
          ),
          new THREE.MeshNormalMaterial()
        );

        angleCardTemplate.position.set(...position);

        return angleCardTemplate;
      }
    );

    mainboard.receiveShadow = true;

    monopoly.add(mainboard);

    angleCardTemplateArray.forEach((angleCardTemplate) => {
      monopoly.add(angleCardTemplate);
    });

    northCardTemplateArray.forEach((card) => {
      monopoly.add(card);
    });

    monopoly.add(rotatedEastCardTemplateArray);

    southCardTemplateArray.forEach((card) => {
      monopoly.add(card);
    });

    monopoly.add(rotatedWestCardTemplateArray);

    monopoly.position.set(0, 0, 0);

    scene.add(monopoly);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
      {/* <button onClick={addDices}></button> */}
    </div>
  );
};

export default App;

