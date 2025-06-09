<template>
  <div class="org_tree">
    <div class="search">
      <div class="input">
        <input type="text" placeholder="请输入单位名称" />
      </div>
      <img src="@/assets/img/contract/search.png" alt="" />
    </div>

    <section class="tree"></section>
  </div>
</template>

<script>
export default {
  name: "OrgTree",

  data() {
    return {
      orgList: [
        {
          name: "同方股份有限公司",
          id: 1,
          children: [
            {
              name: "核技术应用",
              id: 2,
              children: [
                {
                  name: "同方威视",
                  id: 3
                },
                {
                  name: "核医疗",
                  id: 4
                }
              ]
            },
            {
              name: "数字信息",
              id: 5,
              children: [
                {
                  name: "同方数科",
                  id: 6,
                  children: [
                    {
                      name: "同方知网(合并)",
                      id: 7
                    },
                    {
                      name: "北京同方光盘股份有限公司",
                      id: 8
                    },
                    {
                      name: "同方软件(合并)",
                      id: 9
                    },
                    {
                      name: "同方赛威讯信息技术有限公司",
                      id: 10
                    }
                  ]
                }
              ]
            },
            {
              name: "智慧能源",
              id: 11,
              children: [
                {
                  name: "同方能源(含光电环境)",
                  id: 12
                }
              ]
            },
            {
              name: "中核医疗",
              id: 13
            },
            {
              name: "其他",
              id: 14,
              children: [
                {
                  name: "同方科创",
                  id: 15
                },
                {
                  name: "同方工业",
                  id: 16
                },
                {
                  name: "同方友友",
                  id: 17
                },
                {
                  name: "同方科技园",
                  id: 18
                },
                {
                  name: "中核深圳",
                  id: 19
                },
                {
                  name: "同方物业",
                  id: 20
                }
              ]
            },
            {
              name: "退出类",
              id: 21,
              children: [
                {
                  name: "壹人壹本",
                  id: 22
                },
                {
                  name: "多媒体",
                  id: 23
                }
              ]
            }
          ]
        }
      ]
    };
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.org_tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .search {
    width: 100%;
    height: 34px;
    background: rgba(0, 80, 144, 0.2);
    border: 1px solid #0069ca;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .input {
      flex: 1 0;
      height: 100%;

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-weight: normal;
        font-size: 16px;
        color: #fff;

        &::placeholder {
          color: #0069ca !important;
        }
      }
    }

    img {
      width: 16px;
      height: 16px;
    }
  }

  .tree {
    width: 100%;
    flex: 1 0;
    overflow: auto;
  }
}
</style>
