<template>
  <div class="box">
    <div style="color: yellow;" class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>死亡</div>
        </section>
      </div>
      <div class="box-left-pie">

      </div>
    </div>
    <div class="box-center" id="box-center"></div>
    <div style="color: yellow;" class="box-right">
      <span> 点击地图查看各省市数据（数据来源于卫健委）</span>
      <table class="table" border="1" cellspacing="0">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.childrenItem">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { useGetListStore } from './stores'
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import '../src/assets/china'
import { geoCoorMap } from './assets/geoCoorMap'

const store = useGetListStore()

onMounted(async () => {
  await store.getList()
  initChart()
  initPie()
})

//右边的表格数据
const initChart = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  store.childrenItem = city[4].children //默认展示的表格

  const data = city.map(item => {
    return {
      name: item.name,
      value: geoCoorMap[item.name].concat(item.total.nowConfirm),
      children: item.children
    }
  })
  //中间的地图
  const myChart = echarts.init(document.getElementById('box-center') as HTMLElement)
  myChart.setOption({
    // backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        itemStyle: {
          areaColor: "#0f5d9d",
        }
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "single",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        // zoom: 1, //当前视角的缩放比例
        // // roam: true, //是否开启平游或缩放
        // scaleLimit: {
        //   //滚轮缩放的极限控制
        //   min: 1,
        //   max: 2,
        // },
        label: {
          show: true,//显示省份名称
          color: "#FFFFFF",
          fontSize: 14,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,//显示数据
            color: "red",
          },
        },
        data: data,
      },
      {
        // name: 'Top 5',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [45, 45],
        // symbolOffset:[0, '-40%'] ,
        label: {
          // normal: {
          show: true,
          color: '#fff',
          formatter(v: any) {
            return v.data.value[2]
          }
          // }
        },
        itemStyle: {
          // normal: {
          color: '#D8BC37', //标志颜色
          // }
        },
        data: data,
        // showEffectOn: 'render',
        // rippleEffect: {
        //   brushType: 'stroke'
        // },
        // hoverAnimation: true,
        // zlevel: 1
      },
    ],
  })

  myChart.on('click', (e: any) => {
    store.childrenItem = e.data.children
  })
}
//左边的饼状图
const initPie = () => {
  const pie = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
  pie.setOption({
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        name: '高风险地区数量',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
          }
        },
        labelLine: {
          show: true
        },
        data: store.highRiskNum.map(item => {
          return {
            name: item.city,
            value:item.highRiskAreaNum
          }
        })
      }
    ]
  })
}

</script>
  
<style lang="less">
@sectionBg: #223561;
@itemColor: #41b0db;
@itemBorder: #212028;

* {
  padding: 0;
  margin: 0;
}

.table {
  width: 100%;
  background: #212028;
  opacity: 0.8;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }

    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
}

html,
body,
#app {
  height: 100%;
}

.box {
  display: flex;
  height: 100%;
  background: url(./assets/bg.webp);
  background-repeat: no-repeat;

  &-left {
    width: 400px;

    &-pie {
      background: @sectionBg;
      height: 350px;
      margin-top: 20px;
    }

    &-card {
      display: grid;
      text-align: center;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto auto;

      section {
        background: @sectionBg;
        border: 1px solid @itemBorder;
        display: flex;
        padding: 10px;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          font-size: 20px;
          padding: 10px 0;
          font-weight: bold;
          color: @itemColor;
        }
      }
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 400px;
  }
}
</style>