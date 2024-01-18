<template>
  <div class="bytemdBlock">
    <div class="title" flex="dir:top" style="display: none">
      <input flex-box="0" class="title-input" type="text" placeholder="输入文章标题...">
      <div flex-box="1">
        <button v-for="(item, index) in openList" @click="openFile(item.id)">打开{{ item.content }}</button>
      </div>
      <div flex-box="1">
        <button v-for="(item, index) in fileList" @click="openDirectry(item.id)">打开{{ item.content }}</button>
        <button @click="saveBtnToFile">保存</button>
      </div>
    </div>

    <Editor
        :value="fileValue"
        :locale="zhHans"
        :plugins="plugins"
        @change="handleChange"
    />
  </div>

</template>
<script>
import { ipc, isEE } from '@/utils/ipcRenderer';
import { ipcApiRoute } from '@/api/main';

const fs = require('fs')
// import fs from 'fs-extra'

import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm' // 支持 GFM（自动链接文字、删除线、表格、任务列表）
import frontmatter from '@bytemd/plugin-frontmatter' // 解析 frontmatter
import gemoji from '@bytemd/plugin-gemoji' // 支持 Gemoji 简码

import highlight from '@bytemd/plugin-highlight' // 代码高亮
// import highlight from '@bytemd/plugin-highlight-ssr' // 代码高亮

import math from '@bytemd/plugin-math' // 数学公式
// import math from '@bytemd/plugin-math-ssr' // 数学公式
import 'katex/dist/katex.css' // 数学公式样式

import mediumZoom from '@bytemd/plugin-medium-zoom' // 图片缩放

import mermaid from '@bytemd/plugin-mermaid' // 流程图、时序图、甘特图


import { Editor, Viewer } from '@bytemd/vue-next'

// import zhHans from "bytemd/lib/locales/zh_Hans.json"; // 汉化
import zhHans from "@/locales/zh_Hans.json"; // 汉化

// import 'highlight.js/styles/default.css' // 代码高亮样式

import 'juejin-markdown-themes/dist/juejin.min.css' // 主题样式


const plugins = [
  gfm({
    locale: zhHans
  }),
  frontmatter(),
  gemoji(),
  highlight(),
  math({
    locale: zhHans
  }),
  mediumZoom(),
  mermaid({
    locale: zhHans
  }),
]
export default {


  components: { Editor, Viewer },
  data() {
    return {
      zhHans,
      plugins,
      openList: [
        {
          content: '文件',
          id: 'desktop'
        },
        {
          content: '文件夹',
          id: 'openDirectory'
        }
      ],
      fileList: [
        {
          content: '【下载】目录',
          id: 'downloads'
        },
        {
          content: '【图片】目录',
          id: 'pictures'
        },
        {
          content: '【文档】目录',
          id: 'documents'
        },
        {
          content: '【音乐】目录',
          id: 'music'
        }
      ],
      filePath: '',
      fileValue: ''
    };
  },
  mounted() {
    ipc.on('open-file', (event, arg) => {
      // console.log('arg:', arg)
      this.filePath = arg
      // this.fileValue = fs.readFileSync(arg, 'utf8')
      this.fileValue = fs.readFileSync(arg, 'utf8')
      console.log(this.fileValue)
    })
  },
  methods: {
    openFile(id) {
      ipc.invoke(ipcApiRoute.openFile, {id: id}).then(res => {
        console.log('res:', res)
      }).catch(err => {
        // console.log('err:', err)
      })
    },
    openDirectry(id) {
      ipc.invoke(ipcApiRoute.openDirectory, {id: id}).then(res => {
        // console.log('res:', res)
      }).catch(err => {
        // console.log('err:', err)
      })
    },
    handleChange(v) {
      // console.log(v)
      if (this.filePath) fs.writeFileSync(this.filePath, v)
      
      this.fileValue = v
    },

    saveBtnToFile() {}


  }
};
</script>
<style scoped lang="less">
@titleHeight: 0px;
.bytemdBlock{
  height: 100vh;
}
.title{
  height: @titleHeight;
  padding: 0 27px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  .title-input{
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 500;
    color: #1d2129;
    border: none;
    outline: none;
    width: 100%;
  }
}
.editor{
  height: 100%;
  overflow-y: hidden;
}
  :deep(.bytemd) {
      height: calc(100vh - @titleHeight);
  }
</style>
