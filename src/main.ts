import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import { tagListModel } from "@/models/tagListModel";
import { recordListModel } from "./models/recordListModel";
import { Report } from 'notiflix/build/notiflix-report-aio';

Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon)

// record store
window.recordList = recordListModel.fetch();


// TAG store
window.tagList = tagListModel.fetch();
// 如果没有tagList，则创建一个默认的tagList
if (!window.tagList || window.tagList.length === 0) {
  window.tagList = tagListModel.createDefaultTagList();
}
window.createTag = (name: string) => {
  const message = tagListModel.create(name)
  if (message === "duplicated"){
    window.alert("标签名重复啦")
  }else if (message === "success"){
    Report.success(
      '添加成功',
      '成功添加标签：' + name,
      '确认',
      );
  }
}

new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};