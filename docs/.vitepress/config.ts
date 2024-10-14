import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Huanyou 的学习笔记",
    description:
        "记录我学习前端，后端工程化课程的笔记，涵盖了 SpringBoot、Vue.js、微信小程序等技术。",
    themeConfig: {
        siteTitle: "学习笔记",
        logo: "https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410102232183.png",
        nav: [
            {
                text: "首页",
                link: "/"
            },
            {
                text: "后端",
                items: [
                    {
                        text: "Spring Boot",
                        link: "/SpringBoot/",
                    },
                ],
            },
            {
                text: "前端",
                items: [
                    {
                        text: "基础",
                        link: "/FrontEndBasic/",
                    },
                    {
                        text: "JavaScript",
                        link: "/JavaScript/",
                    },
                    {
                        text: "Vue",
                        link: "/Vue/",
                    },
                    {
                        text: "UniApp",
                        link: "/UniApp/",
                    },
                    {
                        text: "微信小程序",
                        link: "/mp/",
                    },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/mqxu/InfinityX7" },
        ],
        sidebar: {
            "/SpringBoot/": [
                {
                    text: "Spring Boot 学习",
                    collapsible: true,
                    items: [
                        { text: "基本介绍", link: "/SpringBoot/" },
                        { text: "基本特性", link: "/SpringBoot/features" },
                        { text: "Spring Boot3新特性", link: "/SpringBoot/newfeatures" },
                        { text: "核心模块", link: "/SpringBoot/module" },
                        { text: "版本选择", link: "/SpringBoot/version" },
                        { text: "环境要求", link: "/SpringBoot/environmental" },
                        { text: "快速开始", link: "/SpringBoot/quickstart" },
                        { text: "启动分析", link: "/SpringBoot/startanalysis" },
                        { text: "IDEA环境下的热加载", link: "/SpringBoot/hotloading " },
                        { text: "课后作业", link: "/SpringBoot/homework " },
                    ],
                },
            ],
            "/FrontEndBasic/": [
                {
                    text: "前端基础",
                    collapsible: true,
                    items: [
                        { text: "发展", link: "/FrontEndBasic/" },
                        { text: "HTML", link: "/FrontEndBasic/hl" },
                        { text: "CSS", link: "/FrontEndBasic/css" },
                    ],
                },
            ],
            "/JavaScript/": [
                {
                    text: "JavaScript",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/JavaScript/" },
                        { text: "ES6", link: "/JavaScript/es6" },
                        { text: "NodeJS", link: "/JavaScript/ns" },
                        { text: "TypeScript", link: "/JavaScript/ts" },
                    ],
                },
            ],
            "/Vue/": [
                {
                    text: "Vue 学习",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/Vue/" },
                        { text: "Vue.js 3 基础", link: "/Vue/basic" },
                        { text: "Vue.js 3 组件", link: "/Vue/components" },
                        { text: "Vue.js 3 组合式函数", link: "/Vue/composables" },
                    ],
                },
            ],
            "/React/": [
                {
                    text: "React 学习",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/React/" },
                        { text: "快速起步", link: "/React/quickstart" },
                    ],
                },
            ],
            "/UniApp/": [
                {
                    text: "UniApp 学习",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/UniApp/" },
                        { text: "快速起步", link: "/UniApp/quickstart" },
                    ],
                },
            ],
            "/mp/": [
                {
                    text: "微信小程序学习",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/mp/" },
                        { text: "微信小程序基础", link: "/mp/basic" },
                        { text: "微信小程序 API", link: "/mp/api" },
                        { text: "微信小程序自定义组件", link: "/mp/components" },
                    ],
                },
            ],
            "/Flutter/": [
                {
                    text: "Flutter 学习",
                    collapsible: true,
                    items: [
                        { text: "介绍", link: "/Flutter/" },
                        { text: "快速起步", link: "/Flutter/quickstart" },
                    ],
                },
            ],
        },
        footer: {
            message: "温故而知新💫",
            copyright: "Copyright © 2024 hyzhu",
        },
    },
});