<template>
  <div class="slide-container">
    <div class="slide-inner">
      <div class="slide-group clearfix">
        <div class="slide-item" v-for="item in list" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
          </a>
        </div>
      </div>
      <div class="dots">
        <span class="dot" v-for="v in list"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  let flag = true

  export default {
    name: "mobile-slide",
    data() {
      return {
        list: []
      }
    },
    created() {
      $.ajax({
        url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        dataType: 'jsonp',
        jsonp: 'jsonpCallback',// 与服务端约定的回调函数的key
        data: {
          g_tk: 1928093487,
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          format: 'jsonp',
          platform: 'h5',
          uin: 0,
          needNewCode: 1
        }
      }).done((res) => {
        this.list = res.data.slider
      })
    },
    updated() {
      if (flag) {
        flag = false
        this.run()
      }
    },
    methods: {
      run() {
        // 图片之间的间距
        let gap = 8
        // 图片宽度+gap
        let dis = 0
        // 手指初始位置
        let startX = 0
        // 手指是否移动了
        let isMove = false
        // 手指移动距离
        let diff = 0
        // 图片索引
        let index = 1
        // slide-item的个数
        let len = $('.slide-item').length
        // 小圆点索引
        let dotIndex = 0
        // 定时器
        let timer = null
        // 动画速度
        let speed = 300
        // 自动轮播时间间隔
        let interval = 2500

        init()

        // 初始化
        function init() {
          // 前后各加一张图片
          let firstItem = $('.slide-item').first()
          let lastItem = $('.slide-item').last()
          $('.slide-group').append(firstItem.clone()).prepend(lastItem.clone())

          // 调整图片大小
          resize()
          $(window).resize(resize)

          // 第一个小圆点active
          changeDot(0)

          // 自动轮播
          autoPlay()

          // 监听手指触摸事件
          $('.slide-group')
            .on('touchstart', function (e) {
              startX = e.changedTouches[0].clientX
              isMove = false
              stopPlay()
            })
            .on('touchmove', function (e) {
              diff = e.changedTouches[0].clientX - startX
              isMove = true
              offsetX(-index * dis + diff)
            })
            .on('touchend', function () {
              if ($(this).is(':animated')) return
              let W = $('.slide-inner').width()
              if (isMove && Math.abs(diff) > W / 8) {
                if (diff > 0) {
                  // 上一张
                  index--
                  dotIndex = dotIndex > 0 ? --dotIndex : len - 1
                } else {
                  // 下一张
                  index++
                  dotIndex = dotIndex < len - 1 ? ++dotIndex : 0
                }
                changeDot(dotIndex)
              }
              animate()
              stopPlay()
              setTimeout(autoPlay, speed)
            })
        }

        //当屏幕大小调整之后，重新调整图片的大小
        function resize() {
          let W = $('.slide-inner').width()
          dis = W + gap

          // 设置slide-item的宽度为slide-inner的宽度
          // margin-right === gap
          $('.slide-item').css({
            width: W,
            marginRight: gap
          })

          // reset slide-group的位置
          offsetX(-dis * index)
        }

        // css平移
        function offsetX(x) {
          $('.slide-group').css({
            left: x
          })
        }

        // 平移动画
        function animate() {
          $('.slide-group').animate({
            left: -dis * index
          }, speed, 'linear', function () {
            if (index > len) {
              index = 1
              offsetX(-dis * index)
            } else if (index < 1) {
              index = len
              offsetX(-dis * index)
            }
          })
        }

        function changeDot(i) {
          $('.dot').eq(i).addClass('active').siblings().removeClass('active')
        }

        function autoPlay() {
          timer = setInterval(() => {
            // 下一张
            index++
            dotIndex = dotIndex < len - 1 ? ++dotIndex : 0
            changeDot(dotIndex)
            animate()
          }, interval)
        }

        function stopPlay() {
          clearInterval(timer)
        }
      }
    }
  }
</script>

<style lang="scss">
  .clearfix::after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .slide-container {
    width: 100%;
    overflow: hidden;

    .slide-inner {
      position: relative;
      width: 92%;
      margin: 20px auto 0;

      .slide-group {
        position: relative;
        width: 999999px;
        /*background: pink;*/
        .slide-item {
          float: left;
          border-radius: 4px;
          overflow: hidden;

          img {
            width: 100%;
            display: block;
          }
        }
      }

      .dots {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        height: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: #fff;
          margin-right: 4px;
          transition: all 0.3s ease;

          &.active {
            width: 16px;
            background: gold;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>