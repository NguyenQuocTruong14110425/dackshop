jQuery(document).click(function(){
    jQuery(".detail-description-readmore").click(function(){
    jQuery(this).hasClass("read")?(
    jQuery(this).toggleClass("read",!1),
    jQuery(".detail-description .excerpt-extended").hide(),
    jQuery(".detail-description.content").fadeIn(),
    jQuery(this).html(Translator.translate("Show Less"))):(
    jQuery(".detail-description.content").fadeOut(function(){
    jQuery(".detail-description .excerpt-extended").fadeIn()}),
    jQuery(this).toggleClass("read",!0),
    jQuery(this).html(Translator.translate("Read More")))}),
    jQuery(".thumb-link").click(function(){location.href=
    jQuery(this).find("a").attr("href")}),
    jQuery(".primary-img").elevateZoom({
        zoomWindowFadeIn:200,
        zoomWindowFadeOut:0,
        lensFadeIn:200,lensFadeOut:100,
        borderSize:0,
        cursor:"crosshair;cursor:zoom-in",
        zoomWindowWidth:445,
        zoomWindowHeight:650,
        lensColour:"rgba(255, 255, 255, 0.4)",
        lensOpacity:1,
        lensBorderSize:1,
        lensBorderColour:"#fff"}),
        
    jQuery(".primary-img").attr("src",
    jQuery("#image-thumb-1").attr("data-primary")),
    jQuery("#detail-display-icon li").hover(function(){
    jQuery("#detail-display-icon li").toggleClass("selected",!1),
    jQuery(this).toggleClass("selected",!0),
    jQuery(".primary-img").attr("src",
    jQuery(this).attr("data-primary")),
    jQuery(".primary-img").attr("attr.data-zoom-image",
    jQuery(this).attr("data-zoom")),
    jQuery(".zoomWindow").css({"background-image":"url('"+
    jQuery(".primary-img").attr("attr.data-zoom-image")+"')"})})
    });
