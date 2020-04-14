var isPhone = false;
var animationObj = {};
var scrollTimer = null;
var scrollStage = 0;
var smoking = false;
var mySwiper,
    mySwiper2,
    mySwiper3;

$(document).ready(function () {
    initSwiper();
    initMenu();
    initAnimation();
    initStory();
    initDungeon();
    initChar();
    initWheel();
    switchPage('#sectionIntro')

})

function checkIsPhone() {
    // testExp = new RegExp('Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile', 'i');

// console.log($(document).width());
    // return (testExp.test(navigator.userAgent))
    return ($(document).width()<960)
}


function initWheel() {
    $(window).on('scroll', function (e) {
            if (checkIsPhone()) {
                var scrollPosition = $(window).scrollTop();
                var index = 0;
                var section;

                $('section').each(function (i) {
                    if($(this).hasClass('hide')){
                        return
                    }

                    if($(this).offset().top - scrollPosition<300){
                        index = i;
                        section = $(this);
                    }
                    
                })

                console.log(index);
                if(!section.hasClass('played')){
                    section.addClass('played');
                    animationObj['ani'+(index+1)].restart();
                }

                $('#navQuick .quick-menu-items').eq(index).addClass('is-active').siblings().removeClass('is-active');
                // $('#navQuick .quick-menu-items').eq(index)[0].scrollIntoView();
                

            }
        })

    $(window).on('mousewheel', function (e) {
        
        if (smoking) {
            return
        }

        if (checkIsPhone()) {
            return
        }

        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();

        if (e.originalEvent.wheelDelta < 0) {
            //scroll down
            
            if ((scrollHeight - scrollPosition) / scrollHeight < 0.001) {

                var nextMenu  = $('#navQuick .is-active').nextAll(".quick-menu-items").not(".disable").first();
                if(nextMenu.length!=0){
                    nextMenu.trigger('click');
                }else{
                    $('.UNI-footer').addClass('show');
                }
            } else {
                scrollStage = 0
            }
        } else {
            //scroll up
            $('.UNI-footer').removeClass('show');


            if ($(window).scrollTop() === 0) {
                $('#navQuick .is-active')
                    .prevAll(".quick-menu-items").not(".disable").first()
                    .trigger('click')
            } else {
                scrollStage = 0
            }
        }
    });
}

function initAnimation() {
    var isPhone=false;
    $(window).resize(function () {
            var imgW = 600;
            var imgH = 344;
            var ww = $(document).width();
            var vh = $(document).height();
            var s;
            if (ww / vh > imgW / imgH) {
                s = ww / imgW;
            } else {
                s = vh / imgH;
            }

            TweenMax.set($('#smokeBg'), {scale: s,x: '-50%',y: '-50%'})


            if(ww<955&&isPhone==false){
                
                isPhone=true;
                console.log('isPhone: ', isPhone);
                console.log($($('.quick-menu-items.is-active').find('a').attr('href')).offset().top);

                var $body = (window.opera)? (document.compatMode == "CSS1Compat"? $('html'): $('body')): $('html,body');
                $body.animate({
                    scrollTop: $($('.quick-menu-items.is-active').find('a').attr('href')).offset().top
                }, 400);

            }
            
            if(ww>=955&&isPhone){
                isPhone= false
                console.log('isPhone: ', isPhone);
            }
        }).resize();

    $(".smoke_inner").animateSprite({
        fps: 20,
        loop: false,
        complete: function () {
            // use complete only when you set animations with 'loop: false'
            if ($('.smoke_inner').css('background-position') !== '0px 0px') {
                $('#smokeBg').css('display', 'none');
                smoking = false;
            }
        }
    });

    var intro = $('#sectionIntro');
    var story = $('#sectionStory');
    var char = $('#sectionChar');
    var change = $('#sectionChange');
    var dungeon = $('#sectionDungeon');

    animationObj.ani1 = new TimelineMax();
    animationObj.ani2 = new TimelineMax();
    animationObj.ani3 = new TimelineMax();
    animationObj.ani4 = new TimelineMax();
    animationObj.ani5 = new TimelineMax();

    animationObj.ani1.set(intro.find('.logo'), {scale: .85,opacity: 0})
        .set(intro.find('.title'), {x: -75,skewX: -30,opacity: 0})
        .set(intro.find('.subtitle'), {x:-75,opacity: 0})
        .set(intro.find('.date'), {y: 45,opacity: 0})
        .set(intro.find('.promo-btn'), {opacity: 0})
        .set(intro.find('.anit'), {opacity: 0,scale:2})
        .set(intro.find('.el-intro-character'), {x: 500,scale: .85,ease: Expo.easeOut})
        .to(intro.find('.el-intro-character'), 3, {x: 0,scale: 1,ease: Expo.easeOut}, 0)
        .staggerTo(intro.find('.anit'), 1.5, {opacity: 1,scale: 1,ease: Expo.easeOut},.1, .4)
        .to(intro.find('.logo'), .9, {delay: .5,scale: 1,opacity: 1,ease: Cubic.easeOut}, 0)
        .to(intro.find('.title'), 1.5, {delay: 1,x: 0,skewX: 0,opacity: 1,ease: Expo.easeOut}, 0)
        .to(intro.find('.subtitle'), 1.5, {delay: 1.1,x:0,opacity: 1,ease: Expo.easeOut}, 0)
        .to(intro.find('.date'), .9, {delay: 1.2,y: 0,opacity: 1,ease: Expo.easeOut}, 0)
        .to(intro.find('.promo-btn'), 1.2, {delay: 1.5,opacity: 1,ease: Expo.easeOut}, 0).pause();

    animationObj.ani2.set(story.find('.el1'), {opacity: 0,marginLeft: 300})
        .set(story.find('.el2'), {opacity: 0,marginLeft: -300})
        .set(story.find('.alphaEl'), {opacity: 0})
        .to(story.find('.el1'), 1.2, {opacity: 1,marginLeft:0,ease: Expo.easeOut}, .1)
        .to(story.find('.el2'), 1.2, {opacity: 1,marginLeft: 0,ease: Expo.easeOut}, .1)
        .staggerTo(story.find('.alphaEl'),.6, {opacity: 1},.15,.5).pause();

    animationObj.ani3.set(char.find('.el1'), {opacity: 0,marginLeft: 300})
        .set(char.find('.el2'), {opacity: 0,marginLeft: -300})
        .set(char.find('.alphaEl'), {opacity: 0})
        .to(char.find('.el1'), 1.2, {opacity: 1,marginLeft: -0,ease: Expo.easeOut}, .1)
        .to(char.find('.el2'), 1.2, {opacity: 1,marginLeft: 0,ease: Expo.easeOut}, .1)
        .staggerTo(char.find('.alphaEl'),.6, {opacity: 1},.15,.5).pause();

    animationObj.ani4.set(change.find('.el-intro-character'), {x: 700,y: 200,scale: .85,ease: Expo.easeOut})
        .set(change.find('.card'), {rotationY: 90,autoAlpha: 0,y: 50})
        .set(change.find('.alphaEl'), {opacity: 0})
        .staggerTo(change.find('.card'), .6, {rotationY: 0,autoAlpha: 1,y: 0}, .1, .2)
        .to(change.find('.el-intro-character'), 2, {x: 100,y: 50,scale: 1,ease: Expo.easeOut}, 0)
        .staggerTo(change.find('.alphaEl'),.6, {opacity: 1},.15,.5).pause();
        

    animationObj.ani5.set(dungeon.find('.alphaEl'), {opacity: 0})
        .staggerTo(dungeon.find('.alphaEl'),.6, {opacity: 1},.15,.5).pause();
    // animationObj.ani5.set(change.find('.el-intro-character'), {x:
    // 700,y:200,scale: .85,ease: Expo.easeOut})
    // .set(change.find('.card'),{rotationY:90,autoAlpha:0,y:50})
    // .staggerTo(change.find('.card'),.6,{rotationY:0,autoAlpha:1,y:0},.1,.2)
    // .to(change.find('.el-intro-character'), 2, {x: 0,y:0,scale: 1,ease:
    // Expo.easeOut},0).pause();

}

function switchPage(page) {
    smokeAniMation();
    $(page).addClass('is-active').siblings('section').removeClass('is-active');
    var $body = (window.opera)
        ? (document.compatMode == "CSS1Compat"
            ? $('html')
            : $('body'))
        : $('html,body');
    $body.animate({
        scrollTop: 0
    }, 400);


    switch (page) {
        case '#sectionIntro':
            animationObj.ani1.restart();
            $('.UNI-footer').addClass('phoneShow');
            break;

        case '#sectionStory':
            animationObj.ani2.restart();
            $('#sectionStory .tab-menu li').eq(0).trigger('click');
            $('.UNI-footer').addClass('phoneShow');
            
            break;

        case '#sectionChar':
            animationObj.ani3.restart();
            $('#sectionChar .tab-menu li').eq(0).trigger('click');
            $('.UNI-footer').addClass('phoneShow');
            
            break;

        case '#sectionChange':
            animationObj.ani4.restart();
            $('.UNI-footer').addClass('phoneShow');
            
            break;

        case '#sectionDungeon':
            $('#sectionDungeon .tab-menu li').eq(0).trigger('click');

            animationObj.ani5.restart();
            $('.UNI-footer').removeClass('phoneShow');
            
            break;
    }
}

function smokeAniMation() {
    $(".smoke_inner").css('background-position', '0 0')
    $('#smokeBg').css('display', 'block');
    smoking = true;
    $(".smoke_inner").animateSprite('restart');
}

function initMenu() {
    $('#navQuick .quick-menu-items')
        .click(function (e) {
            if (checkIsPhone()) {
                return
            }
            e.preventDefault();
            var target = $(this)
                .find('a')
                .attr('href');
            switchPage(target);
            $(this)
                .addClass('is-active')
                .siblings()
                .removeClass('is-active');

        })
}

function initStory() {
    var page = $('#sectionStory');
    page.find('.tab-menu li').click(function (e) {
            e.preventDefault();
            var target = $(this).attr('data-index');
            $(this).addClass('is-active').siblings().removeClass('is-active');
            console.log('.tab-content-' + target);
            page.find('.tab-content-' + target).addClass('is-active').siblings('.tab-content').removeClass('is-active');
            page.find('.story-el').removeClass('is-active');
            page.find('.el' + target).addClass('is-active')
        })
}

function initDungeon() {
    var page = $('#sectionDungeon');
    page.find('.tab-menu li').click(function (e) {
            e.preventDefault();
            var target = $(this).attr('data-index');
            console.log(target);
            $(this).addClass('is-active').siblings().removeClass('is-active');
            page.find('.tab-content-' + target).addClass('is-active').siblings('.tab-content').removeClass('is-active');
            // page.find('.el'+target).addClass('is-active').siblings('.story-el').removeCla
            // ss('is-active');

            if (target == 3) {
                mySwiper3.update();
                mySwiper3.slideTo(0, 0)
            }

        })
}

function initChar() {
    var page = $('#sectionChar');
    page
        .find('.tab-menu li')
        .click(function (e) {
            e.preventDefault();
            var target = $(this).attr('data-index');
            $(this)
                .addClass('is-active')
                .siblings()
                .removeClass('is-active');
            console.log('.tab-content-' + target);
            page
                .find('.tab-content-' + target)
                .addClass('is-active')
                .siblings('.tab-content')
                .removeClass('is-active');
                page.find('.story-el').removeClass('is-active');
                page.find('.el' + target).addClass('is-active')
            console.log(target);
            if (target == 1) {
                mySwiper.update();
                mySwiper.slideTo(0, 0)
            } else if (target == 2) {
                mySwiper2.update();
                mySwiper2.slideTo(0, 0)

            }

        })
}
function initSwiper() {
    mySwiper = new Swiper('#swc1', {
        // speed: 400, spaceBetween: 100
        pagination: {
            el: '#swc1 .swiper-pagination'
        },
        navigation: {
            nextEl: '#swc1 .swiper-button-next',
            prevEl: '#swc1 .swiper-button-prev'
        }
    });

    mySwiper2 = new Swiper('#swc2', {
        // speed: 400, spaceBetween: 100
        pagination: {
            el: '#swc2 .swiper-pagination'
        },
        navigation: {
            nextEl: '#swc2 .swiper-button-next',
            prevEl: '#swc2 .swiper-button-prev'
        }
    });

    mySwiper3 = new Swiper('#swc3', {
        // speed: 400, spaceBetween: 100
        pagination: {
            el: '#swc3 .swiper-pagination'
        },
        navigation: {
            nextEl: '#swc3 .swiper-button-next',
            prevEl: '#swc3 .swiper-button-prev'
        }
    });
}