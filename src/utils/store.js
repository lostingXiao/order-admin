import { validatenull } from "./index"

const keyName = 'order'
/**
 * 存储localStorage
 */
export const setStore = (params = {}) => {
    const { name, content, type } = params
    const storageName = `${keyName}-${name}`
    const obj = { content, type, dataType: typeof (content), datetime: new Date().getTime() }
    if (type) window.sessionStorage.setItem(storageName, JSON.stringify(obj));
    else window.localStorage.setItem(storageName, JSON.stringify(obj));
}

/**
 * 获取localStorage
 */

export const getStore = (name) => {
    const storageName = `${keyName}-${name}`
    let obj = {}, content
    obj = window.sessionStorage.getItem(storageName) || window.localStorage.getItem(storageName)
    if (validatenull(obj)) return
    try {
        obj = JSON.parse(obj);
    } catch{
        return obj;
    }
    if (obj.dataType === 'string') {
        content = obj.content;
    } else if (obj.dataType === 'number') {
        content = Number(obj.content);
    } else if (obj.dataType === 'boolean') {
        content = eval(obj.content);
    } else if (obj.dataType === 'object') {
        content = obj.content;
    }
    return content;
}
/**
 * 删除localStorage
 */
export const removeStore = (name, type) => {
    const storageName = `${keyName}-${name}`
    if (type) {
        window.sessionStorage.removeItem(storageName);
    } else {
        window.localStorage.removeItem(storageName);
    }
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (type) => {
    let list = [];
    if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: 'session'
                })
            })
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i),
                })
            })

        }
    }
    return list;
}

/**
 * 清空全部localStorage
 */
export const clearStore = (type) => {
    if (type) {
        window.sessionStorage.clear();
    } else {
        window.localStorage.clear()
    }
}