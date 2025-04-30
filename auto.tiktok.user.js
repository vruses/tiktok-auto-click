// ==UserScript==
// @name        抖音自动点击
// @match       https://www.douyin.com/user/*
// @namespace   vurses
// @license     Mit
// @version     1.0.1
// @author      layenh
// @homepage    https://github.com/vruses/tiktok-auto-click
// @@supportURL https://github.com/vruses/tiktok-auto-click/issues
// @grant       none
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// @require     https://update.greasyfork.org/scripts/534265/1579489/UserPanel.js
// @require     https://update.greasyfork.org/scripts/534382/1580036/NumberInputWidget.js
// @descript    通过接口获取目标信息，自动跳转并点赞收藏作品
// @icon        data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAIAAAAK8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA7wAAAL8AAAAgAAAAAAAAACAAAADvAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAO8AAAAgAAAAvwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/BQAQ/woAIP8KACD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAALAAAADvAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8KACD/MgCg/0YA3/9QAP//UAD//1AA//9LAO//LQCQ/woAIP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/OSBw/62Q7//ez///7+/v///////p3///yK///3xA//9QAP//UAD//yMAcP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/4CAgP///////////////////////////////////////////9O///9mIP//UAD//ygAgP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+ankD///////////////////////////////////////////////////////Tv//9mIP//UAD//x4AX/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/aW0A/+3vz////////////////////////f7f//f8gP/1+2D/9/1///3+3////////////+nf//9mIP//RgDf/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/x4fAP/0+0D//////////////////////97fz/+JjSD/eH0A/7S7AP/w+gD/8foQ/+zuv////////////72f//9QAP//HgBf/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/eH0A//j8kP////////////////+9n///CgAg/wAAAP8AAAD/AAAA/zw/AP/h6gD/8vog////////////9O///1sQ//8yAJ//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/DywD/+f2g////////////9O///1EQ3/8AAAD/AAAA/wAAAP8AAAD/AAAA/2ltAP/w+gD/+/6/////////////fED//zwAv/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/+HqAP/q7aD///////////+ykP//PAC//wAAAP8AAAD/AAAA/wAAAP8AAAD/Hh8A//D6AP/7/r////////////+ccP//PAC//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/8PoA//j8kP///////////6eA//9QAP//CgAg/wAAAP8AAAD/AAAA/wAAAP8AAAD/8PoA//v+v////////////6eA//88AL//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/h6gD/9PtQ////////////07///1AA//8yAJ//AAAA/wAAAP8AAAD/AAAA/wAAAP/w+gD/+/6/////////////p4D//zwAv/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/6WsAP/w+gD//f7f////////////fED//1AA//88AL//GQBQ/woAIP8KACD/AAAA//D6AP/7/r////////////+ngP//PAC//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/Wl0A//D6AP/2/GD////////////07///qID//1sQ//9QAP//WxD//zIAn/8AAAD/8PoA//v+v////////////6eA//88AL//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0toA//D6AP/4/Y////////////////////////////+RYP//MgCf/wAAAP/w+gD/+/6/////////////p4D//zwAv/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8eHwD/0toA//D6AP/4/Y///////////////////////5Fg//8yAJ//AAAA//D6AP/7/r////////////+ngP//PAC//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8eHwD/0toA//D6AP/z+0D/+/6/////////////kWD//zIAn/8AAAD/8PoA//v+v////////////6eA//88AL//AAAA/wAAAP8UAED/LQCQ/zwAv/9BAM//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8PEAD/eH0A/+HqAP/w+gD/8foQ//L7MP9rXlD/DwAw/wAAAP/w+gD/+/6/////////////p4D//zwAv/8eAGD/ckDf/51v//+9n///nW///1AA//8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/DxAA/zw/AP9aXgD/aW0A/x4fAP8AAAD/AAAA//D6AP/7/r////////////+ngP//jWDv/+nf//////////////////+9n///UAD//wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/8PoA//v+v////////////+nf/////////////////////////////72f//9QAP//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/w+gD/+/6/////////////////////////////////////////////sp/P/zcAr/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//D6AP/7/r//////////////////////////////////+v6v/+PrIP94fQD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/8PoA//v+v////////////////////////////52ff/8eHwD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/w+gD/+/6///////////////////////+Tf7//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//D6AP/7/r//////////////////so///xQAQP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/8PoA//v+v/////////////Tv//9WEO//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/w+gD/+v6v//3+3//9/t//t5/f/zcAr/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADvAAAArwAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//D6AP/w+gD/8PoA//D6AP94fQD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAL8AAAAgAAAA7wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADvAAAAIAAAAAAAAAAgAAAAvwAAAO8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAArwAAACAAAAAAgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAE=
// ==/UserScript==

// 跳转频率，没有则默认为3000
const Time = GM_getValue("redirectInterval", 3) * 1000;
console.log(Time);
const api = GM_getValue("storedURL", "");
const baseURL = "https://www.douyin.com/user/";
let userSecUid = "";
console.log(api);
// 创建设置面板加到dom中，不等window.onload也没事
const userPanel = createPanel();
// 数字输入框组件
const numberInput = createNumberInput();
numberInput.style = "display: flex;justify-content: center;";
numberInput.style.marginTop = "6px";
numberInput.addEventListener("click", function (e) {
  e.stopPropagation(); // 阻止事件继续冒泡
});
userPanel.shadowRoot
  .querySelector(".float-ball .menu-panel")
  .appendChild(numberInput);
document.body.appendChild(userPanel);
// 针对接口的简易封装
const gm_xhr = function (api, method) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method,
      url: api,
      onload: resolve,
      onerror: reject,
    });
  }).then((response) => {
    return response.responseText;
  });
};
// 如果未设置接口，则先初始化设置
if (!api) {
  return;
  // 默认先在个人主页启动
} else if (location.href.includes(baseURL + "self")) {
  gm_xhr(api, "GET")
    .then((res) => {
      console.log(JSON.parse(JSON.parse(res).result));
      userSecUid = JSON.parse(JSON.parse(res).result).secuid;
      console.log(userSecUid);
      setTimeout(() => {
        location.href = baseURL + userSecUid;
      }, 5000);
    })
    .catch((e) => {
      // 可能服务器挂了，也可能接口有问题
      console.warn("接口请求出错：" + e);
    });
  return;
}
// 监听 space 键按下是否需要暂停
window.addEventListener("keydown", function onKey(e) {
  if (e.code === "Space") {
    console.log("spacedown");
    GM_setValue("needPause", true); // 持久化暂停
    document.dispatchEvent(new Event("resumeExecution"));
  }
});
// 如果在其他用户主页，获取下一个用户的secUid
gm_xhr(api, "GET")
  .then((res) => {
    console.log(JSON.parse(JSON.parse(res).result));
    userSecUid = JSON.parse(JSON.parse(res).result).secuid;
    console.log(userSecUid);
  })
  .catch((e) => {
    location.href = baseURL + "self";
    console.warn("接口请求出错：" + e);
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
  // 只有一种倒计时，暂时先这样用着
  self.addEventListener("message", function (e) {
    manager.set(
      "redirectNextUser",
      () => self.postMessage("redirectNextUser"),
      e.data
    );
  });
};

/**
 * @param {string} selectorKey
 * @returns {Element}
 */
const $queryPlayerElStatus = function (selectorKey) {
  selector = 'div[data-e2e="video-player-key"]'.replace("key", selectorKey);
  const ele = document.querySelector(selector);
  if (ele?.dataset?.e2eState.includes("-no-")) {
    return ele; //现在只找第一个就行
  } else {
    return false;
  }
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
  if (subscribeBtn?.className?.includes("primary")) {
    subscribeBtn.click();
  }
  // ssr
  // ele具有缓存性质，需要每次重新查询
  // let postList = document.querySelector("div[data-e2e=user-post-list]");
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

  // 通过派发自定义事件触发监听器，终止暂停
  async function pauseIfNeeded() {
    const needPause = GM_getValue("needPause", false);
    if (!needPause) return Promise.resolve();

    return new Promise((resolve) => {
      const resumeHandler = () => {
        document.removeEventListener("resumeExecution", resumeHandler);
        resolve();
      };
      document.addEventListener("resumeExecution", resumeHandler);
    });
  }
  // 等待作品列表加载
  // 等待视频加载
  /**
   * @param {Worker} worker
   * */
  async function firstStep(worker) {
    await loopLoad(document, "div[data-e2e=user-post-list] a", (el) =>
      el.click()
    ); // 作品列表第一条作品
    await loopLoad(document, "video", (el) => {
      //视频播放页
    });
    // 是否点赞？
    if (GM_getValue("likeStatus")) {
      const result = $queryPlayerElStatus("digg");
      if (result) result.click();
    }
    // 是否收藏？
    if (GM_getValue("collectStatus")) {
      const result = $queryPlayerElStatus("collect");
      if (result) result.click();
    }
    // 暂停直到用户按空格
    await pauseIfNeeded();
    // 清除状态，避免影响下一次
    GM_setValue("needPause", false);
    // 任务结束，通知worker倒计时
    worker.postMessage(Time);
    return Promise.resolve();
  }

  // 后台定时器管理者实例
  workerJs.toString();
  const blob = new Blob([`(${workerJs})()`], {
    type: "application/javascript",
  });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  // 等待作品加载=>点进第一个作品=>等待视频加载=>点赞？收藏？=>定向至下一个用户主页
  async function runSteps() {
    firstStep(worker);
  }
  worker.addEventListener("message", function (e) {
    location.href = baseURL + userSecUid;
    console.log(e.data);
  });
  runSteps();
});
