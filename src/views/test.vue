<template>
  <div class="container">
    <div class="char">
      <charts charType="pie" :charData="pieChar"></charts>
    </div>
    <div class="char">
      <charts charType="pieFly" :charData="pieChar"></charts>
    </div>
    <div class="char">
      <charts charType="radar" :charData="pieChar"></charts>
    </div>
    <div class="char">
      <charts charType="char3d" :charData="pieChar"></charts>
    </div>
    <div class="char">
      <charts charType="line" :charData="lineChar"></charts>
    </div>
    <div class="char">
      <charts charType="bar" :charData="lineChar"></charts>
    </div>
    <div class="char">
      <charts charType="bar3D" :charData="lineChar"></charts>
    </div>
    <div class="char">
      <charts charType="gauge" :charData="lineChar"></charts>
    </div>
    <div class="char1">
      <charts charType="map" :charData="mapChar"></charts>
    </div>
    <div class="char1">
      <antv></antv>
    </div>
    <div class="char1">
      <charts charType="time" :charData="timeChar"></charts>
    </div>
    <div class="char1">
      <charts charType="funnel" :charData="timeChar"></charts>
    </div>
    <!-- <div class="char1">
      <charts charType="ydxqLine" :charData="timeChar"></charts>
    </div> -->
  </div>
</template>

<script>
import Charts from "@/components/echarts/index.vue";
import Antv from "../components/antv.vue";
export default {
  components: { Charts, Antv },
  name: "test",
  data() {
    return {
      pieChar: [
        {
          name: "测试1",
          value: 100
        },
        {
          name: "测试2",
          value: 200
        },
        {
          name: "测试3",
          value: 150
        }
        // {
        //   name: '测试4',
        //   value: 120
        // },
        // {
        //   name: '测试5',
        //   value: 80
        // }
      ],
      lineChar: [
        {
          name: "2018",
          value: 100
        },
        {
          name: "2019",
          value: 150
        },
        {
          name: "2020",
          value: 300
        },
        {
          name: "2021",
          value: 180
        },
        {
          name: "2022",
          value: 70
        }
      ],
      mapChar: [
        { name: "河北", value: 500 },
        { name: "山西", value: 400 },
        { name: "内蒙古", value: 300 },
        { name: "辽宁", value: 200 },
        { name: "吉林", value: 100 },
        { name: "黑龙江", value: 600 }
      ],
      timeChar: [
        {
          name: "军需保障运输阶段",
          value: [
            ["2023-11-08", "2023-11-12"],
            ["2023-11-15", "2023-11-20"]
          ]
        },
        {
          name: "军需保障筹措阶段",
          value: [["2023-11-08", "2023-11-12"]]
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: #013668;
}
.char {
  width: 300px;
  height: 300px;
  float: left;
  border: 1px solid #ddd;
  margin: 10px;
}
.char1 {
  width: 600px;
  height: 600px;
  float: left;
  border: 1px solid #ddd;
  margin: 10px;
}
</style>
