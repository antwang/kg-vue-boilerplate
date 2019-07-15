module.exports = {
  "对hello.vue进行功能测试": function(browser) {
    browser.url(`http://localhost:3000`).waitForElementVisible("#app", 1000);
    browser.expect.element(".title").to.be.present;
    browser.expect.element(".title").text.to.equal("欢迎使用项目模板！");
    browser.expect.element(".count").to.be.present;
    browser.expect.element(".count").text.to.equal("0");
    browser.expect.element(".add").to.be.present;
    browser.expect.element(".add").text.to.equal("add");
    browser.click(".add").pause(1000);
    browser.expect.element(".count").text.to.equal("1");
    browser.end();
  }
};
