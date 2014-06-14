/**
 * Start para.
 * @function start
 */

(function (para, document) {
    "use strict";

    var u = para.util;


    function createSrc(root, w, h) {
        var src = u.ensureElement(root);
        src.classList.add('pr-src');
        src.style.width = w + 'px';
        src.style.height = h + 'height';
        src.findPrObjects = function () {
            return u.toArray(src.querySelectorAll('[data-pr-object]'));
        };
        return src;
    }

    function createScreen(w, h) {
        var id = ['pr', 'screen', new Date().getTime()].join('-');
        var canvas = u.newCanvas(id, w, h);
        canvas.classList.add('pr-screen');
        return  new para.Screen(canvas);
    }

    function createObject(elm, style) {
        var w = elm.offsetWidth,
            h = elm.offsetHeight;
        var x = elm.offsetLeft + (w / 2),
            y = elm.offsetTop + (h / 2);
        var data = elm.dataset;
        var elmStyle = u.getStyleString(elm);
        return new para.Object({
            width: w,
            height: h,
            x: x,
            y: y,
            speed: Number(data.prSpeed || 1),
            html: [
                    '<div class="pr-object" style="' + elmStyle + '">',
                    '<style type="text/css">' + style + '</style>',
                elm.innerHTML,
                '</div>'
            ].join('')
        });
    }


    para.start = function (root, options) {

        var w = options.width || window.innerWidth,
            h = options.height || window.innerHeight;

        var style = u.getDocumentStyleString();

        var body = document.body,
            src = createSrc(root, w, h),
            screen = createScreen(w, h),
            objects = src.findPrObjects().map(function (src) {
                return createObject(src, style);
            });

        function redraw() {
            var x = body.scrollLeft,
                y = body.scrollTop;
            screen.draw(x, y);
        }

        screen.insertAfter(src);
        screen.loadObjects(objects, redraw);

        window.addEventListener('scroll', redraw, false);

    };
})(window.para = window.para || {}, document);