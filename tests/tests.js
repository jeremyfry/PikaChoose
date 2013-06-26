var instance;
module("Basic Strcuture",{
    setup: function(){
        $("ul#pikame").pikachoose();       
    }
});

    test("Check basic structure", function() {    
        equal($("div.pika-stage").length, 1, "Stage created");
        equal($("div.pika-stage>a").length, 1, "Link wrapper created");
        equal($("div.pika-stage>a>img").length, 1, "Main image created");
        equal($("div.pika-stage>.pika-imgnav").length, 1, "Image navigation created");
        equal($("div.pika-stage>.pika-imgnav>a").length, 3, "Image navigation links created");
        equal($("div.pika-stage>.pika-imgnav>span.pika-counter").length, 1, "Counter created");
        equal($("div.pika-stage>.caption").length, 1, "Caption created");
        equal($("div.pika-stage>.pika-aniwrap").length, 1, "Animation wrapper created");
        equal($("div.pika-stage>.pika-textnav").length, 1, "Text navigation created");
        equal($("div.pika-stage>.pika-textnav>a").length, 2, "Text navigation links created");
        equal($("div.pika-stage>.pika-loader").length, 1, "Spinner div created");
        
        equal($("ul#pikame").hasClass("pika-thumbs"), true, "Class applied to UL");
    });
    
module("Play Pause Functions",{
    setup: function(){
        $("ul#pikame").pikachoose({animationSpeed:0, autoPlay: false, speed: 10});
        instance = $("#pikame").data("pikachoose");
    }
});

    asyncTest( "Goto Funcationality", function() {
        expect( 1 );
        instance.options.animationFinished = function(self){
            equal($("#pikame img").eq(2).attr("src"), instance.image.attr("src"), "Image has changed to 2 idx image");
            start();
            self.options.animationFinished = null;
        };
        
        instance.GoTo(2);
    });
    
    test("Goto Function", function() {        
        equal(instance.GoTo(0).src, $("#pikame ul").eq(0).src, "Goto returns img object");
        throws(
            function() {
                instance.GoTo(4);
            },
            "Image not found. Images are 0 indexed.",
            "Throws proper error message"
        );
    });
    
    asyncTest( "Play Funcationality", function() {
        expect( 1 );
        var imgSrc = instance.image.attr("src");
        instance.options.animationFinished = function(self){
            notEqual(imgSrc, instance.image.attr("src"), "Image has changed from first image");
            start();
            self.options.animationFinished = null;
        };
        instance.Play();
    });
    
    test("Play Function", function() {        
        equal(instance.Play(), "playing", "Gallery is playing");
    });
    
    asyncTest( "Pause Funcationality", function() {
        expect( 1 );
        var imgSrc = instance.image.attr("src");
        instance.Pause();
        setTimeout(function() {
            equal(imgSrc, instance.image.attr("src"), "Image has not changed");
            start();
        }, 300);
    });
    
    
module("Next Prev Functions",{
    setup: function(){
        $("ul#pikame").pikachoose({animationSpeed:0, autoPlay: false, speed: 0});
        instance = $("#pikame").data("pikachoose");
    }
});

    test("Next Function", function() {        
        equal($("#pikame img").index(instance.Next()[0]), 1, "Next image selected");
    });
    
    //skip to last image and then check if we selected the image before that
    asyncTest( "Prev Function", function() {
        expect( 1 );
        var imgSrc = instance.image.attr("src");
        instance.options.animationFinished = function(self){
            equal($("#pikame img").index(instance.Prev()[0]), 1, "Previous image selected");
            start();
            self.options.animationFinished = null;
        };
        instance.GoTo(2);
    });
    
    
    