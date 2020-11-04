window.onscroll = function () {
  scrollIndicator()
};

function scrollIndicator() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = scrolled + "%";
}

var url = "{{ site.url }}/lib/{{ page.slug }}.pdf }}";
var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";
var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function (pdf) {
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function (page) {
    var scale = 1.5;
    var viewport = page.getViewport({
      scale: scale
    });
    var canvas = document.getElementById("viewer");
    var context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function () {
      console.log("Page rendered");
    });
  });
}, function (reason) {
  console.error(reason);
});