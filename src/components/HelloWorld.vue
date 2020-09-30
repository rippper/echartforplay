<template>
  <div class="hello">
      <div>普通柱形图</div>
      <div id="main"></div>
      <div>普通饼状图</div>
      <div id="piepic"></div>
      <div>南丁格尔图</div>
      <div id="specialmap"></div>
      <div></div>
      <div id="bigandsmall"></div>
      <div id="ningbomap"></div>
      <router-view></router-view>
  </div>
</template>

<script>
import '../../node_modules/echarts/map/json/china.json'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    this.getstart();
  },
  methods:{
    getstart(){
      let that = this;
      let myChart = this.$echarts.init(document.getElementById('main'),'light');

      myChart.setOption({
        title:{
          text:'Echarts 入门'
        },
        tooltip:{},
        legend:{
          data:['销量']
        },
        xAxis:{
          data:['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
        },
        yAxis:{},
        series:[{
          name:'销量',
          type:'bar',
          data:[5,20,36,10,10,20]
        }]
      })
      function piemap (){
        that.$axios.get('/api/singer',{}).then(response => {
          that.$echarts.registerTheme('westeros', response.data.data.theme);
          let myChart1 = that.$echarts.init(document.getElementById('piepic'),'westeros');
          myChart1.setOption({
          series:{
            type:'pie',
            data:[
              {name:'A',value: 1212},
              {name:'B',value: 2323},
              {name:'C',value: 1919}
            ]
          }
        })
        })
      }
      piemap();
      function mapforthree(){
        that.$axios.get('/api/singer',{}).then(response => {
        that.$echarts.registerTheme('westeros', response.data.data.theme);
        let myChart3 = that.$echarts.init(document.getElementById('specialmap'),'westeros'); //样式类型为第二个传入参数，分别为light，dark以及默认样式；

        myChart3.setOption({
          // backgroundColor: '#2c343c',
          visualMap: {
            show: false,
            min:80,
            max:600,
            inRange:{
              // colorLightness:[1,0]
              colorLightness:[0.5]
            }
          },
          series:[
            {
              name:'访问来源',
              type:'pie',
              radius:'55%',
              data:[
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'},
              ],
              roseType:'angle',
              // label:{
              //   normal:{
              //     textStyle:{
              //       color:'rgba(255,255,255,0.3)'
              //     }
              //   }
              // },
              // labelLine:{
              //   normal:{
              //     lineStyle:{
              //       color:'rgba(255,255,255,0.3)'
              //     }
              //   }
              // },
              itemStyle:{
                normal:{
                  // color:'#c23531',
                  shadowBlur:200,
                  shadowColor:'rgba(0,0,0,0.5)'
                }
              }
            }
          ]
        })
        })
      }
      function mapforfour(){
        let mychart4 = that.$echarts.init(document.getElementById("bigandsmall"),'dark');

        mychart4.setOption({
           xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [
                {   // 这个dataZoom组件，默认控制x轴。
                    type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                    xAxisIndex:0,   // 控制x轴上的滑动和缩放
                    start: 10,      // 左边在 10% 的位置。
                    end: 60         // 右边在 60% 的位置。
                },
                {   // 这个dataZoom组件，也控制x轴。
                    type: 'inside',  // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                    xAxisIndex:0,    // 使用滚滚轮控制x轴上的滑动和缩放
                    start: 10,       // 左边在 10% 的位置。
                    end: 60          // 右边在 60% 的位置。
                },
                {
                    type:'slider',
                    yAxisIndex:0, // 控制y轴上的滑动和缩放
                    start:30,
                    end:80
                },
                {
                    type:'inside',
                    yAxisIndex:0, // 使用滚滚轮控制x轴上的滑动和缩放
                    start:30,
                    end:80
                }
            ],
            series: [
                {
                    type: 'scatter', // 这是个『散点图』
                    itemStyle: {
                        opacity: 0.8
                    },
                    symbolSize: function (val) {
                        return val[2] * 40;
                    },
                    data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]]
                }
            ]
        })

      }
      mapforthree();
      mapforfour();
      function mapforfive () {
        let mychart5 = this.$echarts.init(document.getElementById("ningbomap"));

        let maps = this.loadJson()//从静态json读取文件数据
        if (maps != false) {
          echarts.registerMap('maps', JSON.stringify(maps));//注册地图数据
        }
        mychart5.setOption({
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
          },
          visualMap: {
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          series: [
            {
              name: '宁波地区人口密度',
              type: 'map',
              mapType: 'maps',
              label: {
                show: true
              },
              data: [
                { name: '海曙区', value: 20057.34 }
              ]

            }
          ]
        })
      }
    },
    
    async loadJson() {
      const result = await $.ajax({
        type: 'get',
        url: 'https://geo.datav.aliyun.com/areas/bound/330200.json',
        dataType: 'JSON',
        success(map) {
          return map;
        },
        error() {
          return false;
        },
      });
      return result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin:0 auto;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#main,#piepic,#specialmap,#bigandsmall,#ningbomap{
  width: 600px;
  height: 400px;
}
</style>
