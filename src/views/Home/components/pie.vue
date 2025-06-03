<template>
  <div ref="container" class="pie-container"></div>
</template>

<script>
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "Pie",
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // 获取容器尺寸
      const container = this.$refs.container;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 数据和配色
      const data = [44, 23, 18, 14];
      const colors = [0x338aff, 0xff4b5c, 0xffa534, 0x2ecc71];
      const labels = ["44%", "23%", "18%", "14%"];
      const radius = Math.min(width, height) * 0.35; // 增大饼图比例
      const thickness = radius * 0.3;
      const explode = [0.08, 0.12, 0.1, 0.06]; // 分块偏移

      // 场景
      const scene = new THREE.Scene();

      // 相机
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.set(0, radius * 1.5, radius * 2.5); // 根据半径调整相机位置
      camera.lookAt(0, 0, 0);

      // 渲染器（透明背景）
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;

      // 添加轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // 添加阻尼效果
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = radius * 2;
      controls.maxDistance = radius * 4;
      controls.maxPolarAngle = Math.PI / 2;

      // 光源
      const light = new THREE.DirectionalLight(0xffffff, 1.1);
      light.position.set(100, 200, 200);
      light.castShadow = true;
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.45));

      // 饼图绘制
      let startAngle = 0;
      const total = data.reduce((a, b) => a + b, 0);
      for (let i = 0; i < data.length; i++) {
        const value = data[i];
        const angle = (value / total) * Math.PI * 2;
        const endAngle = startAngle + angle;
        // 分块偏移
        const midAngle = startAngle + angle / 2;
        const x = Math.cos(midAngle) * explode[i] * radius;
        const z = Math.sin(midAngle) * explode[i] * radius;
        // 扇形几何体
        const shape = new THREE.Shape();
        shape.absarc(0, 0, radius, startAngle, endAngle, false);
        shape.lineTo(0, 0);
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: thickness,
          bevelEnabled: false
        });
        geometry.rotateX(-Math.PI / 2);
        geometry.translate(x, -thickness / 2, z);
        // 材质
        const material = new THREE.MeshPhongMaterial({
          color: colors[i],
          shininess: 80,
          specular: 0xffffff
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        // 文字标签
        const loader = new FontLoader();
        loader.load(
          "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/fonts/helvetiker_bold.typeface.json",
          font => {
            const textGeo = new TextGeometry(labels[i], {
              font: font,
              size: radius * 0.15, // 根据半径调整文字大小
              height: 4,
              curveSegments: 8,
              bevelEnabled: true,
              bevelThickness: 1,
              bevelSize: 1,
              bevelSegments: 2
            });
            textGeo.center();
            const textMaterial = new THREE.MeshPhongMaterial({
              color: 0xffffff
            });
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            // 文字放在每个扇区的中间上方
            const tx =
              Math.cos(midAngle) * (radius * 0.7 + explode[i] * radius);
            const tz =
              Math.sin(midAngle) * (radius * 0.7 + explode[i] * radius);
            textMesh.position.set(tx, thickness / 2 + 10, tz);
            textMesh.castShadow = true;
            scene.add(textMesh);
          }
        );
        startAngle = endAngle;
      }

      // 渲染到页面
      this.$refs.container.innerHTML = "";
      this.$refs.container.appendChild(renderer.domElement);

      // 动画
      function animate() {
        requestAnimationFrame(animate);
        controls.update(); // 更新控制器
        renderer.render(scene, camera);
      }
      animate();

      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pie-container {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
