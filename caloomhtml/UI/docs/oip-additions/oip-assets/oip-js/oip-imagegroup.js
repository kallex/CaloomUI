$(function () {
    $(".oipimageselector").on("click", function () {
        var imgid = $(this).data("id");
        var imgsrc = $(this).data("src");
        var imgcaption = $(this).data("caption");
        var imgtitle = $(this).data("title");
        $("#selectedimgtitle").val(imgtitle);
        $("#selectedimgtitle").attr("name", imgid + "_Title");
        $("#selectedimgcaption").val(imgcaption);
        $("#selectedimgcaption").attr("name", imgid + "_Caption");
        $("#selectedimgsrc").attr("src", imgsrc);
        $("#ActionObjectInput").val(imgid);
    });
});
