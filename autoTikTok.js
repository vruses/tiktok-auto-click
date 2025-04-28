// ==UserScript==
// @name        抖音自动点击
// @match       https://www.douyin.com/user/*
// @namespace   vurses
// @license     Mit
// @version     1.0.0
// @author      layenh
// @grant       none
// @version     1.0
// @description 2025/4/27 16:26:24
// ==/UserScript==

const Time = 5000;

// 创建一个键盘按下事件
const keyboardEvent = new KeyboardEvent("keydown", {
  key: "ArrowDown", // 键值为向下箭头键
  keyCode: 40, // 键码，ArrowDown的键码是40
  code: "ArrowDown", // 浏览器有时会用 `code` 字段
  which: 40, // `which` 也是一个历史上用来表示按键的字段
  bubbles: true, // 是否冒泡
  cancelable: true, // 是否可以取消
});

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
    $queryPlayerEl("digg").forEach((ele) => {
      // 是否点赞？
      if (ele.dataset.e2eState.includes("-no-")) ele.click();
    });
    $queryPlayerEl("collect").forEach((ele) => {
      // 是否收藏？
      if (ele.dataset.e2eState.includes("-no-")) ele.click();
    });
    return Promise.resolve();
  }
  // 视频页调用顺序
  async function secondStep() {
    // 派发事件切换视频
    document.dispatchEvent(keyboardEvent);
    await loopLoad(document, "video", (el) => {});
    $queryPlayerEl("digg").forEach((ele) => {
      // 是否点赞？
      if (ele.dataset.e2eState.includes("-no-")) ele.click();
    });
    $queryPlayerEl("collect").forEach((ele) => {
      // 是否收藏？
      if (ele.dataset.e2eState.includes("-no-")) ele.click();
    });
  }
  async function runSteps() {
    await firstStep();
    setInterval(() => {
      secondStep();
    }, Time);
  }
  runSteps();
});
