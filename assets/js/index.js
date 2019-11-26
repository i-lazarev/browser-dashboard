class browserDashboard {
  constructor(bgApi, quoteApi) {
    this.bgApi = bgApi;
    this.quoteApi = quoteApi;
    this.init();
  }

  timeDisplay() {
    document.querySelector("#clock").textContent = moment().format("hh:mm:ss");
  }

  async fetchIt() {
    const fetchResult = fetch(this.quoteApi);
    const myResponse = await fetchResult;
    const myJsonData = await myResponse.json();
    const quoteUrl = myJsonData.content;
    const authorUrl = myJsonData.author;
    document.querySelector("#quote").textContent = `"${quoteUrl}"`;
    document.querySelector("#author").textContent = `"${authorUrl}"`;
  }

  async fetchBg() {
    const req = fetch(this.bgApi);
    const res = await req;
    const img = await res.url;
    document.querySelector("body").style.background = `url("${img}")`;
  }

  init() {
    const displayDate = moment().format("DD MMMM YYYY");
    document.querySelector("#date").textContent = displayDate;
    setInterval(this.timeDisplay, 1000);
    this.fetchIt();
    this.fetchBg();
  }
}

const browserDashboardInstance = new browserDashboard(
  "https://picsum.photos/1780/1080",
  "https://api.quotable.io/random"
);
