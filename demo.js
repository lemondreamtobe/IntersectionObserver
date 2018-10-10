const father = $('.father');
const son = $('.son');
let index = 0;

function newApiForLoad() {
  // new api for lazy load
  if (!IntersectionObserver) {
    console.log('api is not support');return;
  }
  var observer = new IntersectionObserver(
    changes => {
      changes.forEach(function (change) {
        if (change.intersectionRatio !== 0) {
          var img = $(change.target).find('img');
          img.attr('src', img.attr('data-src'));
          observer.unobserve(change.target);
        }
      });
    }, {
      root: null,
    }
  );
  $('.lz-content1 .img-fa').each(function (item, ele) {
    observer.observe(ele);
  });
}

function oldWayForLoad() {
  var n = 0,
    imgNum = $(".lz-content2 img").length,
    img = $('.lz-content2 img');
  lazyload();
  $(window).scroll(lazyload);

  function lazyload(event) {
    for (var i = n; i < imgNum; i++) {
      if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
        if (img.eq(i).attr("src") == "") {
          var src = img.eq(i).attr("data-src");
          img.eq(i).attr("src", src);
          n = i + 1;
        }
      }
    }
  }

  function throttle(fun, delay) {
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(fun.timeout);
      fun.timeout = setTimeout(() => {
        fun.apply(context, args);
        console.log('load');
      }, delay)
    };
  };
  // 采用了节流函数
  window.addEventListener('scroll', throttle(lazyload, 500));
}

function jqForLoad(param) {
  $(".lz-content3 img").lazyload();
}

function lazyloadAllimg(param) {
    oldWayForLoad();
    jqForLoad();
    newApiForLoad();
}

function scrollDemo() {
  if (!IntersectionObserver) {
    console.log('api is not be support!');
  } else {
    console.log('api is normal support');
    const io = new IntersectionObserver(
      entries => {
        console.log(entries)
        let info = document.getElementById('info');
        let ratio = entries[0].intersectionRatio;
        info.innerText = ratio == 0 ? '消失了' : (ratio * 100) + '%显示';
        index += 1;
        console.log(index);
      }, {
        root: null,
        threshold: [0, 0.24, 0.5, 0.75, 1],
      }
    );
    // Start observing an element
    io.observe(document.getElementById('demo'));
  }
}
lazyloadAllimg();
scrollDemo();