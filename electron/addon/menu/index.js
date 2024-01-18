
const { app:electronApp, ipcMain, Menu, dialog } = require('electron');
const Log = require('ee-core/log');
// const isMac = process.platform === 'darwin'

const CoreWindow = require('ee-core/electron/window');
const win = CoreWindow.getMainWindow();


/**
 * 菜单插件
 * @class
 */
class MenuAddon {

    constructor() {
        // this.menu = null;
        this._listenForIpcMain()

    }

    create() {
        let menuTemplate = [
            {
                label: '文件',
                submenu: [
                    {
                        label: '新建文本文件',
                        accelerator: 'CmdOrCtrl+N',
                        click: () => {
                            Log.info('[addon:menu] 新建');
                        }
                    },
                    {
                        label: '新建窗口',
                        accelerator: 'CmdOrCtrl+N',
                        click: () => {
                            Log.info('[addon:menu] 新建');
                        }
                    },
                    {
                        label: '打开文件',
                        accelerator: 'CmdOrCtrl+O',
                        click: () => {
                            // 打开文件


                            dialog.showOpenDialog({
                                properties: ['openFile'],
                                filters: [
                                    { name: 'markdown', extensions: ['markdown', 'mdown', 'mkdn', 'md', 'mkd', 'mdwn', 'mdtxt', 'mdtext', 'text', 'txt'] }
                                ]
                            }).then(result => {
                                // console.log(result.canceled)
                                // console.log(result.filePaths)
                                if (!result.canceled) {
                                    Log.info('[addon:file] 打开文件', result.filePaths);
                                    // electronApp.addRecentDocument(result.filePaths[0])
                                    win.webContents.send('open-file', result.filePaths[0]);
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    },
                    {
                        label: '打开文件夹',
                        accelerator: 'CmdOrCtrl+O',
                        click: () => {
                        }
                    },
                    {
                        label: '打开最近的文件',
                        accelerator: 'CmdOrCtrl+O',
                        role: 'recentdocuments',
                        submenu: [
                            {
                                label:"清除最近打开的文档",
                                role: 'clearrecentdocuments'
                            }
                        ],
                        click: () => {
                        }
                    },
                    { type: 'separator' },
                    {
                        label: '保存',
                        accelerator: 'CmdOrCtrl+O',
                        click: () => {
                        }
                    },
                    {
                        label: '另存为',
                        accelerator: 'CmdOrCtrl+O',
                        click: () => {
                        }
                    },
                    {
                        label: '自动保存',
                        accelerator: 'CmdOrCtrl+O',
                        click: () => {
                        }
                    },
                    { type: 'separator' },
                    {
                        label: '退出',
                        accelerator: 'CmdOrCtrl+Q',
                        role: 'quit'
                        /*click: () => {
                            electronApp.quit()
                        }*/
                    }

                ]
            },
            {
                label: '编辑',
                submenu: [
                    { label: '取消',role: 'undo' },
                    { label: '重做',role: 'redo' },
                    { type: 'separator' },
                    { label: '剪切',role: 'cut' },
                    { label: '复制',role: 'copy' },
                    { label: '粘贴',role: 'paste' },
                    { label: '删除',role: 'delete' },
                    { type: 'separator' },
                    { label: '选择全部',role: 'selectAll' },
                ]
            },
            {
                label: '查看',
                submenu: [
                    { label: '重新加载', role: 'reload' },
                ]
            },
            {
                label: '帮助',
                submenu: [
                    {
                        label: 'Learn More',
                        click: async () => {
                            const { shell } = require('electron')
                            await shell.openExternal('https://electronjs.org')
                        }
                    },
                    { type: 'separator' },
                    { label: '关于', role: 'about' },
                ]
            }
        ]

        // 实例化菜单
        const menu = Menu.buildFromTemplate(menuTemplate);
        Menu.setApplicationMenu(menu);
    }

    _listenForIpcMain() {
        ipcMain.on('mp::add-recently-used-document', (event, args) => {
            console.log('mp::add-recently-used-document', args)
        })
    }
}

MenuAddon.toString = () => '[class MenuAddon]';
module.exports = MenuAddon;
