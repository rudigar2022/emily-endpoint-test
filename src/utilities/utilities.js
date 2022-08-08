"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./enums/enums"));
const path_1 = require("path");
const fs_1 = require("fs");
exports.firstOrDefault = (data) => {
    if (!data.length) {
        return null;
    }
    return data[0];
};
exports.findAllFiles = (dir, extn, regex, files, result) => {
    files = files || fs_1.readdirSync(dir);
    result = result || [];
    regex = regex || new RegExp(`\\${extn}$`);
    for (let i = 0; i < files.length; i++) {
        let file = path_1.join(dir, files[i]);
        if (fs_1.statSync(file).isDirectory()) {
            try {
                result = exports.findAllFiles(file, extn, regex, fs_1.readdirSync(file), result);
            }
            catch (error) {
                continue;
            }
        }
        else {
            if (regex.test(file)) {
                result.push(file);
            }
        }
    }
    return result;
};
//# sourceMappingURL=utilities.js.map