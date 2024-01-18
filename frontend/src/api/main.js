
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  test: 'controller.example.test',
  // openDirectory: 'controller.os.openDirectory',

  // file
  openFile: 'controller.file.openFile',
  openDirectory: 'controller.file.openDirectory',
}

export {
  ipcApiRoute
}

