$(document).ready(function () {
   $("#main-sidebar ul li a").click(function (event) {
       event.preventDefault();
       loadFileContent2Element($("#main-content"), $(this).attr("href"));
   });
});