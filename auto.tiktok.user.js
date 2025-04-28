// ==UserScript==
// @name        抖音自动点击
// @match       https://www.douyin.com/user/*
// @namespace   vurses
// @license     Mit
// @version     1.0.0
// @author      layenh
// @grant       none
// @grant        GM_setValue
// @grant        GM_getValue
// @version     1.0
// @description 2025/4/27 16:26:24
// ==/UserScript==

// if (initpage) {
//   fetch & location.href;
// } else {
//   fetch;
// }
// fetch('xxx',{
//   mode: 'no-cors'
// }).then(res=>{console.log(res.json())})
const Time = 3000;

// 创建一个键盘按下事件
const keyboardEvent = new KeyboardEvent("keydown", {
  key: "ArrowDown", // 键值为向下箭头键
  keyCode: 40, // 键码，ArrowDown的键码是40
  code: "ArrowDown", // 浏览器有时会用 `code` 字段
  which: 40, // `which` 也是一个历史上用来表示按键的字段
  bubbles: true, // 是否冒泡
  cancelable: true, // 是否可以取消
});

// webWork后台定时器管理视频切换频率
const workerJs = function () {
  class TimerManager {
    constructor() {
      this.timers = new Map();
    }
    set(key, callback, delay) {
      this.clean(key);
      const id = setTimeout(() => {
        callback();
      }, delay);
      this.timers.set(key, id);
    }
    clean(key) {
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
        this.timers.delete(key);
      }
    }
    cleanAll() {
      for (let id of this.timers.values()) {
        clearTimeout(id);
      }
      this.timers.clear();
    }
    has(key) {
      return this.timers.has(key);
    }
  }
  const manager = new TimerManager();
  self.addEventListener("message", function (e) {
    manager.set("switchClip", () => self.postMessage("switchClip"), e.data);
  });
};

/**
 * @param {string} selectorKey
 * @returns {NodeList}
 */
const $queryPlayerEl = function (selectorKey) {
  selector = 'div[data-e2e="video-player-key"]'.replace("key", selectorKey);
  return document.querySelectorAll(selector);
};

const pageLoadPromise = new Promise((resolve, reject) => {
  window.addEventListener("load", resolve);
});
pageLoadPromise.then(() => {
  // ssr
  const subscribeBtn = document.querySelector(
    "button[data-e2e=user-info-follow-btn]"
  );
  // 未关注=>关注
  if (subscribeBtn.className.includes("primary")) {
    subscribeBtn.click();
  }
  // ssr
  const postList = document.querySelector("div[data-e2e=user-post-list]");
  // 不要在视频页面加载
  /**作品列表加载和视频加载
   * @param {Element} root
   * @param {String} selector
   * @param {Function} action
   * @returns {Promise}
   * */
  const loopLoad = function (root, selector, action) {
    return new Promise((resolve) => setTimeout(resolve, 500))
      .then(() => {
        const el = root.querySelector(selector);
        if (el) {
          action(el);
          return Promise.resolve();
        } else {
          console.log(`${selector} loading...`);
          return loopLoad(root, selector, action);
        }
      })
      .catch((error) => {
        return Promise.reject("等待加载遇到错误，请联系开发者：" + error);
      });
  };
  // 等待作品列表加载
  // 等待视频加载
  async function firstStep() {
    await loopLoad(postList, "a", (el) => el.click()); // 作品列表第一条作品
    await loopLoad(document, "video", (el) => {
      //视频播放页
    });
    if (GM_getValue("likeStatus"))
      $queryPlayerEl("digg").forEach((ele) => {
        // 是否点赞？
        if (ele.dataset.e2eState.includes("-no-")) ele.click();
      });
    if (GM_getValue("collectStatus"))
      $queryPlayerEl("collect").forEach((ele) => {
        // 是否收藏？
        if (ele.dataset.e2eState.includes("-no-")) ele.click();
      });
    document
      .querySelectorAll("[data-e2e=feed-video-nickname]")
      .forEach((ele) => {
        // if (ele.textContent === "name") location.href("www.baidu.com");
      });
    return Promise.resolve();
  }
  // 视频页调用顺序
  async function secondStep() {
    // 派发事件切换视频
    document.dispatchEvent(keyboardEvent);
    await loopLoad(document, "video", (el) => {});
    if (GM_getValue("likeStatus"))
      $queryPlayerEl("digg").forEach((ele) => {
        // 是否点赞？
        if (ele.dataset.e2eState.includes("-no-")) ele.click();
      });
    if (GM_getValue("collectStatus"))
      $queryPlayerEl("collect").forEach((ele) => {
        // 是否收藏？
        if (ele.dataset.e2eState.includes("-no-")) ele.click();
      });
    document
      .querySelectorAll("[data-e2e=feed-video-nickname]")
      .forEach((ele) => {
        // if (ele.textContent === "name") location.href("www.baidu.com");
      });
  }

  // 后台定时器管理者实例
  workerJs.toString();
  const blob = new Blob([`(${workerJs})()`], {
    type: "application/javascript",
  });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  // 等待作品加载=>点进第一个作品=>等待视频加载=>点赞？收藏？=>Time后切换到下一个视频=>等待视频加载...
  async function runSteps() {
    await firstStep();
    worker.postMessage(Time);
    worker.addEventListener("message", async function (e) {
      await secondStep();
      worker.postMessage(Time);
    });
  }
  runSteps();
});

// 创建 点赞收藏接口 面板
// 自定义视频是否点赞收藏等；默认不点赞收藏；
// 当前页是否初始页面？获取接口数据并跳转：获取接口数据并等待脚本执行；
// 获取当前主页用户名，判断document.querySelectorAll('[data-e2e=feed-video-nickname]').textContent
// 是否等于用户主页的用户名
// 包含了一个不同的用户名，则跳转已经加载好的链接