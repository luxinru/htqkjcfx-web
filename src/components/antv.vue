<template>
  <div class="antv" id="container"></div>
</template>
<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      data: {
        nodes: [
          {
            id: "1",
            name: "开始"
          },
          {
            id: "2",
            name: "（行政）审批"
          },
          {
            id: "3",
            name: "（财务）审批"
          },
          {
            id: "4",
            name: "结束"
          }
        ],
        edges: [
          {
            source: "1",
            target: "2"
          },
          {
            source: "2",
            target: "3"
          },
          {
            source: "3",
            target: "4"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      G6.registerNode(
        "sql",
        {
          drawShape(cfg, group) {
            let rect = null;
            // 加判断显示颜色，需要根据业务改
            if (cfg.id === "1") {
              rect = group.addShape("rect", {
                attrs: {
                  x: -75,
                  y: -25,
                  width: 150,
                  height: 50,
                  radius: 10,
                  stroke: "",
                  fill: "#C6E5FF",
                  lineWidth: 3
                },
                name: "rect-shape"
              });
            } else {
              rect = group.addShape("rect", {
                attrs: {
                  x: -75,
                  y: -25,
                  width: 150,
                  height: 50,
                  radius: 10,
                  stroke: "",
                  fill: "#04BEF4",
                  lineWidth: 3
                },
                name: "rect-shape"
              });
            }
            // 字体颜色
            if (cfg.name) {
              group.addShape("text", {
                attrs: {
                  text: cfg.name,
                  x: 0,
                  y: 0,
                  fill: "#00287E",
                  fontSize: 14,
                  textAlign: "center",
                  textBaseline: "middle",
                  fontWeight: "bold"
                },
                name: "text-shape"
              });
            }
            return rect;
          }
        },
        "single-node"
      );

      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        layout: {
          type: "dagre",
          nodesepFunc: d => {
            return 50;
          },
          ranksep: 20,
          controlPoints: true
        },
        defaultNode: {
          type: "sql"
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: "#C2C8D5"
          }
        },
        nodeStateStyles: {
          selected: {
            stroke: "#d9d9d9",
            fill: "#5394ef"
          }
        },
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "click-select",
            {
              type: "tooltip",
              formatText(model) {
                // const cfg = model.conf;
                // const text = [];
                // cfg.forEach(row => {
                //   text.push(row.label + ":" + row.value + "<br>");
                // });
                return "";
              },
              offset: 30
            }
          ]
        },
        fitView: true
      });
      graph.data(this.data);
      graph.render();
    }
  }
};
</script>
<style lang="scss" scoped>
.antv {
  width: 100%;
  height: 100%;
}
</style>
