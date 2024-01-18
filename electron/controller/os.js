'use strict';

const path = require('path');
const { Controller } = require('ee-core');
const {
    app: electronApp, dialog, shell, Notification,
    powerMonitor, screen, nativeTheme
} = require('electron');

class OsController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * 所有方法接收两个参数
     * @param args 前端传的参数
     * @param event - ipc通信时才有值。详情见：控制器文档
     */

    // 打开目录
    openDirectory(args) {
        if (!args.id) {
            return false;
        }
        let dir = '';
        if (path.isAbsolute(args.id)) {
            dir = args.id;
        } else {
            dir = electronApp.getPath(args.id);
        }

        shell.openPath(dir);
        return true;
    }
}

OsController.toString = () => '[class OsController]';
module.exports = OsController;
