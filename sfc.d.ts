// 定义一些全局变量

interface Window {
    // 也可以添加 
    // 字符串签名 可以允许添加未知名称属性
    [p: string]: any
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

