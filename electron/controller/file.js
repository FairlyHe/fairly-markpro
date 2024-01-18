'use strict';

const path = require('path');
const { Controller } = require('ee-core');
const {
    app: electronApp, dialog, shell, Notification,
    powerMonitor, screen, nativeTheme
} = require('electron');

class FileController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    // 打开文件
    openFile(args) {
        if (!args.id) {
            return false;
        }
        let dir = '';
        if (path.isAbsolute(args.id)) {
            dir = args.id;
        } else {
            dir = electronApp.getPath(args.id);
        }

        const filePaths = dialog.showOpenDialog({
            defaultPath: dir,
            properties: ['openFile'],
            filters: [
                { name: 'markdown', extensions: ['markdown', 'mdown', 'mkdn', 'md', 'mkd', 'mdwn', 'mdtxt', 'mdtext', 'text', 'txt'] }
            ]
        })

        return filePaths[0];
    }

    // 打开文件夹
    openDirectory(args) {
        if (!args.id) {
            return false;
        }
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            console.log(result.canceled)
            console.log(result.filePaths)
        }).catch(err => {
            console.log(err)
        })
        return true;
    }
}

FileController.toString = () => '[class FileController]';
module.exports = FileController;
