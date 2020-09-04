const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
  { logo: "B", logoType: "text", url: "https://www.bilibili.com" },
  { logo: "D", logoType: "text", url: "https://www.douyu.com" },
  { logo: "H", logoType: "text", url: "https://www.huya.com" },
  { logo: "J", logoType: "text", url: "https://www.jd.com" },
  { logo: "Z", logoType: "text", url: "https://www.zhihu.com" },
];

const simplyfyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
                  <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplyfyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                  </div>
          </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);

      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问您要添加的网址是？");
  console.log(url);
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);

  hashMap.push({
    logo: simplyfyUrl(url)[0].toUpperCase(),
    logoType: "Text",
    url: url,
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
