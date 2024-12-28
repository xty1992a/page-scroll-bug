import React, {useRef, useState} from 'react'
import Taro from '@tarojs/taro'
import {Button, View} from '@tarojs/components'
import './index.less'

const rdm = () => Math.random().toString(36).substr(2, 15);
const ranger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));
const height = ranger(6789, 16789)

const PageIndex: React.FC = () => {

  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef(0)

  Taro.usePageScroll(res => {
    ref.current = res.scrollTop
  })

  const text = (() => {
    if (scrollTop < 100) return '滚动'
    if (scrollTop === height) return '已对齐，点击回到顶部'
    return '再次滚动对齐'
  })()

  return (
    <View>
      <View style={{height}} />
      <View className='marker'>
        <View>应该对齐上边缘</View>
        <View>height:{height}</View>
        <View>scrollTop:{scrollTop}</View>
      </View>
      <View className="holder" />

      <View className="footer">
        <Button
          onClick={() => {
            let target = scrollTop === height ? 0 : height

            Taro.pageScrollTo({
              scrollTop: target,
              complete: async () => {
                await sleep(300)
                setScrollTop(ref.current)
              }
            })
          }}
        >{text}</Button>
        <View style={{height: 'env(safe-area-inset-bottom)'}} />
      </View>
    </View>
  )
}

export default PageIndex
