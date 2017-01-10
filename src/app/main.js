var Vue = require("vue");
var co = require("co");
var delay = function (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  })
}

var vm = new Vue({
  template: require("./template.html"),
  data: function () {
    return {
      items: []
    }
  },
  created: function () {
    var self = this;
    co(function* () {
      for (var i = 0; i < 10; i++) {
        var msg = new Date() + " hello";
        self.items.push(msg);
        console.log(msg);
        yield delay(1000);
      }
    })
  }
}).$mount("#app");
window.App = vm;

