function t(t) {
    return null !== t && "object" == typeof t && "constructor" in t && t.constructor === Object
}

function e(s = {}, i = {}) {
    Object.keys(i).forEach((r => {
        void 0 === s[r] ? s[r] = i[r] : t(i[r]) && t(s[r]) && Object.keys(i[r]).length > 0 && e(s[r], i[r])
    }))
}
const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({
        initEvent() {}
    }),
    createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => []
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};

function i() {
    const t = "undefined" != typeof document ? document : {};
    return e(t, s), t
}
const r = {
    document: s,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({
        getPropertyValue: () => ""
    }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: t => "undefined" == typeof setTimeout ? (t(), null) : setTimeout(t, 0),
    cancelAnimationFrame(t) {
        "undefined" != typeof setTimeout && clearTimeout(t)
    }
};

function n() {
    const t = "undefined" != typeof window ? window : {};
    return e(t, r), t
}

function a(t, e = 0) {
    return setTimeout(t, e)
}

function o() {
    return Date.now()
}

function l(t, e = "x") {
    const s = n();
    let i, r, a;
    const o = function(t) {
        const e = n();
        let s;
        return e.getComputedStyle && (s = e.getComputedStyle(t, null)), !s && t.currentStyle && (s = t.currentStyle), s || (s = t.style), s
    }(t);
    return s.WebKitCSSMatrix ? (r = o.transform || o.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map((t => t.replace(",", "."))).join(", ")), a = new s.WebKitCSSMatrix("none" === r ? "" : r)) : (a = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = a.toString().split(",")), "x" === e && (r = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === e && (r = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), r || 0
}

function h(t) {
    return "object" == typeof t && null !== t && t.constructor && "Object" === Object.prototype.toString.call(t).slice(8, -1)
}

function d(...t) {
    const e = Object(t[0]),
        s = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < t.length; r += 1) {
        const n = t[r];
        if (null != n && (i = n, !("undefined" != typeof window && void 0 !== window.HTMLElement ? i instanceof HTMLElement : i && (1 === i.nodeType || 11 === i.nodeType)))) {
            const t = Object.keys(Object(n)).filter((t => s.indexOf(t) < 0));
            for (let s = 0, i = t.length; s < i; s += 1) {
                const i = t[s],
                    r = Object.getOwnPropertyDescriptor(n, i);
                void 0 !== r && r.enumerable && (h(e[i]) && h(n[i]) ? n[i].__swiper__ ? e[i] = n[i] : d(e[i], n[i]) : !h(e[i]) && h(n[i]) ? (e[i] = {}, n[i].__swiper__ ? e[i] = n[i] : d(e[i], n[i])) : e[i] = n[i])
            }
        }
    }
    var i;
    return e
}

function c(t, e, s) {
    t.style.setProperty(e, s)
}

function u({
    swiper: t,
    targetPosition: e,
    side: s
}) {
    const i = n(),
        r = -t.translate;
    let a, o = null;
    const l = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(t.cssModeFrameID);
    const h = e > r ? "next" : "prev",
        d = (t, e) => "next" === h && t >= e || "prev" === h && t <= e,
        c = () => {
            a = (new Date).getTime(), null === o && (o = a);
            const n = Math.max(Math.min((a - o) / l, 1), 0),
                h = .5 - Math.cos(n * Math.PI) / 2;
            let u = r + h * (e - r);
            if (d(u, e) && (u = e), t.wrapperEl.scrollTo({
                    [s]: u
                }), d(u, e)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
                t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
                    [s]: u
                })
            })), void i.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = i.requestAnimationFrame(c)
        };
    c()
}

function p(t, e = "") {
    return [...t.children].filter((t => t.matches(e)))
}

function f(t, e = []) {
    const s = document.createElement(t);
    return s.classList.add(...Array.isArray(e) ? e : [e]), s
}

function g(t, e) {
    return n().getComputedStyle(t, null).getPropertyValue(e)
}

function m(t) {
    let e, s = t;
    if (s) {
        for (e = 0; null !== (s = s.previousSibling);) 1 === s.nodeType && (e += 1);
        return e
    }
}

function v(t, e, s) {
    const i = n();
    return s ? t["width" === e ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(t, null).getPropertyValue("width" === e ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(t, null).getPropertyValue("width" === e ? "margin-left" : "margin-bottom")) : t.offsetWidth
}
let w, x, b;

function E() {
    return w || (w = function() {
        const t = n(),
            e = i();
        return {
            smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
            touch: !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch)
        }
    }()), w
}

function T(t = {}) {
    return x || (x = function({
        userAgent: t
    } = {}) {
        const e = E(),
            s = n(),
            i = s.navigator.platform,
            r = t || s.navigator.userAgent,
            a = {
                ios: !1,
                android: !1
            },
            o = s.screen.width,
            l = s.screen.height,
            h = r.match(/(Android);?[\s\/]+([\d.]+)?/);
        let d = r.match(/(iPad).*OS\s([\d_]+)/);
        const c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !d && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            p = "Win32" === i;
        let f = "MacIntel" === i;
        return !d && f && e.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${l}`) >= 0 && (d = r.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), f = !1), h && !p && (a.os = "android", a.android = !0), (d || u || c) && (a.os = "ios", a.ios = !0), a
    }(t)), x
}

function S() {
    return b || (b = function() {
        const t = n();
        let e = !1;

        function s() {
            const e = t.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }
        if (s()) {
            const s = String(t.navigator.userAgent);
            if (s.includes("Version/")) {
                const [t, i] = s.split("Version/")[1].split(" ")[0].split(".").map((t => Number(t)));
                e = t < 16 || 16 === t && i < 2
            }
        }
        return {
            isSafari: e || s(),
            needPerspectiveFix: e,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        }
    }()), b
}

function M({
    swiper: t,
    runCallbacks: e,
    direction: s,
    step: i
}) {
    const {
        activeIndex: r,
        previousIndex: n
    } = t;
    let a = s;
    if (a || (a = r > n ? "next" : r < n ? "prev" : "reset"), t.emit(`transition${i}`), e && r !== n) {
        if ("reset" === a) return void t.emit(`slideResetTransition${i}`);
        t.emit(`slideChangeTransition${i}`), "next" === a ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`)
    }
}

function y(t) {
    const e = this,
        s = i(),
        r = n(),
        a = e.touchEventsData;
    a.evCache.push(t);
    const {
        params: l,
        touches: h,
        enabled: d
    } = e;
    if (!d) return;
    if (!l.simulateTouch && "mouse" === t.pointerType) return;
    if (e.animating && l.preventInteractionOnTransition) return;
    !e.animating && l.cssMode && l.loop && e.loopFix();
    let c = t;
    c.originalEvent && (c = c.originalEvent);
    let u = c.target;
    if ("wrapper" === l.touchEventsTarget && !e.wrapperEl.contains(u)) return;
    if ("which" in c && 3 === c.which) return;
    if ("button" in c && c.button > 0) return;
    if (a.isTouched && a.isMoved) return;
    const p = !!l.noSwipingClass && "" !== l.noSwipingClass,
        f = t.composedPath ? t.composedPath() : t.path;
    p && c.target && c.target.shadowRoot && f && (u = f[0]);
    const g = l.noSwipingSelector ? l.noSwipingSelector : `.${l.noSwipingClass}`,
        m = !(!c.target || !c.target.shadowRoot);
    if (l.noSwiping && (m ? function(t, e = this) {
            return function e(s) {
                if (!s || s === i() || s === n()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const r = s.closest(t);
                return r || s.getRootNode ? r || e(s.getRootNode().host) : null
            }(e)
        }(g, u) : u.closest(g))) return void(e.allowClick = !0);
    if (l.swipeHandler && !u.closest(l.swipeHandler)) return;
    h.currentX = c.pageX, h.currentY = c.pageY;
    const v = h.currentX,
        w = h.currentY,
        x = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection,
        b = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
    if (x && (v <= b || v >= r.innerWidth - b)) {
        if ("prevent" !== x) return;
        t.preventDefault()
    }
    Object.assign(a, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }), h.startX = v, h.startY = w, a.touchStartTime = o(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, l.threshold > 0 && (a.allowThresholdMove = !1);
    let E = !0;
    u.matches(a.focusableElements) && (E = !1, "SELECT" === u.nodeName && (a.isTouched = !1)), s.activeElement && s.activeElement.matches(a.focusableElements) && s.activeElement !== u && s.activeElement.blur();
    const T = E && e.allowTouchMove && l.touchStartPreventDefault;
    !l.touchStartForcePreventDefault && !T || u.isContentEditable || c.preventDefault(), e.params.freeMode && e.params.freeMode.enabled && e.freeMode && e.animating && !l.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", c)
}

function A(t) {
    const e = i(),
        s = this,
        r = s.touchEventsData,
        {
            params: n,
            touches: a,
            rtlTranslate: l,
            enabled: h
        } = s;
    if (!h) return;
    if (!n.simulateTouch && "mouse" === t.pointerType) return;
    let d = t;
    if (d.originalEvent && (d = d.originalEvent), !r.isTouched) return void(r.startMoving && r.isScrolling && s.emit("touchMoveOpposite", d));
    const c = r.evCache.findIndex((t => t.pointerId === d.pointerId));
    c >= 0 && (r.evCache[c] = d);
    const u = r.evCache.length > 1 ? r.evCache[0] : d,
        p = u.pageX,
        f = u.pageY;
    if (d.preventedByNestedSwiper) return a.startX = p, void(a.startY = f);
    if (!s.allowTouchMove) return d.target.matches(r.focusableElements) || (s.allowClick = !1), void(r.isTouched && (Object.assign(a, {
        startX: p,
        startY: f,
        prevX: s.touches.currentX,
        prevY: s.touches.currentY,
        currentX: p,
        currentY: f
    }), r.touchStartTime = o()));
    if (n.touchReleaseOnEdges && !n.loop)
        if (s.isVertical()) {
            if (f < a.startY && s.translate <= s.maxTranslate() || f > a.startY && s.translate >= s.minTranslate()) return r.isTouched = !1, void(r.isMoved = !1)
        } else if (p < a.startX && s.translate <= s.maxTranslate() || p > a.startX && s.translate >= s.minTranslate()) return;
    if (e.activeElement && d.target === e.activeElement && d.target.matches(r.focusableElements)) return r.isMoved = !0, void(s.allowClick = !1);
    if (r.allowTouchCallbacks && s.emit("touchMove", d), d.targetTouches && d.targetTouches.length > 1) return;
    a.currentX = p, a.currentY = f;
    const g = a.currentX - a.startX,
        m = a.currentY - a.startY;
    if (s.params.threshold && Math.sqrt(g ** 2 + m ** 2) < s.params.threshold) return;
    if (void 0 === r.isScrolling) {
        let t;
        s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? r.isScrolling = !1 : g * g + m * m >= 25 && (t = 180 * Math.atan2(Math.abs(m), Math.abs(g)) / Math.PI, r.isScrolling = s.isHorizontal() ? t > n.touchAngle : 90 - t > n.touchAngle)
    }
    if (r.isScrolling && s.emit("touchMoveOpposite", d), void 0 === r.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (r.startMoving = !0)), r.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && r.evCache.length > 1) return void(r.isTouched = !1);
    if (!r.startMoving) return;
    s.allowClick = !1, !n.cssMode && d.cancelable && d.preventDefault(), n.touchMoveStopPropagation && !n.nested && d.stopPropagation();
    let v = s.isHorizontal() ? g : m,
        w = s.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
    n.oneWayMovement && (v = Math.abs(v) * (l ? 1 : -1), w = Math.abs(w) * (l ? 1 : -1)), a.diff = v, v *= n.touchRatio, l && (v = -v, w = -w);
    const x = s.touchesDirection;
    s.swipeDirection = v > 0 ? "prev" : "next", s.touchesDirection = w > 0 ? "prev" : "next";
    const b = s.params.loop && !(s.virtual && s.params.virtual.enabled) && !n.cssMode;
    if (!r.isMoved) {
        if (b && s.loopFix({
                direction: s.swipeDirection
            }), r.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
            const t = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(t)
        }
        r.allowMomentumBounce = !1, !n.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", d)
    }
    let E;
    r.isMoved && x !== s.touchesDirection && b && Math.abs(v) >= 1 && (s.loopFix({
        direction: s.swipeDirection,
        setTranslate: !0
    }), E = !0), s.emit("sliderMove", d), r.isMoved = !0, r.currentTranslate = v + r.startTranslate;
    let T = !0,
        S = n.resistanceRatio;
    if (n.touchReleaseOnEdges && (S = 0), v > 0 ? (b && !E && r.currentTranslate > (n.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }), r.currentTranslate > s.minTranslate() && (T = !1, n.resistance && (r.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + r.startTranslate + v) ** S))) : v < 0 && (b && !E && r.currentTranslate < (n.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - ("auto" === n.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
        }), r.currentTranslate < s.maxTranslate() && (T = !1, n.resistance && (r.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - r.startTranslate - v) ** S))), T && (d.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), s.allowSlidePrev || s.allowSlideNext || (r.currentTranslate = r.startTranslate), n.threshold > 0) {
        if (!(Math.abs(v) > n.threshold || r.allowThresholdMove)) return void(r.currentTranslate = r.startTranslate);
        if (!r.allowThresholdMove) return r.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, r.currentTranslate = r.startTranslate, void(a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
    }
    n.followFinger && !n.cssMode && ((n.freeMode && n.freeMode.enabled && s.freeMode || n.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(r.currentTranslate), s.setTranslate(r.currentTranslate))
}

function C(t) {
    const e = this,
        s = e.touchEventsData,
        i = s.evCache.findIndex((e => e.pointerId === t.pointerId));
    if (i >= 0 && s.evCache.splice(i, 1), ["pointercancel", "pointerout", "pointerleave"].includes(t.type)) return;
    const {
        params: r,
        touches: n,
        rtlTranslate: l,
        slidesGrid: h,
        enabled: d
    } = e;
    if (!d) return;
    if (!r.simulateTouch && "mouse" === t.pointerType) return;
    let c = t;
    if (c.originalEvent && (c = c.originalEvent), s.allowTouchCallbacks && e.emit("touchEnd", c), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && r.grabCursor && e.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
    r.grabCursor && s.isMoved && s.isTouched && (!0 === e.allowSlideNext || !0 === e.allowSlidePrev) && e.setGrabCursor(!1);
    const u = o(),
        p = u - s.touchStartTime;
    if (e.allowClick) {
        const t = c.path || c.composedPath && c.composedPath();
        e.updateClickedSlide(t && t[0] || c.target), e.emit("tap click", c), p < 300 && u - s.lastClickTime < 300 && e.emit("doubleTap doubleClick", c)
    }
    if (s.lastClickTime = o(), a((() => {
            e.destroyed || (e.allowClick = !0)
        })), !s.isTouched || !s.isMoved || !e.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
    let f;
    if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, f = r.followFinger ? l ? e.translate : -e.translate : -s.currentTranslate, r.cssMode) return;
    if (e.params.freeMode && r.freeMode.enabled) return void e.freeMode.onTouchEnd({
        currentPos: f
    });
    let g = 0,
        m = e.slidesSizesGrid[0];
    for (let a = 0; a < h.length; a += a < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
        const t = a < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        void 0 !== h[a + t] ? f >= h[a] && f < h[a + t] && (g = a, m = h[a + t] - h[a]) : f >= h[a] && (g = a, m = h[h.length - 1] - h[h.length - 2])
    }
    let v = null,
        w = null;
    r.rewind && (e.isBeginning ? w = e.params.virtual && e.params.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (v = 0));
    const x = (f - h[g]) / m,
        b = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (p > r.longSwipesMs) {
        if (!r.longSwipes) return void e.slideTo(e.activeIndex);
        "next" === e.swipeDirection && (x >= r.longSwipesRatio ? e.slideTo(r.rewind && e.isEnd ? v : g + b) : e.slideTo(g)), "prev" === e.swipeDirection && (x > 1 - r.longSwipesRatio ? e.slideTo(g + b) : null !== w && x < 0 && Math.abs(x) > r.longSwipesRatio ? e.slideTo(w) : e.slideTo(g))
    } else {
        if (!r.shortSwipes) return void e.slideTo(e.activeIndex);
        e.navigation && (c.target === e.navigation.nextEl || c.target === e.navigation.prevEl) ? c.target === e.navigation.nextEl ? e.slideTo(g + b) : e.slideTo(g) : ("next" === e.swipeDirection && e.slideTo(null !== v ? v : g + b), "prev" === e.swipeDirection && e.slideTo(null !== w ? w : g))
    }
}
let P;

function _() {
    const t = this,
        {
            params: e,
            el: s
        } = t;
    if (s && 0 === s.offsetWidth) return;
    e.breakpoints && t.setBreakpoint();
    const {
        allowSlideNext: i,
        allowSlidePrev: r,
        snapGrid: n
    } = t, a = t.virtual && t.params.virtual.enabled;
    t.allowSlideNext = !0, t.allowSlidePrev = !0, t.updateSize(), t.updateSlides(), t.updateSlidesClasses();
    const o = a && e.loop;
    !("auto" === e.slidesPerView || e.slidesPerView > 1) || !t.isEnd || t.isBeginning || t.params.centeredSlides || o ? t.params.loop && !a ? t.slideToLoop(t.realIndex, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0) : t.slideTo(t.slides.length - 1, 0, !1, !0), t.autoplay && t.autoplay.running && t.autoplay.paused && (clearTimeout(P), P = setTimeout((() => {
        t.autoplay.resume()
    }), 500)), t.allowSlidePrev = r, t.allowSlideNext = i, t.params.watchOverflow && n !== t.snapGrid && t.checkOverflow()
}

function L(t) {
    const e = this;
    e.enabled && (e.allowClick || (e.params.preventClicks && t.preventDefault(), e.params.preventClicksPropagation && e.animating && (t.stopPropagation(), t.stopImmediatePropagation())))
}

function O() {
    const t = this,
        {
            wrapperEl: e,
            rtlTranslate: s,
            enabled: i
        } = t;
    if (!i) return;
    let r;
    t.previousTranslate = t.translate, t.isHorizontal() ? t.translate = -e.scrollLeft : t.translate = -e.scrollTop, 0 === t.translate && (t.translate = 0), t.updateActiveIndex(), t.updateSlidesClasses();
    const n = t.maxTranslate() - t.minTranslate();
    r = 0 === n ? 0 : (t.translate - t.minTranslate()) / n, r !== t.progress && t.updateProgress(s ? -t.translate : t.translate), t.emit("setTranslate", t.translate, !1)
}
const I = (t, e) => {
    const s = e.closest(t.isElement ? "swiper-slide" : `.${t.params.slideClass}`);
    if (s) {
        const e = s.querySelector(`.${t.params.lazyPreloaderClass}`);
        e && e.remove()
    }
};

function F(t) {
    I(this, t.target), this.update()
}
let k = !1;

function z() {}
const G = (t, e) => {
    const s = i(),
        {
            params: r,
            el: n,
            wrapperEl: a,
            device: o
        } = t,
        l = !!r.nested,
        h = "on" === e ? "addEventListener" : "removeEventListener",
        d = e;
    n[h]("pointerdown", t.onTouchStart, {
        passive: !1
    }), s[h]("pointermove", t.onTouchMove, {
        passive: !1,
        capture: l
    }), s[h]("pointerup", t.onTouchEnd, {
        passive: !0
    }), s[h]("pointercancel", t.onTouchEnd, {
        passive: !0
    }), s[h]("pointerout", t.onTouchEnd, {
        passive: !0
    }), s[h]("pointerleave", t.onTouchEnd, {
        passive: !0
    }), (r.preventClicks || r.preventClicksPropagation) && n[h]("click", t.onClick, !0), r.cssMode && a[h]("scroll", t.onScroll), r.updateOnWindowResize ? t[d](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", _, !0) : t[d]("observerUpdate", _, !0), n[h]("load", t.onLoad, {
        capture: !0
    })
};
const R = (t, e) => t.grid && e.grid && e.grid.rows > 1;
var B = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    runCallbacksOnInit: !0,
    _emitClasses: !1
};

function N(t, e) {
    return function(s = {}) {
        const i = Object.keys(s)[0],
            r = s[i];
        "object" == typeof r && null !== r ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === t[i] && (t[i] = {
            auto: !0
        }), i in t && "enabled" in r ? (!0 === t[i] && (t[i] = {
            enabled: !0
        }), "object" != typeof t[i] || "enabled" in t[i] || (t[i].enabled = !0), t[i] || (t[i] = {
            enabled: !1
        }), d(e, s)) : d(e, s)) : d(e, s)
    }
}
const D = {
        eventsEmitter: {
            on(t, e, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof e) return i;
                const r = s ? "unshift" : "push";
                return t.split(" ").forEach((t => {
                    i.eventsListeners[t] || (i.eventsListeners[t] = []), i.eventsListeners[t][r](e)
                })), i
            },
            once(t, e, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof e) return i;

                function r(...s) {
                    i.off(t, r), r.__emitterProxy && delete r.__emitterProxy, e.apply(i, s)
                }
                return r.__emitterProxy = e, i.on(t, r, s)
            },
            onAny(t, e) {
                const s = this;
                if (!s.eventsListeners || s.destroyed) return s;
                if ("function" != typeof t) return s;
                const i = e ? "unshift" : "push";
                return s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s
            },
            offAny(t) {
                const e = this;
                if (!e.eventsListeners || e.destroyed) return e;
                if (!e.eventsAnyListeners) return e;
                const s = e.eventsAnyListeners.indexOf(t);
                return s >= 0 && e.eventsAnyListeners.splice(s, 1), e
            },
            off(t, e) {
                const s = this;
                return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (t.split(" ").forEach((t => {
                    void 0 === e ? s.eventsListeners[t] = [] : s.eventsListeners[t] && s.eventsListeners[t].forEach(((i, r) => {
                        (i === e || i.__emitterProxy && i.__emitterProxy === e) && s.eventsListeners[t].splice(r, 1)
                    }))
                })), s) : s
            },
            emit(...t) {
                const e = this;
                if (!e.eventsListeners || e.destroyed) return e;
                if (!e.eventsListeners) return e;
                let s, i, r;
                "string" == typeof t[0] || Array.isArray(t[0]) ? (s = t[0], i = t.slice(1, t.length), r = e) : (s = t[0].events, i = t[0].data, r = t[0].context || e), i.unshift(r);
                return (Array.isArray(s) ? s : s.split(" ")).forEach((t => {
                    e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
                        e.apply(r, [t, ...i])
                    })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((t => {
                        t.apply(r, i)
                    }))
                })), e
            }
        },
        update: {
            updateSize: function() {
                const t = this;
                let e, s;
                const i = t.el;
                e = void 0 !== t.params.width && null !== t.params.width ? t.params.width : i.clientWidth, s = void 0 !== t.params.height && null !== t.params.height ? t.params.height : i.clientHeight, 0 === e && t.isHorizontal() || 0 === s && t.isVertical() || (e = e - parseInt(g(i, "padding-left") || 0, 10) - parseInt(g(i, "padding-right") || 0, 10), s = s - parseInt(g(i, "padding-top") || 0, 10) - parseInt(g(i, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(s) && (s = 0), Object.assign(t, {
                    width: e,
                    height: s,
                    size: t.isHorizontal() ? e : s
                }))
            },
            updateSlides: function() {
                const t = this;

                function e(e) {
                    return t.isHorizontal() ? e : {
                        width: "height",
                        "margin-top": "margin-left",
                        "margin-bottom ": "margin-right",
                        "margin-left": "margin-top",
                        "margin-right": "margin-bottom",
                        "padding-left": "padding-top",
                        "padding-right": "padding-bottom",
                        marginRight: "marginBottom"
                    }[e]
                }

                function s(t, s) {
                    return parseFloat(t.getPropertyValue(e(s)) || 0)
                }
                const i = t.params,
                    {
                        wrapperEl: r,
                        slidesEl: n,
                        size: a,
                        rtlTranslate: o,
                        wrongRTL: l
                    } = t,
                    h = t.virtual && i.virtual.enabled,
                    d = h ? t.virtual.slides.length : t.slides.length,
                    u = p(n, `.${t.params.slideClass}, swiper-slide`),
                    f = h ? t.virtual.slides.length : u.length;
                let m = [];
                const w = [],
                    x = [];
                let b = i.slidesOffsetBefore;
                "function" == typeof b && (b = i.slidesOffsetBefore.call(t));
                let E = i.slidesOffsetAfter;
                "function" == typeof E && (E = i.slidesOffsetAfter.call(t));
                const T = t.snapGrid.length,
                    S = t.slidesGrid.length;
                let M = i.spaceBetween,
                    y = -b,
                    A = 0,
                    C = 0;
                if (void 0 === a) return;
                "string" == typeof M && M.indexOf("%") >= 0 && (M = parseFloat(M.replace("%", "")) / 100 * a), t.virtualSize = -M, u.forEach((t => {
                    o ? t.style.marginLeft = "" : t.style.marginRight = "", t.style.marginBottom = "", t.style.marginTop = ""
                })), i.centeredSlides && i.cssMode && (c(r, "--swiper-centered-offset-before", ""), c(r, "--swiper-centered-offset-after", ""));
                const P = i.grid && i.grid.rows > 1 && t.grid;
                let _;
                P && t.grid.initSlides(f);
                const L = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter((t => void 0 !== i.breakpoints[t].slidesPerView)).length > 0;
                for (let c = 0; c < f; c += 1) {
                    let r;
                    if (_ = 0, u[c] && (r = u[c]), P && t.grid.updateSlide(c, r, f, e), !u[c] || "none" !== g(r, "display")) {
                        if ("auto" === i.slidesPerView) {
                            L && (u[c].style[e("width")] = "");
                            const n = getComputedStyle(r),
                                a = r.style.transform,
                                o = r.style.webkitTransform;
                            if (a && (r.style.transform = "none"), o && (r.style.webkitTransform = "none"), i.roundLengths) _ = t.isHorizontal() ? v(r, "width", !0) : v(r, "height", !0);
                            else {
                                const t = s(n, "width"),
                                    e = s(n, "padding-left"),
                                    i = s(n, "padding-right"),
                                    a = s(n, "margin-left"),
                                    o = s(n, "margin-right"),
                                    l = n.getPropertyValue("box-sizing");
                                if (l && "border-box" === l) _ = t + a + o;
                                else {
                                    const {
                                        clientWidth: s,
                                        offsetWidth: n
                                    } = r;
                                    _ = t + e + i + a + o + (n - s)
                                }
                            }
                            a && (r.style.transform = a), o && (r.style.webkitTransform = o), i.roundLengths && (_ = Math.floor(_))
                        } else _ = (a - (i.slidesPerView - 1) * M) / i.slidesPerView, i.roundLengths && (_ = Math.floor(_)), u[c] && (u[c].style[e("width")] = `${_}px`);
                        u[c] && (u[c].swiperSlideSize = _), x.push(_), i.centeredSlides ? (y = y + _ / 2 + A / 2 + M, 0 === A && 0 !== c && (y = y - a / 2 - M), 0 === c && (y = y - a / 2 - M), Math.abs(y) < .001 && (y = 0), i.roundLengths && (y = Math.floor(y)), C % i.slidesPerGroup == 0 && m.push(y), w.push(y)) : (i.roundLengths && (y = Math.floor(y)), (C - Math.min(t.params.slidesPerGroupSkip, C)) % t.params.slidesPerGroup == 0 && m.push(y), w.push(y), y = y + _ + M), t.virtualSize += _ + M, A = _, C += 1
                    }
                }
                if (t.virtualSize = Math.max(t.virtualSize, a) + E, o && l && ("slide" === i.effect || "coverflow" === i.effect) && (r.style.width = `${t.virtualSize+i.spaceBetween}px`), i.setWrapperSize && (r.style[e("width")] = `${t.virtualSize+i.spaceBetween}px`), P && t.grid.updateWrapperSize(_, m, e), !i.centeredSlides) {
                    const e = [];
                    for (let s = 0; s < m.length; s += 1) {
                        let r = m[s];
                        i.roundLengths && (r = Math.floor(r)), m[s] <= t.virtualSize - a && e.push(r)
                    }
                    m = e, Math.floor(t.virtualSize - a) - Math.floor(m[m.length - 1]) > 1 && m.push(t.virtualSize - a)
                }
                if (h && i.loop) {
                    const e = x[0] + M;
                    if (i.slidesPerGroup > 1) {
                        const s = Math.ceil((t.virtual.slidesBefore + t.virtual.slidesAfter) / i.slidesPerGroup),
                            r = e * i.slidesPerGroup;
                        for (let t = 0; t < s; t += 1) m.push(m[m.length - 1] + r)
                    }
                    for (let s = 0; s < t.virtual.slidesBefore + t.virtual.slidesAfter; s += 1) 1 === i.slidesPerGroup && m.push(m[m.length - 1] + e), w.push(w[w.length - 1] + e), t.virtualSize += e
                }
                if (0 === m.length && (m = [0]), 0 !== i.spaceBetween) {
                    const s = t.isHorizontal() && o ? "marginLeft" : e("marginRight");
                    u.filter(((t, e) => !(i.cssMode && !i.loop) || e !== u.length - 1)).forEach((t => {
                        t.style[s] = `${M}px`
                    }))
                }
                if (i.centeredSlides && i.centeredSlidesBounds) {
                    let t = 0;
                    x.forEach((e => {
                        t += e + (i.spaceBetween ? i.spaceBetween : 0)
                    })), t -= i.spaceBetween;
                    const e = t - a;
                    m = m.map((t => t < 0 ? -b : t > e ? e + E : t))
                }
                if (i.centerInsufficientSlides) {
                    let t = 0;
                    if (x.forEach((e => {
                            t += e + (i.spaceBetween ? i.spaceBetween : 0)
                        })), t -= i.spaceBetween, t < a) {
                        const e = (a - t) / 2;
                        m.forEach(((t, s) => {
                            m[s] = t - e
                        })), w.forEach(((t, s) => {
                            w[s] = t + e
                        }))
                    }
                }
                if (Object.assign(t, {
                        slides: u,
                        snapGrid: m,
                        slidesGrid: w,
                        slidesSizesGrid: x
                    }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
                    c(r, "--swiper-centered-offset-before", -m[0] + "px"), c(r, "--swiper-centered-offset-after", t.size / 2 - x[x.length - 1] / 2 + "px");
                    const e = -t.snapGrid[0],
                        s = -t.slidesGrid[0];
                    t.snapGrid = t.snapGrid.map((t => t + e)), t.slidesGrid = t.slidesGrid.map((t => t + s))
                }
                if (f !== d && t.emit("slidesLengthChange"), m.length !== T && (t.params.watchOverflow && t.checkOverflow(), t.emit("snapGridLengthChange")), w.length !== S && t.emit("slidesGridLengthChange"), i.watchSlidesProgress && t.updateSlidesOffset(), !(h || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
                    const e = `${i.containerModifierClass}backface-hidden`,
                        s = t.el.classList.contains(e);
                    f <= i.maxBackfaceHiddenSlides ? s || t.el.classList.add(e) : s && t.el.classList.remove(e)
                }
            },
            updateAutoHeight: function(t) {
                const e = this,
                    s = [],
                    i = e.virtual && e.params.virtual.enabled;
                let r, n = 0;
                "number" == typeof t ? e.setTransition(t) : !0 === t && e.setTransition(e.params.speed);
                const a = t => i ? e.slides.filter((e => parseInt(e.getAttribute("data-swiper-slide-index"), 10) === t))[0] : e.slides[t];
                if ("auto" !== e.params.slidesPerView && e.params.slidesPerView > 1)
                    if (e.params.centeredSlides)(e.visibleSlides || []).forEach((t => {
                        s.push(t)
                    }));
                    else
                        for (r = 0; r < Math.ceil(e.params.slidesPerView); r += 1) {
                            const t = e.activeIndex + r;
                            if (t > e.slides.length && !i) break;
                            s.push(a(t))
                        } else s.push(a(e.activeIndex));
                for (r = 0; r < s.length; r += 1)
                    if (void 0 !== s[r]) {
                        const t = s[r].offsetHeight;
                        n = t > n ? t : n
                    }(n || 0 === n) && (e.wrapperEl.style.height = `${n}px`)
            },
            updateSlidesOffset: function() {
                const t = this,
                    e = t.slides,
                    s = t.isElement ? t.isHorizontal() ? t.wrapperEl.offsetLeft : t.wrapperEl.offsetTop : 0;
                for (let i = 0; i < e.length; i += 1) e[i].swiperSlideOffset = (t.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - s
            },
            updateSlidesProgress: function(t = this && this.translate || 0) {
                const e = this,
                    s = e.params,
                    {
                        slides: i,
                        rtlTranslate: r,
                        snapGrid: n
                    } = e;
                if (0 === i.length) return;
                void 0 === i[0].swiperSlideOffset && e.updateSlidesOffset();
                let a = -t;
                r && (a = t), i.forEach((t => {
                    t.classList.remove(s.slideVisibleClass)
                })), e.visibleSlidesIndexes = [], e.visibleSlides = [];
                for (let o = 0; o < i.length; o += 1) {
                    const t = i[o];
                    let l = t.swiperSlideOffset;
                    s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                    const h = (a + (s.centeredSlides ? e.minTranslate() : 0) - l) / (t.swiperSlideSize + s.spaceBetween),
                        d = (a - n[0] + (s.centeredSlides ? e.minTranslate() : 0) - l) / (t.swiperSlideSize + s.spaceBetween),
                        c = -(a - l),
                        u = c + e.slidesSizesGrid[o];
                    (c >= 0 && c < e.size - 1 || u > 1 && u <= e.size || c <= 0 && u >= e.size) && (e.visibleSlides.push(t), e.visibleSlidesIndexes.push(o), i[o].classList.add(s.slideVisibleClass)), t.progress = r ? -h : h, t.originalProgress = r ? -d : d
                }
            },
            updateProgress: function(t) {
                const e = this;
                if (void 0 === t) {
                    const s = e.rtlTranslate ? -1 : 1;
                    t = e && e.translate && e.translate * s || 0
                }
                const s = e.params,
                    i = e.maxTranslate() - e.minTranslate();
                let {
                    progress: r,
                    isBeginning: n,
                    isEnd: a,
                    progressLoop: o
                } = e;
                const l = n,
                    h = a;
                if (0 === i) r = 0, n = !0, a = !0;
                else {
                    r = (t - e.minTranslate()) / i;
                    const s = Math.abs(t - e.minTranslate()) < 1,
                        o = Math.abs(t - e.maxTranslate()) < 1;
                    n = s || r <= 0, a = o || r >= 1, s && (r = 0), o && (r = 1)
                }
                if (s.loop) {
                    const s = m(e.slides.filter((t => "0" === t.getAttribute("data-swiper-slide-index")))[0]),
                        i = m(e.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") == e.slides.length - 1))[0]),
                        r = e.slidesGrid[s],
                        n = e.slidesGrid[i],
                        a = e.slidesGrid[e.slidesGrid.length - 1],
                        l = Math.abs(t);
                    o = l >= r ? (l - r) / a : (l + a - n) / a, o > 1 && (o -= 1)
                }
                Object.assign(e, {
                    progress: r,
                    progressLoop: o,
                    isBeginning: n,
                    isEnd: a
                }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && e.updateSlidesProgress(t), n && !l && e.emit("reachBeginning toEdge"), a && !h && e.emit("reachEnd toEdge"), (l && !n || h && !a) && e.emit("fromEdge"), e.emit("progress", r)
            },
            updateSlidesClasses: function() {
                const t = this,
                    {
                        slides: e,
                        params: s,
                        slidesEl: i,
                        activeIndex: r
                    } = t,
                    n = t.virtual && s.virtual.enabled,
                    a = t => p(i, `.${s.slideClass}${t}, swiper-slide${t}`)[0];
                let o;
                if (e.forEach((t => {
                        t.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
                    })), n)
                    if (s.loop) {
                        let e = r - t.virtual.slidesBefore;
                        e < 0 && (e = t.virtual.slides.length + e), e >= t.virtual.slides.length && (e -= t.virtual.slides.length), o = a(`[data-swiper-slide-index="${e}"]`)
                    } else o = a(`[data-swiper-slide-index="${r}"]`);
                else o = e[r];
                if (o) {
                    o.classList.add(s.slideActiveClass);
                    let t = function(t, e) {
                        const s = [];
                        for (; t.nextElementSibling;) {
                            const i = t.nextElementSibling;
                            e ? i.matches(e) && s.push(i) : s.push(i), t = i
                        }
                        return s
                    }(o, `.${s.slideClass}, swiper-slide`)[0];
                    s.loop && !t && (t = e[0]), t && t.classList.add(s.slideNextClass);
                    let i = function(t, e) {
                        const s = [];
                        for (; t.previousElementSibling;) {
                            const i = t.previousElementSibling;
                            e ? i.matches(e) && s.push(i) : s.push(i), t = i
                        }
                        return s
                    }(o, `.${s.slideClass}, swiper-slide`)[0];
                    s.loop && 0 === !i && (i = e[e.length - 1]), i && i.classList.add(s.slidePrevClass)
                }
                t.emitSlidesClasses()
            },
            updateActiveIndex: function(t) {
                const e = this,
                    s = e.rtlTranslate ? e.translate : -e.translate,
                    {
                        snapGrid: i,
                        params: r,
                        activeIndex: n,
                        realIndex: a,
                        snapIndex: o
                    } = e;
                let l, h = t;
                const d = t => {
                    let s = t - e.virtual.slidesBefore;
                    return s < 0 && (s = e.virtual.slides.length + s), s >= e.virtual.slides.length && (s -= e.virtual.slides.length), s
                };
                if (void 0 === h && (h = function(t) {
                        const {
                            slidesGrid: e,
                            params: s
                        } = t, i = t.rtlTranslate ? t.translate : -t.translate;
                        let r;
                        for (let n = 0; n < e.length; n += 1) void 0 !== e[n + 1] ? i >= e[n] && i < e[n + 1] - (e[n + 1] - e[n]) / 2 ? r = n : i >= e[n] && i < e[n + 1] && (r = n + 1) : i >= e[n] && (r = n);
                        return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
                    }(e)), i.indexOf(s) >= 0) l = i.indexOf(s);
                else {
                    const t = Math.min(r.slidesPerGroupSkip, h);
                    l = t + Math.floor((h - t) / r.slidesPerGroup)
                }
                if (l >= i.length && (l = i.length - 1), h === n) return l !== o && (e.snapIndex = l, e.emit("snapIndexChange")), void(e.params.loop && e.virtual && e.params.virtual.enabled && (e.realIndex = d(h)));
                let c;
                c = e.virtual && r.virtual.enabled && r.loop ? d(h) : e.slides[h] ? parseInt(e.slides[h].getAttribute("data-swiper-slide-index") || h, 10) : h, Object.assign(e, {
                    snapIndex: l,
                    realIndex: c,
                    previousIndex: n,
                    activeIndex: h
                }), e.emit("activeIndexChange"), e.emit("snapIndexChange"), a !== c && e.emit("realIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange")
            },
            updateClickedSlide: function(t) {
                const e = this,
                    s = e.params,
                    i = t.closest(`.${s.slideClass}, swiper-slide`);
                let r, n = !1;
                if (i)
                    for (let a = 0; a < e.slides.length; a += 1)
                        if (e.slides[a] === i) {
                            n = !0, r = a;
                            break
                        }
                if (!i || !n) return e.clickedSlide = void 0, void(e.clickedIndex = void 0);
                e.clickedSlide = i, e.virtual && e.params.virtual.enabled ? e.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : e.clickedIndex = r, s.slideToClickedSlide && void 0 !== e.clickedIndex && e.clickedIndex !== e.activeIndex && e.slideToClickedSlide()
            }
        },
        translate: {
            getTranslate: function(t = (this.isHorizontal() ? "x" : "y")) {
                const {
                    params: e,
                    rtlTranslate: s,
                    translate: i,
                    wrapperEl: r
                } = this;
                if (e.virtualTranslate) return s ? -i : i;
                if (e.cssMode) return i;
                let n = l(r, t);
                return s && (n = -n), n || 0
            },
            setTranslate: function(t, e) {
                const s = this,
                    {
                        rtlTranslate: i,
                        params: r,
                        wrapperEl: n,
                        progress: a
                    } = s;
                let o, l = 0,
                    h = 0;
                s.isHorizontal() ? l = i ? -t : t : h = t, r.roundLengths && (l = Math.floor(l), h = Math.floor(h)), r.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -h : r.virtualTranslate || (n.style.transform = `translate3d(${l}px, ${h}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? l : h;
                const d = s.maxTranslate() - s.minTranslate();
                o = 0 === d ? 0 : (t - s.minTranslate()) / d, o !== a && s.updateProgress(t), s.emit("setTranslate", s.translate, e)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(t = 0, e = this.params.speed, s = !0, i = !0, r) {
                const n = this,
                    {
                        params: a,
                        wrapperEl: o
                    } = n;
                if (n.animating && a.preventInteractionOnTransition) return !1;
                const l = n.minTranslate(),
                    h = n.maxTranslate();
                let d;
                if (d = i && t > l ? l : i && t < h ? h : t, n.updateProgress(d), a.cssMode) {
                    const t = n.isHorizontal();
                    if (0 === e) o[t ? "scrollLeft" : "scrollTop"] = -d;
                    else {
                        if (!n.support.smoothScroll) return u({
                            swiper: n,
                            targetPosition: -d,
                            side: t ? "left" : "top"
                        }), !0;
                        o.scrollTo({
                            [t ? "left" : "top"]: -d,
                            behavior: "smooth"
                        })
                    }
                    return !0
                }
                return 0 === e ? (n.setTransition(0), n.setTranslate(d), s && (n.emit("beforeTransitionStart", e, r), n.emit("transitionEnd"))) : (n.setTransition(e), n.setTranslate(d), s && (n.emit("beforeTransitionStart", e, r), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(t) {
                    n && !n.destroyed && t.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, s && n.emit("transitionEnd"))
                }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0
            }
        },
        transition: {
            setTransition: function(t, e) {
                const s = this;
                s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${t}ms`), s.emit("setTransition", t, e)
            },
            transitionStart: function(t = !0, e) {
                const s = this,
                    {
                        params: i
                    } = s;
                i.cssMode || (i.autoHeight && s.updateAutoHeight(), M({
                    swiper: s,
                    runCallbacks: t,
                    direction: e,
                    step: "Start"
                }))
            },
            transitionEnd: function(t = !0, e) {
                const s = this,
                    {
                        params: i
                    } = s;
                s.animating = !1, i.cssMode || (s.setTransition(0), M({
                    swiper: s,
                    runCallbacks: t,
                    direction: e,
                    step: "End"
                }))
            }
        },
        slide: {
            slideTo: function(t = 0, e = this.params.speed, s = !0, i, r) {
                "string" == typeof t && (t = parseInt(t, 10));
                const n = this;
                let a = t;
                a < 0 && (a = 0);
                const {
                    params: o,
                    snapGrid: l,
                    slidesGrid: h,
                    previousIndex: d,
                    activeIndex: c,
                    rtlTranslate: p,
                    wrapperEl: f,
                    enabled: g
                } = n;
                if (n.animating && o.preventInteractionOnTransition || !g && !i && !r) return !1;
                const m = Math.min(n.params.slidesPerGroupSkip, a);
                let v = m + Math.floor((a - m) / n.params.slidesPerGroup);
                v >= l.length && (v = l.length - 1);
                const w = -l[v];
                if (o.normalizeSlideIndex)
                    for (let u = 0; u < h.length; u += 1) {
                        const t = -Math.floor(100 * w),
                            e = Math.floor(100 * h[u]),
                            s = Math.floor(100 * h[u + 1]);
                        void 0 !== h[u + 1] ? t >= e && t < s - (s - e) / 2 ? a = u : t >= e && t < s && (a = u + 1) : t >= e && (a = u)
                    }
                if (n.initialized && a !== c) {
                    if (!n.allowSlideNext && w < n.translate && w < n.minTranslate()) return !1;
                    if (!n.allowSlidePrev && w > n.translate && w > n.maxTranslate() && (c || 0) !== a) return !1
                }
                let x;
                if (a !== (d || 0) && s && n.emit("beforeSlideChangeStart"), n.updateProgress(w), x = a > c ? "next" : a < c ? "prev" : "reset", p && -w === n.translate || !p && w === n.translate) return n.updateActiveIndex(a), o.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), "slide" !== o.effect && n.setTranslate(w), "reset" !== x && (n.transitionStart(s, x), n.transitionEnd(s, x)), !1;
                if (o.cssMode) {
                    const t = n.isHorizontal(),
                        s = p ? w : -w;
                    if (0 === e) {
                        const e = n.virtual && n.params.virtual.enabled;
                        e && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), e && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame((() => {
                            f[t ? "scrollLeft" : "scrollTop"] = s
                        }))) : f[t ? "scrollLeft" : "scrollTop"] = s, e && requestAnimationFrame((() => {
                            n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1
                        }))
                    } else {
                        if (!n.support.smoothScroll) return u({
                            swiper: n,
                            targetPosition: s,
                            side: t ? "left" : "top"
                        }), !0;
                        f.scrollTo({
                            [t ? "left" : "top"]: s,
                            behavior: "smooth"
                        })
                    }
                    return !0
                }
                return n.setTransition(e), n.setTranslate(w), n.updateActiveIndex(a), n.updateSlidesClasses(), n.emit("beforeTransitionStart", e, i), n.transitionStart(s, x), 0 === e ? n.transitionEnd(s, x) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(t) {
                    n && !n.destroyed && t.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(s, x))
                }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0
            },
            slideToLoop: function(t = 0, e = this.params.speed, s = !0, i) {
                if ("string" == typeof t) {
                    t = parseInt(t, 10)
                }
                const r = this;
                let n = t;
                return r.params.loop && (r.virtual && r.params.virtual.enabled ? n += r.virtual.slidesBefore : n = m(r.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === n))[0])), r.slideTo(n, e, s, i)
            },
            slideNext: function(t = this.params.speed, e = !0, s) {
                const i = this,
                    {
                        enabled: r,
                        params: n,
                        animating: a
                    } = i;
                if (!r) return i;
                let o = n.slidesPerGroup;
                "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : o,
                    h = i.virtual && n.virtual.enabled;
                if (n.loop) {
                    if (a && !h && n.loopPreventsSliding) return !1;
                    i.loopFix({
                        direction: "next"
                    }), i._clientLeft = i.wrapperEl.clientLeft
                }
                return n.rewind && i.isEnd ? i.slideTo(0, t, e, s) : i.slideTo(i.activeIndex + l, t, e, s)
            },
            slidePrev: function(t = this.params.speed, e = !0, s) {
                const i = this,
                    {
                        params: r,
                        snapGrid: n,
                        slidesGrid: a,
                        rtlTranslate: o,
                        enabled: l,
                        animating: h
                    } = i;
                if (!l) return i;
                const d = i.virtual && r.virtual.enabled;
                if (r.loop) {
                    if (h && !d && r.loopPreventsSliding) return !1;
                    i.loopFix({
                        direction: "prev"
                    }), i._clientLeft = i.wrapperEl.clientLeft
                }

                function c(t) {
                    return t < 0 ? -Math.floor(Math.abs(t)) : Math.floor(t)
                }
                const u = c(o ? i.translate : -i.translate),
                    p = n.map((t => c(t)));
                let f = n[p.indexOf(u) - 1];
                if (void 0 === f && r.cssMode) {
                    let t;
                    n.forEach(((e, s) => {
                        u >= e && (t = s)
                    })), void 0 !== t && (f = n[t > 0 ? t - 1 : t])
                }
                let g = 0;
                if (void 0 !== f && (g = a.indexOf(f), g < 0 && (g = i.activeIndex - 1), "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (g = g - i.slidesPerViewDynamic("previous", !0) + 1, g = Math.max(g, 0))), r.rewind && i.isBeginning) {
                    const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                    return i.slideTo(r, t, e, s)
                }
                return i.slideTo(g, t, e, s)
            },
            slideReset: function(t = this.params.speed, e = !0, s) {
                return this.slideTo(this.activeIndex, t, e, s)
            },
            slideToClosest: function(t = this.params.speed, e = !0, s, i = .5) {
                const r = this;
                let n = r.activeIndex;
                const a = Math.min(r.params.slidesPerGroupSkip, n),
                    o = a + Math.floor((n - a) / r.params.slidesPerGroup),
                    l = r.rtlTranslate ? r.translate : -r.translate;
                if (l >= r.snapGrid[o]) {
                    const t = r.snapGrid[o];
                    l - t > (r.snapGrid[o + 1] - t) * i && (n += r.params.slidesPerGroup)
                } else {
                    const t = r.snapGrid[o - 1];
                    l - t <= (r.snapGrid[o] - t) * i && (n -= r.params.slidesPerGroup)
                }
                return n = Math.max(n, 0), n = Math.min(n, r.slidesGrid.length - 1), r.slideTo(n, t, e, s)
            },
            slideToClickedSlide: function() {
                const t = this,
                    {
                        params: e,
                        slidesEl: s
                    } = t,
                    i = "auto" === e.slidesPerView ? t.slidesPerViewDynamic() : e.slidesPerView;
                let r, n = t.clickedIndex;
                const o = t.isElement ? "swiper-slide" : `.${e.slideClass}`;
                if (e.loop) {
                    if (t.animating) return;
                    r = parseInt(t.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? n < t.loopedSlides - i / 2 || n > t.slides.length - t.loopedSlides + i / 2 ? (t.loopFix(), n = m(p(s, `${o}[data-swiper-slide-index="${r}"]`)[0]), a((() => {
                        t.slideTo(n)
                    }))) : t.slideTo(n) : n > t.slides.length - i ? (t.loopFix(), n = m(p(s, `${o}[data-swiper-slide-index="${r}"]`)[0]), a((() => {
                        t.slideTo(n)
                    }))) : t.slideTo(n)
                } else t.slideTo(n)
            }
        },
        loop: {
            loopCreate: function(t) {
                const e = this,
                    {
                        params: s,
                        slidesEl: i
                    } = e;
                if (!s.loop || e.virtual && e.params.virtual.enabled) return;
                p(i, `.${s.slideClass}, swiper-slide`).forEach(((t, e) => {
                    t.setAttribute("data-swiper-slide-index", e)
                })), e.loopFix({
                    slideRealIndex: t,
                    direction: s.centeredSlides ? void 0 : "next"
                })
            },
            loopFix: function({
                slideRealIndex: t,
                slideTo: e = !0,
                direction: s,
                setTranslate: i,
                activeSlideIndex: r,
                byController: n
            } = {}) {
                const a = this;
                if (!a.params.loop) return;
                a.emit("beforeLoopFix");
                const {
                    slides: o,
                    allowSlidePrev: l,
                    allowSlideNext: h,
                    slidesEl: d,
                    params: c
                } = a;
                if (a.allowSlidePrev = !0, a.allowSlideNext = !0, a.virtual && c.virtual.enabled) return e && (c.centeredSlides || 0 !== a.snapIndex ? c.centeredSlides && a.snapIndex < c.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0) : a.slideTo(a.virtual.slides.length, 0, !1, !0)), a.allowSlidePrev = l, a.allowSlideNext = h, void a.emit("loopFix");
                const u = "auto" === c.slidesPerView ? a.slidesPerViewDynamic() : Math.ceil(parseFloat(c.slidesPerView, 10));
                let p = c.loopedSlides || u;
                p % c.slidesPerGroup != 0 && (p += c.slidesPerGroup - p % c.slidesPerGroup), a.loopedSlides = p;
                const f = [],
                    g = [];
                let v = a.activeIndex;
                void 0 === r ? r = m(a.slides.filter((t => t.classList.contains("swiper-slide-active")))[0]) : v = r;
                const w = "next" === s || !s,
                    x = "prev" === s || !s;
                let b = 0,
                    E = 0;
                if (r < p) {
                    b = p - r;
                    for (let t = 0; t < p - r; t += 1) {
                        const e = t - Math.floor(t / o.length) * o.length;
                        f.push(o.length - e - 1)
                    }
                } else if (r > a.slides.length - 2 * p) {
                    E = r - (a.slides.length - 2 * p);
                    for (let t = 0; t < E; t += 1) {
                        const e = t - Math.floor(t / o.length) * o.length;
                        g.push(e)
                    }
                }
                if (x && f.forEach((t => {
                        d.prepend(a.slides[t])
                    })), w && g.forEach((t => {
                        d.append(a.slides[t])
                    })), a.recalcSlides(), c.watchSlidesProgress && a.updateSlidesOffset(), e)
                    if (f.length > 0 && x)
                        if (void 0 === t) {
                            const t = a.slidesGrid[v],
                                e = a.slidesGrid[v + b] - t;
                            a.slideTo(v + b, 0, !1, !0), i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += e)
                        } else i && a.slideToLoop(t, 0, !1, !0);
                else if (g.length > 0 && w)
                    if (void 0 === t) {
                        const t = a.slidesGrid[v],
                            e = a.slidesGrid[v - E] - t;
                        a.slideTo(v - E, 0, !1, !0), i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += e)
                    } else a.slideToLoop(t, 0, !1, !0);
                if (a.allowSlidePrev = l, a.allowSlideNext = h, a.controller && a.controller.control && !n) {
                    const e = {
                        slideRealIndex: t,
                        slideTo: !1,
                        direction: s,
                        setTranslate: i,
                        activeSlideIndex: r,
                        byController: !0
                    };
                    Array.isArray(a.controller.control) ? a.controller.control.forEach((t => {
                        t.params.loop && t.loopFix(e)
                    })) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix(e)
                }
                a.emit("loopFix")
            },
            loopDestroy: function() {
                const t = this,
                    {
                        slides: e,
                        params: s,
                        slidesEl: i
                    } = t;
                if (!s.loop || t.virtual && t.params.virtual.enabled) return;
                t.recalcSlides();
                const r = [];
                e.forEach((t => {
                    const e = void 0 === t.swiperSlideIndex ? 1 * t.getAttribute("data-swiper-slide-index") : t.swiperSlideIndex;
                    r[e] = t
                })), e.forEach((t => {
                    t.removeAttribute("data-swiper-slide-index")
                })), r.forEach((t => {
                    i.append(t)
                })), t.recalcSlides(), t.slideTo(t.realIndex, 0)
            }
        },
        grabCursor: {
            setGrabCursor: function(t) {
                const e = this;
                if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode) return;
                const s = "container" === e.params.touchEventsTarget ? e.el : e.wrapperEl;
                s.style.cursor = "move", s.style.cursor = t ? "grabbing" : "grab"
            },
            unsetGrabCursor: function() {
                const t = this;
                t.params.watchOverflow && t.isLocked || t.params.cssMode || (t["container" === t.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
            }
        },
        events: {
            attachEvents: function() {
                const t = this,
                    e = i(),
                    {
                        params: s
                    } = t;
                t.onTouchStart = y.bind(t), t.onTouchMove = A.bind(t), t.onTouchEnd = C.bind(t), s.cssMode && (t.onScroll = O.bind(t)), t.onClick = L.bind(t), t.onLoad = F.bind(t), k || (e.addEventListener("touchstart", z), k = !0), G(t, "on")
            },
            detachEvents: function() {
                G(this, "off")
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                const t = this,
                    {
                        realIndex: e,
                        initialized: s,
                        params: i,
                        el: r
                    } = t,
                    n = i.breakpoints;
                if (!n || n && 0 === Object.keys(n).length) return;
                const a = t.getBreakpoint(n, t.params.breakpointsBase, t.el);
                if (!a || t.currentBreakpoint === a) return;
                const o = (a in n ? n[a] : void 0) || t.originalParams,
                    l = R(t, i),
                    h = R(t, o),
                    c = i.enabled;
                l && !h ? (r.classList.remove(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`), t.emitContainerClasses()) : !l && h && (r.classList.add(`${i.containerModifierClass}grid`), (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`), t.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((e => {
                    const s = i[e] && i[e].enabled,
                        r = o[e] && o[e].enabled;
                    s && !r && t[e].disable(), !s && r && t[e].enable()
                }));
                const u = o.direction && o.direction !== i.direction,
                    p = i.loop && (o.slidesPerView !== i.slidesPerView || u);
                u && s && t.changeDirection(), d(t.params, o);
                const f = t.params.enabled;
                Object.assign(t, {
                    allowTouchMove: t.params.allowTouchMove,
                    allowSlideNext: t.params.allowSlideNext,
                    allowSlidePrev: t.params.allowSlidePrev
                }), c && !f ? t.disable() : !c && f && t.enable(), t.currentBreakpoint = a, t.emit("_beforeBreakpoint", o), p && s && (t.loopDestroy(), t.loopCreate(e), t.updateSlides()), t.emit("breakpoint", o)
            },
            getBreakpoint: function(t, e = "window", s) {
                if (!t || "container" === e && !s) return;
                let i = !1;
                const r = n(),
                    a = "window" === e ? r.innerHeight : s.clientHeight,
                    o = Object.keys(t).map((t => {
                        if ("string" == typeof t && 0 === t.indexOf("@")) {
                            const e = parseFloat(t.substr(1));
                            return {
                                value: a * e,
                                point: t
                            }
                        }
                        return {
                            value: t,
                            point: t
                        }
                    }));
                o.sort(((t, e) => parseInt(t.value, 10) - parseInt(e.value, 10)));
                for (let n = 0; n < o.length; n += 1) {
                    const {
                        point: t,
                        value: a
                    } = o[n];
                    "window" === e ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = t) : a <= s.clientWidth && (i = t)
                }
                return i || "max"
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                const t = this,
                    {
                        isLocked: e,
                        params: s
                    } = t,
                    {
                        slidesOffsetBefore: i
                    } = s;
                if (i) {
                    const e = t.slides.length - 1,
                        s = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * i;
                    t.isLocked = t.size > s
                } else t.isLocked = 1 === t.snapGrid.length;
                !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked), !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked), e && e !== t.isLocked && (t.isEnd = !1), e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock")
            }
        },
        classes: {
            addClasses: function() {
                const t = this,
                    {
                        classNames: e,
                        params: s,
                        rtl: i,
                        el: r,
                        device: n
                    } = t,
                    a = function(t, e) {
                        const s = [];
                        return t.forEach((t => {
                            "object" == typeof t ? Object.keys(t).forEach((i => {
                                t[i] && s.push(e + i)
                            })) : "string" == typeof t && s.push(e + t)
                        })), s
                    }(["initialized", s.direction, {
                        "free-mode": t.params.freeMode && s.freeMode.enabled
                    }, {
                        autoheight: s.autoHeight
                    }, {
                        rtl: i
                    }, {
                        grid: s.grid && s.grid.rows > 1
                    }, {
                        "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                    }, {
                        android: n.android
                    }, {
                        ios: n.ios
                    }, {
                        "css-mode": s.cssMode
                    }, {
                        centered: s.cssMode && s.centeredSlides
                    }, {
                        "watch-progress": s.watchSlidesProgress
                    }], s.containerModifierClass);
                e.push(...a), r.classList.add(...e), t.emitContainerClasses()
            },
            removeClasses: function() {
                const {
                    el: t,
                    classNames: e
                } = this;
                t.classList.remove(...e), this.emitContainerClasses()
            }
        }
    },
    V = {};
class U {
    constructor(...t) {
        let e, s;
        1 === t.length && t[0].constructor && "Object" === Object.prototype.toString.call(t[0]).slice(8, -1) ? s = t[0] : [e, s] = t, s || (s = {}), s = d({}, s), e && !s.el && (s.el = e);
        const r = i();
        if (s.el && "string" == typeof s.el && r.querySelectorAll(s.el).length > 1) {
            const t = [];
            return r.querySelectorAll(s.el).forEach((e => {
                const i = d({}, s, {
                    el: e
                });
                t.push(new U(i))
            })), t
        }
        const n = this;
        n.__swiper__ = !0, n.support = E(), n.device = T({
            userAgent: s.userAgent
        }), n.browser = S(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
        const a = {};
        n.modules.forEach((t => {
            t({
                params: s,
                swiper: n,
                extendParams: N(s, a),
                on: n.on.bind(n),
                once: n.once.bind(n),
                off: n.off.bind(n),
                emit: n.emit.bind(n)
            })
        }));
        const l = d({}, B, a);
        return n.params = d({}, l, V, s), n.originalParams = d({}, n.params), n.passedParams = d({}, s), n.params && n.params.on && Object.keys(n.params.on).forEach((t => {
            n.on(t, n.params.on[t])
        })), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
            enabled: n.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === n.params.direction,
            isVertical: () => "vertical" === n.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: n.params.allowSlideNext,
            allowSlidePrev: n.params.allowSlidePrev,
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: n.params.focusableElements,
                lastClickTime: o(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                evCache: []
            },
            allowClick: !0,
            allowTouchMove: n.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }), n.emit("_swiper"), n.params.init && n.init(), n
    }
    recalcSlides() {
        const {
            slidesEl: t,
            params: e
        } = this;
        this.slides = p(t, `.${e.slideClass}, swiper-slide`)
    }
    enable() {
        const t = this;
        t.enabled || (t.enabled = !0, t.params.grabCursor && t.setGrabCursor(), t.emit("enable"))
    }
    disable() {
        const t = this;
        t.enabled && (t.enabled = !1, t.params.grabCursor && t.unsetGrabCursor(), t.emit("disable"))
    }
    setProgress(t, e) {
        const s = this;
        t = Math.min(Math.max(t, 0), 1);
        const i = s.minTranslate(),
            r = (s.maxTranslate() - i) * t + i;
        s.translateTo(r, void 0 === e ? 0 : e), s.updateActiveIndex(), s.updateSlidesClasses()
    }
    emitContainerClasses() {
        const t = this;
        if (!t.params._emitClasses || !t.el) return;
        const e = t.el.className.split(" ").filter((e => 0 === e.indexOf("swiper") || 0 === e.indexOf(t.params.containerModifierClass)));
        t.emit("_containerClasses", e.join(" "))
    }
    getSlideClasses(t) {
        const e = this;
        return e.destroyed ? "" : t.className.split(" ").filter((t => 0 === t.indexOf("swiper-slide") || 0 === t.indexOf(e.params.slideClass))).join(" ")
    }
    emitSlidesClasses() {
        const t = this;
        if (!t.params._emitClasses || !t.el) return;
        const e = [];
        t.slides.forEach((s => {
            const i = t.getSlideClasses(s);
            e.push({
                slideEl: s,
                classNames: i
            }), t.emit("_slideClass", s, i)
        })), t.emit("_slideClasses", e)
    }
    slidesPerViewDynamic(t = "current", e = !1) {
        const {
            params: s,
            slides: i,
            slidesGrid: r,
            slidesSizesGrid: n,
            size: a,
            activeIndex: o
        } = this;
        let l = 1;
        if (s.centeredSlides) {
            let t, e = i[o].swiperSlideSize;
            for (let s = o + 1; s < i.length; s += 1) i[s] && !t && (e += i[s].swiperSlideSize, l += 1, e > a && (t = !0));
            for (let s = o - 1; s >= 0; s -= 1) i[s] && !t && (e += i[s].swiperSlideSize, l += 1, e > a && (t = !0))
        } else if ("current" === t)
            for (let h = o + 1; h < i.length; h += 1) {
                (e ? r[h] + n[h] - r[o] < a : r[h] - r[o] < a) && (l += 1)
            } else
                for (let h = o - 1; h >= 0; h -= 1) {
                    r[o] - r[h] < a && (l += 1)
                }
        return l
    }
    update() {
        const t = this;
        if (!t || t.destroyed) return;
        const {
            snapGrid: e,
            params: s
        } = t;

        function i() {
            const e = t.rtlTranslate ? -1 * t.translate : t.translate,
                s = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
            t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses()
        }
        let r;
        s.breakpoints && t.setBreakpoint(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e => {
            e.complete && I(t, e)
        })), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.params.freeMode && t.params.freeMode.enabled ? (i(), t.params.autoHeight && t.updateAutoHeight()) : (r = ("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0), r || i()), s.watchOverflow && e !== t.snapGrid && t.checkOverflow(), t.emit("update")
    }
    changeDirection(t, e = !0) {
        const s = this,
            i = s.params.direction;
        return t || (t = "horizontal" === i ? "vertical" : "horizontal"), t === i || "horizontal" !== t && "vertical" !== t || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${t}`), s.emitContainerClasses(), s.params.direction = t, s.slides.forEach((e => {
            "vertical" === t ? e.style.width = "" : e.style.height = ""
        })), s.emit("changeDirection"), e && s.update()), s
    }
    changeLanguageDirection(t) {
        const e = this;
        e.rtl && "rtl" === t || !e.rtl && "ltr" === t || (e.rtl = "rtl" === t, e.rtlTranslate = "horizontal" === e.params.direction && e.rtl, e.rtl ? (e.el.classList.add(`${e.params.containerModifierClass}rtl`), e.el.dir = "rtl") : (e.el.classList.remove(`${e.params.containerModifierClass}rtl`), e.el.dir = "ltr"), e.update())
    }
    mount(t) {
        const e = this;
        if (e.mounted) return !0;
        let s = t || e.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1;
        s.swiper = e, s.shadowEl && (e.isElement = !0);
        const i = () => `.${(e.params.wrapperClass||"").trim().split(" ").join(".")}`;
        let r = (() => {
            if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                return s.shadowRoot.querySelector(i())
            }
            return p(s, i())[0]
        })();
        return !r && e.params.createElements && (r = f("div", e.params.wrapperClass), s.append(r), p(s, `.${e.params.slideClass}`).forEach((t => {
            r.append(t)
        }))), Object.assign(e, {
            el: s,
            wrapperEl: r,
            slidesEl: e.isElement ? s : r,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === g(s, "direction"),
            rtlTranslate: "horizontal" === e.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === g(s, "direction")),
            wrongRTL: "-webkit-box" === g(r, "display")
        }), !0
    }
    init(t) {
        const e = this;
        if (e.initialized) return e;
        return !1 === e.mount(t) || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.enabled && e.setGrabCursor(), e.params.loop && e.virtual && e.params.virtual.enabled ? e.slideTo(e.params.initialSlide + e.virtual.slidesBefore, 0, e.params.runCallbacksOnInit, !1, !0) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit, !1, !0), e.params.loop && e.loopCreate(), e.attachEvents(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => {
            t.complete ? I(e, t) : t.addEventListener("load", (t => {
                I(e, t.target)
            }))
        })), e.initialized = !0, e.emit("init"), e.emit("afterInit")), e
    }
    destroy(t = !0, e = !0) {
        const s = this,
            {
                params: i,
                el: r,
                wrapperEl: n,
                slides: a
            } = s;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), e && (s.removeClasses(), r.removeAttribute("style"), n.removeAttribute("style"), a && a.length && a.forEach((t => {
            t.classList.remove(i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), t.removeAttribute("style"), t.removeAttribute("data-swiper-slide-index")
        }))), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((t => {
            s.off(t)
        })), !1 !== t && (s.el.swiper = null, function(t) {
            const e = t;
            Object.keys(e).forEach((t => {
                try {
                    e[t] = null
                } catch (s) {}
                try {
                    delete e[t]
                } catch (s) {}
            }))
        }(s)), s.destroyed = !0), null
    }
    static extendDefaults(t) {
        d(V, t)
    }
    static get extendedDefaults() {
        return V
    }
    static get defaults() {
        return B
    }
    static installModule(t) {
        U.prototype.__modules__ || (U.prototype.__modules__ = []);
        const e = U.prototype.__modules__;
        "function" == typeof t && e.indexOf(t) < 0 && e.push(t)
    }
    static use(t) {
        return Array.isArray(t) ? (t.forEach((t => U.installModule(t))), U) : (U.installModule(t), U)
    }
}

function X({
    swiper: t,
    extendParams: e,
    on: s,
    emit: i
}) {
    e({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }), t.navigation = {
        nextEl: null,
        prevEl: null
    };
    const r = t => (Array.isArray(t) || (t = [t].filter((t => !!t))), t);

    function n(e) {
        let s;
        return e && "string" == typeof e && t.isElement && (s = t.el.shadowRoot.querySelector(e), s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))), e && !s ? e : s)
    }

    function a(e, s) {
        const i = t.params.navigation;
        (e = r(e)).forEach((e => {
            e && (e.classList[s ? "add" : "remove"](i.disabledClass), "BUTTON" === e.tagName && (e.disabled = s), t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass))
        }))
    }

    function o() {
        const {
            nextEl: e,
            prevEl: s
        } = t.navigation;
        if (t.params.loop) return a(s, !1), void a(e, !1);
        a(s, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind)
    }

    function l(e) {
        e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), i("navigationPrev"))
    }

    function h(e) {
        e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), i("navigationNext"))
    }

    function d() {
        const e = t.params.navigation;
        if (t.params.navigation = function(t, e, s, i) {
                return t.params.createElements && Object.keys(i).forEach((r => {
                    if (!s[r] && !0 === s.auto) {
                        let n = p(t.el, `.${i[r]}`)[0];
                        n || (n = f("div", i[r]), n.className = i[r], t.el.append(n)), s[r] = n, e[r] = n
                    }
                })), s
            }(t, t.originalParams.navigation, t.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }), !e.nextEl && !e.prevEl) return;
        let s = n(e.nextEl),
            i = n(e.prevEl);
        Object.assign(t.navigation, {
            nextEl: s,
            prevEl: i
        }), s = r(s), i = r(i);
        const a = (s, i) => {
            s && s.addEventListener("click", "next" === i ? h : l), !t.enabled && s && s.classList.add(e.lockClass)
        };
        s.forEach((t => a(t, "next"))), i.forEach((t => a(t, "prev")))
    }

    function c() {
        let {
            nextEl: e,
            prevEl: s
        } = t.navigation;
        e = r(e), s = r(s);
        const i = (e, s) => {
            e.removeEventListener("click", "next" === s ? h : l), e.classList.remove(t.params.navigation.disabledClass)
        };
        e.forEach((t => i(t, "next"))), s.forEach((t => i(t, "prev")))
    }
    s("init", (() => {
        !1 === t.params.navigation.enabled ? u() : (d(), o())
    })), s("toEdge fromEdge lock unlock", (() => {
        o()
    })), s("destroy", (() => {
        c()
    })), s("enable disable", (() => {
        let {
            nextEl: e,
            prevEl: s
        } = t.navigation;
        e = r(e), s = r(s), [...e, ...s].filter((t => !!t)).forEach((e => e.classList[t.enabled ? "remove" : "add"](t.params.navigation.lockClass)))
    })), s("click", ((e, s) => {
        let {
            nextEl: n,
            prevEl: a
        } = t.navigation;
        n = r(n), a = r(a);
        const o = s.target;
        if (t.params.navigation.hideOnClick && !a.includes(o) && !n.includes(o)) {
            if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === o || t.pagination.el.contains(o))) return;
            let e;
            n.length ? e = n[0].classList.contains(t.params.navigation.hiddenClass) : a.length && (e = a[0].classList.contains(t.params.navigation.hiddenClass)), i(!0 === e ? "navigationShow" : "navigationHide"), [...n, ...a].filter((t => !!t)).forEach((e => e.classList.toggle(t.params.navigation.hiddenClass)))
        }
    }));
    const u = () => {
        t.el.classList.add(t.params.navigation.navigationDisabledClass), c()
    };
    Object.assign(t.navigation, {
        enable: () => {
            t.el.classList.remove(t.params.navigation.navigationDisabledClass), d(), o()
        },
        disable: u,
        update: o,
        init: d,
        destroy: c
    })
}

function q(t) {
    let e = t[0],
        s = t[1],
        i = t[2];
    return Math.sqrt(e * e + s * s + i * i)
}

function j(t, e) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
}

function W(t, e, s) {
    return t[0] = e[0] + s[0], t[1] = e[1] + s[1], t[2] = e[2] + s[2], t
}

function Y(t, e, s) {
    return t[0] = e[0] - s[0], t[1] = e[1] - s[1], t[2] = e[2] - s[2], t
}

function $(t, e, s) {
    return t[0] = e[0] * s, t[1] = e[1] * s, t[2] = e[2] * s, t
}

function H(t) {
    let e = t[0],
        s = t[1],
        i = t[2];
    return e * e + s * s + i * i
}

function Z(t, e) {
    let s = e[0],
        i = e[1],
        r = e[2],
        n = s * s + i * i + r * r;
    return n > 0 && (n = 1 / Math.sqrt(n)), t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t
}

function K(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
}

function Q(t, e, s) {
    let i = e[0],
        r = e[1],
        n = e[2],
        a = s[0],
        o = s[1],
        l = s[2];
    return t[0] = r * l - n * o, t[1] = n * a - i * l, t[2] = i * o - r * a, t
}
Object.keys(D).forEach((t => {
    Object.keys(D[t]).forEach((e => {
        U.prototype[e] = D[t][e]
    }))
})), U.use([function({
    swiper: t,
    on: e,
    emit: s
}) {
    const i = n();
    let r = null,
        a = null;
    const o = () => {
            t && !t.destroyed && t.initialized && (s("beforeResize"), s("resize"))
        },
        l = () => {
            t && !t.destroyed && t.initialized && s("orientationchange")
        };
    e("init", (() => {
        t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (r = new ResizeObserver((e => {
            a = i.requestAnimationFrame((() => {
                const {
                    width: s,
                    height: i
                } = t;
                let r = s,
                    n = i;
                e.forEach((({
                    contentBoxSize: e,
                    contentRect: s,
                    target: i
                }) => {
                    i && i !== t.el || (r = s ? s.width : (e[0] || e).inlineSize, n = s ? s.height : (e[0] || e).blockSize)
                })), r === s && n === i || o()
            }))
        })), r.observe(t.el)) : (i.addEventListener("resize", o), i.addEventListener("orientationchange", l))
    })), e("destroy", (() => {
        a && i.cancelAnimationFrame(a), r && r.unobserve && t.el && (r.unobserve(t.el), r = null), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", l)
    }))
}, function({
    swiper: t,
    extendParams: e,
    on: s,
    emit: i
}) {
    const r = [],
        a = n(),
        o = (t, e = {}) => {
            const s = new(a.MutationObserver || a.WebkitMutationObserver)((t => {
                if (1 === t.length) return void i("observerUpdate", t[0]);
                const e = function() {
                    i("observerUpdate", t[0])
                };
                a.requestAnimationFrame ? a.requestAnimationFrame(e) : a.setTimeout(e, 0)
            }));
            s.observe(t, {
                attributes: void 0 === e.attributes || e.attributes,
                childList: void 0 === e.childList || e.childList,
                characterData: void 0 === e.characterData || e.characterData
            }), r.push(s)
        };
    e({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }), s("init", (() => {
        if (t.params.observer) {
            if (t.params.observeParents) {
                const e = function(t, e) {
                    const s = [];
                    let i = t.parentElement;
                    for (; i;) e ? i.matches(e) && s.push(i) : s.push(i), i = i.parentElement;
                    return s
                }(t.el);
                for (let t = 0; t < e.length; t += 1) o(e[t])
            }
            o(t.el, {
                childList: t.params.observeSlideChildren
            }), o(t.wrapperEl, {
                attributes: !1
            })
        }
    })), s("destroy", (() => {
        r.forEach((t => {
            t.disconnect()
        })), r.splice(0, r.length)
    }))
}]);
const J = function() {
    const t = [0, 0, 0],
        e = [0, 0, 0];
    return function(s, i) {
        j(t, s), j(e, i), Z(t, t), Z(e, e);
        let r = K(t, e);
        return r > 1 ? 0 : r < -1 ? Math.PI : Math.acos(r)
    }
}();
class tt extends Array {
    constructor(t = 0, e = t, s = t) {
        return super(t, e, s), this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    set x(t) {
        this[0] = t
    }
    set y(t) {
        this[1] = t
    }
    set z(t) {
        this[2] = t
    }
    set(t, e = t, s = t) {
        return t.length ? this.copy(t) : (function(t, e, s, i) {
            t[0] = e, t[1] = s, t[2] = i
        }(this, t, e, s), this)
    }
    copy(t) {
        return j(this, t), this
    }
    add(t, e) {
        return e ? W(this, t, e) : W(this, this, t), this
    }
    sub(t, e) {
        return e ? Y(this, t, e) : Y(this, this, t), this
    }
    multiply(t) {
        var e, s, i;
        return t.length ? (s = this, i = t, (e = this)[0] = s[0] * i[0], e[1] = s[1] * i[1], e[2] = s[2] * i[2]) : $(this, this, t), this
    }
    divide(t) {
        var e, s, i;
        return t.length ? (s = this, i = t, (e = this)[0] = s[0] / i[0], e[1] = s[1] / i[1], e[2] = s[2] / i[2]) : $(this, this, 1 / t), this
    }
    inverse(t = this) {
        var e, s;
        return s = t, (e = this)[0] = 1 / s[0], e[1] = 1 / s[1], e[2] = 1 / s[2], this
    }
    len() {
        return q(this)
    }
    distance(t) {
        return t ? function(t, e) {
            let s = e[0] - t[0],
                i = e[1] - t[1],
                r = e[2] - t[2];
            return Math.sqrt(s * s + i * i + r * r)
        }(this, t) : q(this)
    }
    squaredLen() {
        return H(this)
    }
    squaredDistance(t) {
        return t ? function(t, e) {
            let s = e[0] - t[0],
                i = e[1] - t[1],
                r = e[2] - t[2];
            return s * s + i * i + r * r
        }(this, t) : H(this)
    }
    negate(t = this) {
        var e, s;
        return s = t, (e = this)[0] = -s[0], e[1] = -s[1], e[2] = -s[2], this
    }
    cross(t, e) {
        return e ? Q(this, t, e) : Q(this, this, t), this
    }
    scale(t) {
        return $(this, this, t), this
    }
    normalize() {
        return Z(this, this), this
    }
    dot(t) {
        return K(this, t)
    }
    equals(t) {
        return s = t, (e = this)[0] === s[0] && e[1] === s[1] && e[2] === s[2];
        var e, s
    }
    applyMatrix3(t) {
        return function(t, e, s) {
            let i = e[0],
                r = e[1],
                n = e[2];
            t[0] = i * s[0] + r * s[3] + n * s[6], t[1] = i * s[1] + r * s[4] + n * s[7], t[2] = i * s[2] + r * s[5] + n * s[8]
        }(this, this, t), this
    }
    applyMatrix4(t) {
        return function(t, e, s) {
            let i = e[0],
                r = e[1],
                n = e[2],
                a = s[3] * i + s[7] * r + s[11] * n + s[15];
            a = a || 1, t[0] = (s[0] * i + s[4] * r + s[8] * n + s[12]) / a, t[1] = (s[1] * i + s[5] * r + s[9] * n + s[13]) / a, t[2] = (s[2] * i + s[6] * r + s[10] * n + s[14]) / a
        }(this, this, t), this
    }
    scaleRotateMatrix4(t) {
        return function(t, e, s) {
            let i = e[0],
                r = e[1],
                n = e[2],
                a = s[3] * i + s[7] * r + s[11] * n + s[15];
            a = a || 1, t[0] = (s[0] * i + s[4] * r + s[8] * n) / a, t[1] = (s[1] * i + s[5] * r + s[9] * n) / a, t[2] = (s[2] * i + s[6] * r + s[10] * n) / a
        }(this, this, t), this
    }
    applyQuaternion(t) {
        return function(t, e, s) {
            let i = e[0],
                r = e[1],
                n = e[2],
                a = s[0],
                o = s[1],
                l = s[2],
                h = o * n - l * r,
                d = l * i - a * n,
                c = a * r - o * i,
                u = o * c - l * d,
                p = l * h - a * c,
                f = a * d - o * h,
                g = 2 * s[3];
            h *= g, d *= g, c *= g, u *= 2, p *= 2, f *= 2, t[0] = i + h + u, t[1] = r + d + p, t[2] = n + c + f
        }(this, this, t), this
    }
    angle(t) {
        return J(this, t)
    }
    lerp(t, e) {
        return function(t, e, s, i) {
            let r = e[0],
                n = e[1],
                a = e[2];
            t[0] = r + i * (s[0] - r), t[1] = n + i * (s[1] - n), t[2] = a + i * (s[2] - a)
        }(this, this, t, e), this
    }
    clone() {
        return new tt(this[0], this[1], this[2])
    }
    fromArray(t, e = 0) {
        return this[0] = t[e], this[1] = t[e + 1], this[2] = t[e + 2], this
    }
    toArray(t = [], e = 0) {
        return t[e] = this[0], t[e + 1] = this[1], t[e + 2] = this[2], t
    }
    transformDirection(t) {
        const e = this[0],
            s = this[1],
            i = this[2];
        return this[0] = t[0] * e + t[4] * s + t[8] * i, this[1] = t[1] * e + t[5] * s + t[9] * i, this[2] = t[2] * e + t[6] * s + t[10] * i, this.normalize()
    }
}
const et = new tt;
let st = 1,
    it = 1,
    rt = !1;
class nt {
    constructor(t, e = {}) {
        t.canvas || console.error("gl not passed as first argument to Geometry"), this.gl = t, this.attributes = e, this.id = st++, this.VAOs = {}, this.drawRange = {
            start: 0,
            count: 0
        }, this.instancedCount = 0, this.gl.renderer.bindVertexArray(null), this.gl.renderer.currentGeometry = null, this.glState = this.gl.renderer.state;
        for (let s in e) this.addAttribute(s, e[s])
    }
    addAttribute(t, e) {
        if (this.attributes[t] = e, e.id = it++, e.size = e.size || 1, e.type = e.type || (e.data.constructor === Float32Array ? this.gl.FLOAT : e.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT), e.target = "index" === t ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER, e.normalized = e.normalized || !1, e.stride = e.stride || 0, e.offset = e.offset || 0, e.count = e.count || (e.stride ? e.data.byteLength / e.stride : e.data.length / e.size), e.divisor = e.instanced || 0, e.needsUpdate = !1, e.usage = e.usage || this.gl.STATIC_DRAW, e.buffer || this.updateAttribute(e), e.divisor) {
            if (this.isInstanced = !0, this.instancedCount && this.instancedCount !== e.count * e.divisor) return console.warn("geometry has multiple instanced buffers of different length"), this.instancedCount = Math.min(this.instancedCount, e.count * e.divisor);
            this.instancedCount = e.count * e.divisor
        } else "index" === t ? this.drawRange.count = e.count : this.attributes.index || (this.drawRange.count = Math.max(this.drawRange.count, e.count))
    }
    updateAttribute(t) {
        const e = !t.buffer;
        e && (t.buffer = this.gl.createBuffer()), this.glState.boundBuffer !== t.buffer && (this.gl.bindBuffer(t.target, t.buffer), this.glState.boundBuffer = t.buffer), e ? this.gl.bufferData(t.target, t.data, t.usage) : this.gl.bufferSubData(t.target, 0, t.data), t.needsUpdate = !1
    }
    setIndex(t) {
        this.addAttribute("index", t)
    }
    setDrawRange(t, e) {
        this.drawRange.start = t, this.drawRange.count = e
    }
    setInstancedCount(t) {
        this.instancedCount = t
    }
    createVAO(t) {
        this.VAOs[t.attributeOrder] = this.gl.renderer.createVertexArray(), this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]), this.bindAttributes(t)
    }
    bindAttributes(t) {
        t.attributeLocations.forEach(((t, {
            name: e,
            type: s
        }) => {
            if (!this.attributes[e]) return void console.warn(`active attribute ${e} not being supplied`);
            const i = this.attributes[e];
            this.gl.bindBuffer(i.target, i.buffer), this.glState.boundBuffer = i.buffer;
            let r = 1;
            35674 === s && (r = 2), 35675 === s && (r = 3), 35676 === s && (r = 4);
            const n = i.size / r,
                a = 1 === r ? 0 : r * r * r,
                o = 1 === r ? 0 : r * r;
            for (let l = 0; l < r; l++) this.gl.vertexAttribPointer(t + l, n, i.type, i.normalized, i.stride + a, i.offset + l * o), this.gl.enableVertexAttribArray(t + l), this.gl.renderer.vertexAttribDivisor(t + l, i.divisor)
        })), this.attributes.index && this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer)
    }
    draw({
        program: t,
        mode: e = this.gl.TRIANGLES
    }) {
        this.gl.renderer.currentGeometry !== `${this.id}_${t.attributeOrder}` && (this.VAOs[t.attributeOrder] || this.createVAO(t), this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]), this.gl.renderer.currentGeometry = `${this.id}_${t.attributeOrder}`), t.attributeLocations.forEach(((t, {
            name: e
        }) => {
            const s = this.attributes[e];
            s.needsUpdate && this.updateAttribute(s)
        })), this.isInstanced ? this.attributes.index ? this.gl.renderer.drawElementsInstanced(e, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + 2 * this.drawRange.start, this.instancedCount) : this.gl.renderer.drawArraysInstanced(e, this.drawRange.start, this.drawRange.count, this.instancedCount) : this.attributes.index ? this.gl.drawElements(e, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + 2 * this.drawRange.start) : this.gl.drawArrays(e, this.drawRange.start, this.drawRange.count)
    }
    getPosition() {
        const t = this.attributes.position;
        return t.data ? t : rt ? void 0 : (console.warn("No position buffer data found to compute bounds"), rt = !0)
    }
    computeBoundingBox(t) {
        t || (t = this.getPosition());
        const e = t.data,
            s = t.stride ? t.stride / e.BYTES_PER_ELEMENT : t.size;
        this.bounds || (this.bounds = {
            min: new tt,
            max: new tt,
            center: new tt,
            scale: new tt,
            radius: 1 / 0
        });
        const i = this.bounds.min,
            r = this.bounds.max,
            n = this.bounds.center,
            a = this.bounds.scale;
        i.set(1 / 0), r.set(-1 / 0);
        for (let o = 0, l = e.length; o < l; o += s) {
            const t = e[o],
                s = e[o + 1],
                n = e[o + 2];
            i.x = Math.min(t, i.x), i.y = Math.min(s, i.y), i.z = Math.min(n, i.z), r.x = Math.max(t, r.x), r.y = Math.max(s, r.y), r.z = Math.max(n, r.z)
        }
        a.sub(r, i), n.add(i, r).divide(2)
    }
    computeBoundingSphere(t) {
        t || (t = this.getPosition());
        const e = t.data,
            s = t.stride ? t.stride / e.BYTES_PER_ELEMENT : t.size;
        this.bounds || this.computeBoundingBox(t);
        let i = 0;
        for (let r = 0, n = e.length; r < n; r += s) et.fromArray(e, r), i = Math.max(i, this.bounds.center.squaredDistance(et));
        this.bounds.radius = Math.sqrt(i)
    }
    remove() {
        for (let t in this.VAOs) this.gl.renderer.deleteVertexArray(this.VAOs[t]), delete this.VAOs[t];
        for (let t in this.attributes) this.gl.deleteBuffer(this.attributes[t].buffer), delete this.attributes[t]
    }
}
let at = 1;
const ot = {};
class lt {
    constructor(t, {
        vertex: e,
        fragment: s,
        uniforms: i = {},
        transparent: r = !1,
        cullFace: n = t.BACK,
        frontFace: a = t.CCW,
        depthTest: o = !0,
        depthWrite: l = !0,
        depthFunc: h = t.LESS
    } = {}) {
        t.canvas || console.error("gl not passed as fist argument to Program"), this.gl = t, this.uniforms = i, this.id = at++, e || console.warn("vertex shader not supplied"), s || console.warn("fragment shader not supplied"), this.transparent = r, this.cullFace = n, this.frontFace = a, this.depthTest = o, this.depthWrite = l, this.depthFunc = h, this.blendFunc = {}, this.blendEquation = {}, this.transparent && !this.blendFunc.src && (this.gl.renderer.premultipliedAlpha ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA) : this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA));
        const d = t.createShader(t.VERTEX_SHADER);
        t.shaderSource(d, e), t.compileShader(d), "" !== t.getShaderInfoLog(d) && console.warn(`${t.getShaderInfoLog(d)}\nVertex Shader\n${dt(e)}`);
        const c = t.createShader(t.FRAGMENT_SHADER);
        if (t.shaderSource(c, s), t.compileShader(c), "" !== t.getShaderInfoLog(c) && console.warn(`${t.getShaderInfoLog(c)}\nFragment Shader\n${dt(s)}`), this.program = t.createProgram(), t.attachShader(this.program, d), t.attachShader(this.program, c), t.linkProgram(this.program), !t.getProgramParameter(this.program, t.LINK_STATUS)) return console.warn(t.getProgramInfoLog(this.program));
        t.deleteShader(d), t.deleteShader(c), this.uniformLocations = new Map;
        let u = t.getProgramParameter(this.program, t.ACTIVE_UNIFORMS);
        for (let g = 0; g < u; g++) {
            let e = t.getActiveUniform(this.program, g);
            this.uniformLocations.set(e, t.getUniformLocation(this.program, e.name));
            const s = e.name.match(/(\w+)/g);
            e.uniformName = s[0], 3 === s.length ? (e.isStructArray = !0, e.structIndex = Number(s[1]), e.structProperty = s[2]) : 2 === s.length && isNaN(Number(s[1])) && (e.isStruct = !0, e.structProperty = s[1])
        }
        this.attributeLocations = new Map;
        const p = [],
            f = t.getProgramParameter(this.program, t.ACTIVE_ATTRIBUTES);
        for (let g = 0; g < f; g++) {
            const e = t.getActiveAttrib(this.program, g),
                s = t.getAttribLocation(this.program, e.name); - 1 !== s && (p[s] = e.name, this.attributeLocations.set(e, s))
        }
        this.attributeOrder = p.join("")
    }
    setBlendFunc(t, e, s, i) {
        this.blendFunc.src = t, this.blendFunc.dst = e, this.blendFunc.srcAlpha = s, this.blendFunc.dstAlpha = i, t && (this.transparent = !0)
    }
    setBlendEquation(t, e) {
        this.blendEquation.modeRGB = t, this.blendEquation.modeAlpha = e
    }
    applyState() {
        this.depthTest ? this.gl.renderer.enable(this.gl.DEPTH_TEST) : this.gl.renderer.disable(this.gl.DEPTH_TEST), this.cullFace ? this.gl.renderer.enable(this.gl.CULL_FACE) : this.gl.renderer.disable(this.gl.CULL_FACE), this.blendFunc.src ? this.gl.renderer.enable(this.gl.BLEND) : this.gl.renderer.disable(this.gl.BLEND), this.cullFace && this.gl.renderer.setCullFace(this.cullFace), this.gl.renderer.setFrontFace(this.frontFace), this.gl.renderer.setDepthMask(this.depthWrite), this.gl.renderer.setDepthFunc(this.depthFunc), this.blendFunc.src && this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha), this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha)
    }
    use({
        flipFaces: t = !1
    } = {}) {
        let e = -1;
        this.gl.renderer.state.currentProgram === this.id || (this.gl.useProgram(this.program), this.gl.renderer.state.currentProgram = this.id), this.uniformLocations.forEach(((t, s) => {
            let i = s.uniformName,
                r = this.uniforms[i];
            if (s.isStruct && (r = r[s.structProperty], i += `.${s.structProperty}`), s.isStructArray && (r = r[s.structIndex][s.structProperty], i += `[${s.structIndex}].${s.structProperty}`), !r) return ut(`Active uniform ${i} has not been supplied`);
            if (r && void 0 === r.value) return ut(`${i} uniform is missing a value parameter`);
            if (r.value.texture) return e += 1, r.value.update(e), ht(this.gl, s.type, t, e);
            if (r.value.length && r.value[0].texture) {
                const i = [];
                return r.value.forEach((t => {
                    e += 1, t.update(e), i.push(e)
                })), ht(this.gl, s.type, t, i)
            }
            ht(this.gl, s.type, t, r.value)
        })), this.applyState(), t && this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW)
    }
    remove() {
        this.gl.deleteProgram(this.program)
    }
}

function ht(t, e, s, i) {
    i = i.length ? function(t) {
        const e = t.length,
            s = t[0].length;
        if (void 0 === s) return t;
        const i = e * s;
        let r = ot[i];
        r || (ot[i] = r = new Float32Array(i));
        for (let n = 0; n < e; n++) r.set(t[n], n * s);
        return r
    }(i) : i;
    const r = t.renderer.state.uniformLocations.get(s);
    if (i.length)
        if (void 0 === r || r.length !== i.length) t.renderer.state.uniformLocations.set(s, i.slice(0));
        else {
            if (function(t, e) {
                    if (t.length !== e.length) return !1;
                    for (let s = 0, i = t.length; s < i; s++)
                        if (t[s] !== e[s]) return !1;
                    return !0
                }(r, i)) return;
            r.set ? r.set(i) : function(t, e) {
                for (let s = 0, i = t.length; s < i; s++) t[s] = e[s]
            }(r, i), t.renderer.state.uniformLocations.set(s, r)
        }
    else {
        if (r === i) return;
        t.renderer.state.uniformLocations.set(s, i)
    }
    switch (e) {
        case 5126:
            return i.length ? t.uniform1fv(s, i) : t.uniform1f(s, i);
        case 35664:
            return t.uniform2fv(s, i);
        case 35665:
            return t.uniform3fv(s, i);
        case 35666:
            return t.uniform4fv(s, i);
        case 35670:
        case 5124:
        case 35678:
        case 35680:
            return i.length ? t.uniform1iv(s, i) : t.uniform1i(s, i);
        case 35671:
        case 35667:
            return t.uniform2iv(s, i);
        case 35672:
        case 35668:
            return t.uniform3iv(s, i);
        case 35673:
        case 35669:
            return t.uniform4iv(s, i);
        case 35674:
            return t.uniformMatrix2fv(s, !1, i);
        case 35675:
            return t.uniformMatrix3fv(s, !1, i);
        case 35676:
            return t.uniformMatrix4fv(s, !1, i)
    }
}

function dt(t) {
    let e = t.split("\n");
    for (let s = 0; s < e.length; s++) e[s] = s + 1 + ": " + e[s];
    return e.join("\n")
}
let ct = 0;

function ut(t) {
    ct > 100 || (console.warn(t), ct++, ct > 100 && console.warn("More than 100 program warnings - stopping logs."))
}
const pt = new tt;
let ft = 1;
class gt {
    constructor({
        canvas: t = document.createElement("canvas"),
        width: e = 300,
        height: s = 150,
        dpr: i = 1,
        alpha: r = !1,
        depth: n = !0,
        stencil: a = !1,
        antialias: o = !1,
        premultipliedAlpha: l = !1,
        preserveDrawingBuffer: h = !1,
        powerPreference: d = "default",
        autoClear: c = !0,
        webgl: u = 2
    } = {}) {
        const p = {
            alpha: r,
            depth: n,
            stencil: a,
            antialias: o,
            premultipliedAlpha: l,
            preserveDrawingBuffer: h,
            powerPreference: d
        };
        this.dpr = i, this.alpha = r, this.color = !0, this.depth = n, this.stencil = a, this.premultipliedAlpha = l, this.autoClear = c, this.id = ft++, 2 === u && (this.gl = t.getContext("webgl2", p)), this.isWebgl2 = !!this.gl, this.gl || (this.gl = t.getContext("webgl", p)), this.gl || console.error("unable to create webgl context"), this.gl.renderer = this, this.setSize(e, s), this.state = {}, this.state.blendFunc = {
            src: this.gl.ONE,
            dst: this.gl.ZERO
        }, this.state.blendEquation = {
            modeRGB: this.gl.FUNC_ADD
        }, this.state.cullFace = null, this.state.frontFace = this.gl.CCW, this.state.depthMask = !0, this.state.depthFunc = this.gl.LESS, this.state.premultiplyAlpha = !1, this.state.flipY = !1, this.state.unpackAlignment = 4, this.state.framebuffer = null, this.state.viewport = {
            x: 0,
            y: 0,
            width: null,
            height: null
        }, this.state.textureUnits = [], this.state.activeTextureUnit = 0, this.state.boundBuffer = null, this.state.uniformLocations = new Map, this.state.currentProgram = null, this.extensions = {}, this.isWebgl2 ? (this.getExtension("EXT_color_buffer_float"), this.getExtension("OES_texture_float_linear")) : (this.getExtension("OES_texture_float"), this.getExtension("OES_texture_float_linear"), this.getExtension("OES_texture_half_float"), this.getExtension("OES_texture_half_float_linear"), this.getExtension("OES_element_index_uint"), this.getExtension("OES_standard_derivatives"), this.getExtension("EXT_sRGB"), this.getExtension("WEBGL_depth_texture"), this.getExtension("WEBGL_draw_buffers")), this.getExtension("WEBGL_compressed_texture_astc"), this.getExtension("EXT_texture_compression_bptc"), this.getExtension("WEBGL_compressed_texture_s3tc"), this.getExtension("WEBGL_compressed_texture_etc1"), this.getExtension("WEBGL_compressed_texture_pvrtc"), this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"), this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE"), this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE"), this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE"), this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES"), this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES"), this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES"), this.drawBuffers = this.getExtension("WEBGL_draw_buffers", "drawBuffers", "drawBuffersWEBGL"), this.parameters = {}, this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS), this.parameters.maxAnisotropy = this.getExtension("EXT_texture_filter_anisotropic") ? this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
    }
    setSize(t, e) {
        this.width = t, this.height = e, this.gl.canvas.width = t * this.dpr, this.gl.canvas.height = e * this.dpr, Object.assign(this.gl.canvas.style, {
            width: t + "px",
            height: e + "px"
        })
    }
    setViewport(t, e, s = 0, i = 0) {
        this.state.viewport.width === t && this.state.viewport.height === e || (this.state.viewport.width = t, this.state.viewport.height = e, this.state.viewport.x = s, this.state.viewport.y = i, this.gl.viewport(s, i, t, e))
    }
    setScissor(t, e, s = 0, i = 0) {
        this.gl.scissor(s, i, t, e)
    }
    enable(t) {
        !0 !== this.state[t] && (this.gl.enable(t), this.state[t] = !0)
    }
    disable(t) {
        !1 !== this.state[t] && (this.gl.disable(t), this.state[t] = !1)
    }
    setBlendFunc(t, e, s, i) {
        this.state.blendFunc.src === t && this.state.blendFunc.dst === e && this.state.blendFunc.srcAlpha === s && this.state.blendFunc.dstAlpha === i || (this.state.blendFunc.src = t, this.state.blendFunc.dst = e, this.state.blendFunc.srcAlpha = s, this.state.blendFunc.dstAlpha = i, void 0 !== s ? this.gl.blendFuncSeparate(t, e, s, i) : this.gl.blendFunc(t, e))
    }
    setBlendEquation(t, e) {
        t = t || this.gl.FUNC_ADD, this.state.blendEquation.modeRGB === t && this.state.blendEquation.modeAlpha === e || (this.state.blendEquation.modeRGB = t, this.state.blendEquation.modeAlpha = e, void 0 !== e ? this.gl.blendEquationSeparate(t, e) : this.gl.blendEquation(t))
    }
    setCullFace(t) {
        this.state.cullFace !== t && (this.state.cullFace = t, this.gl.cullFace(t))
    }
    setFrontFace(t) {
        this.state.frontFace !== t && (this.state.frontFace = t, this.gl.frontFace(t))
    }
    setDepthMask(t) {
        this.state.depthMask !== t && (this.state.depthMask = t, this.gl.depthMask(t))
    }
    setDepthFunc(t) {
        this.state.depthFunc !== t && (this.state.depthFunc = t, this.gl.depthFunc(t))
    }
    activeTexture(t) {
        this.state.activeTextureUnit !== t && (this.state.activeTextureUnit = t, this.gl.activeTexture(this.gl.TEXTURE0 + t))
    }
    bindFramebuffer({
        target: t = this.gl.FRAMEBUFFER,
        buffer: e = null
    } = {}) {
        this.state.framebuffer !== e && (this.state.framebuffer = e, this.gl.bindFramebuffer(t, e))
    }
    getExtension(t, e, s) {
        return e && this.gl[e] ? this.gl[e].bind(this.gl) : (this.extensions[t] || (this.extensions[t] = this.gl.getExtension(t)), e ? this.extensions[t] ? this.extensions[t][s].bind(this.extensions[t]) : null : this.extensions[t])
    }
    sortOpaque(t, e) {
        return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.program.id !== e.program.id ? t.program.id - e.program.id : t.zDepth !== e.zDepth ? t.zDepth - e.zDepth : e.id - t.id
    }
    sortTransparent(t, e) {
        return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.zDepth !== e.zDepth ? e.zDepth - t.zDepth : e.id - t.id
    }
    sortUI(t, e) {
        return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.program.id !== e.program.id ? t.program.id - e.program.id : e.id - t.id
    }
    getRenderList({
        scene: t,
        camera: e,
        frustumCull: s,
        sort: i
    }) {
        let r = [];
        if (e && s && e.updateFrustum(), t.traverse((t => {
                if (!t.visible) return !0;
                t.draw && (s && t.frustumCulled && e && !e.frustumIntersectsMesh(t) || r.push(t))
            })), i) {
            const t = [],
                s = [],
                i = [];
            r.forEach((r => {
                r.program.transparent ? r.program.depthTest ? s.push(r) : i.push(r) : t.push(r), r.zDepth = 0, 0 === r.renderOrder && r.program.depthTest && e && (r.worldMatrix.getTranslation(pt), pt.applyMatrix4(e.projectionViewMatrix), r.zDepth = pt.z)
            })), t.sort(this.sortOpaque), s.sort(this.sortTransparent), i.sort(this.sortUI), r = t.concat(s, i)
        }
        return r
    }
    render({
        scene: t,
        camera: e,
        target: s = null,
        update: i = !0,
        sort: r = !0,
        frustumCull: n = !0,
        clear: a
    }) {
        null === s ? (this.bindFramebuffer(), this.setViewport(this.width * this.dpr, this.height * this.dpr)) : (this.bindFramebuffer(s), this.setViewport(s.width, s.height)), (a || this.autoClear && !1 !== a) && (!this.depth || s && !s.depth || (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)), this.gl.clear((this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0))), i && t.updateMatrixWorld(), e && e.updateMatrixWorld();
        this.getRenderList({
            scene: t,
            camera: e,
            frustumCull: n,
            sort: r
        }).forEach((t => {
            t.draw({
                camera: e
            })
        }))
    }
}

function mt(t, e) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
}

function vt(t, e, s, i, r) {
    return t[0] = e, t[1] = s, t[2] = i, t[3] = r, t
}

function wt(t, e) {
    let s = e[0],
        i = e[1],
        r = e[2],
        n = e[3],
        a = s * s + i * i + r * r + n * n;
    return a > 0 && (a = 1 / Math.sqrt(a)), t[0] = s * a, t[1] = i * a, t[2] = r * a, t[3] = n * a, t
}

function xt(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
}

function bt(t, e, s) {
    let i = e[0],
        r = e[1],
        n = e[2],
        a = e[3],
        o = s[0],
        l = s[1],
        h = s[2],
        d = s[3];
    return t[0] = i * d + a * o + r * h - n * l, t[1] = r * d + a * l + n * o - i * h, t[2] = n * d + a * h + i * l - r * o, t[3] = a * d - i * o - r * l - n * h, t
}
const Et = mt,
    Tt = vt,
    St = xt,
    Mt = wt;
class yt extends Array {
    constructor(t = 0, e = 0, s = 0, i = 1) {
        return super(t, e, s, i), this.onChange = () => {}, this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    get w() {
        return this[3]
    }
    set x(t) {
        this[0] = t, this.onChange()
    }
    set y(t) {
        this[1] = t, this.onChange()
    }
    set z(t) {
        this[2] = t, this.onChange()
    }
    set w(t) {
        this[3] = t, this.onChange()
    }
    identity() {
        var t;
        return (t = this)[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, this.onChange(), this
    }
    set(t, e, s, i) {
        return t.length ? this.copy(t) : (Tt(this, t, e, s, i), this.onChange(), this)
    }
    rotateX(t) {
        return function(t, e, s) {
            s *= .5;
            let i = e[0],
                r = e[1],
                n = e[2],
                a = e[3],
                o = Math.sin(s),
                l = Math.cos(s);
            t[0] = i * l + a * o, t[1] = r * l + n * o, t[2] = n * l - r * o, t[3] = a * l - i * o
        }(this, this, t), this.onChange(), this
    }
    rotateY(t) {
        return function(t, e, s) {
            s *= .5;
            let i = e[0],
                r = e[1],
                n = e[2],
                a = e[3],
                o = Math.sin(s),
                l = Math.cos(s);
            t[0] = i * l - n * o, t[1] = r * l + a * o, t[2] = n * l + i * o, t[3] = a * l - r * o
        }(this, this, t), this.onChange(), this
    }
    rotateZ(t) {
        return function(t, e, s) {
            s *= .5;
            let i = e[0],
                r = e[1],
                n = e[2],
                a = e[3],
                o = Math.sin(s),
                l = Math.cos(s);
            t[0] = i * l + r * o, t[1] = r * l - i * o, t[2] = n * l + a * o, t[3] = a * l - n * o
        }(this, this, t), this.onChange(), this
    }
    inverse(t = this) {
        return function(t, e) {
            let s = e[0],
                i = e[1],
                r = e[2],
                n = e[3],
                a = s * s + i * i + r * r + n * n,
                o = a ? 1 / a : 0;
            t[0] = -s * o, t[1] = -i * o, t[2] = -r * o, t[3] = n * o
        }(this, t), this.onChange(), this
    }
    conjugate(t = this) {
        var e, s;
        return s = t, (e = this)[0] = -s[0], e[1] = -s[1], e[2] = -s[2], e[3] = s[3], this.onChange(), this
    }
    copy(t) {
        return Et(this, t), this.onChange(), this
    }
    normalize(t = this) {
        return Mt(this, t), this.onChange(), this
    }
    multiply(t, e) {
        return e ? bt(this, t, e) : bt(this, this, t), this.onChange(), this
    }
    dot(t) {
        return St(this, t)
    }
    fromMatrix3(t) {
        return function(t, e) {
            let s, i = e[0] + e[4] + e[8];
            if (i > 0) s = Math.sqrt(i + 1), t[3] = .5 * s, s = .5 / s, t[0] = (e[5] - e[7]) * s, t[1] = (e[6] - e[2]) * s, t[2] = (e[1] - e[3]) * s;
            else {
                let i = 0;
                e[4] > e[0] && (i = 1), e[8] > e[3 * i + i] && (i = 2);
                let r = (i + 1) % 3,
                    n = (i + 2) % 3;
                s = Math.sqrt(e[3 * i + i] - e[3 * r + r] - e[3 * n + n] + 1), t[i] = .5 * s, s = .5 / s, t[3] = (e[3 * r + n] - e[3 * n + r]) * s, t[r] = (e[3 * r + i] + e[3 * i + r]) * s, t[n] = (e[3 * n + i] + e[3 * i + n]) * s
            }
        }(this, t), this.onChange(), this
    }
    fromEuler(t) {
        return function(t, e, s = "YXZ") {
            let i = Math.sin(.5 * e[0]),
                r = Math.cos(.5 * e[0]),
                n = Math.sin(.5 * e[1]),
                a = Math.cos(.5 * e[1]),
                o = Math.sin(.5 * e[2]),
                l = Math.cos(.5 * e[2]);
            "XYZ" === s ? (t[0] = i * a * l + r * n * o, t[1] = r * n * l - i * a * o, t[2] = r * a * o + i * n * l, t[3] = r * a * l - i * n * o) : "YXZ" === s ? (t[0] = i * a * l + r * n * o, t[1] = r * n * l - i * a * o, t[2] = r * a * o - i * n * l, t[3] = r * a * l + i * n * o) : "ZXY" === s ? (t[0] = i * a * l - r * n * o, t[1] = r * n * l + i * a * o, t[2] = r * a * o + i * n * l, t[3] = r * a * l - i * n * o) : "ZYX" === s ? (t[0] = i * a * l - r * n * o, t[1] = r * n * l + i * a * o, t[2] = r * a * o - i * n * l, t[3] = r * a * l + i * n * o) : "YZX" === s ? (t[0] = i * a * l + r * n * o, t[1] = r * n * l + i * a * o, t[2] = r * a * o - i * n * l, t[3] = r * a * l - i * n * o) : "XZY" === s && (t[0] = i * a * l - r * n * o, t[1] = r * n * l - i * a * o, t[2] = r * a * o + i * n * l, t[3] = r * a * l + i * n * o)
        }(this, t, t.order), this
    }
    fromAxisAngle(t, e) {
        return function(t, e, s) {
            s *= .5;
            let i = Math.sin(s);
            t[0] = i * e[0], t[1] = i * e[1], t[2] = i * e[2], t[3] = Math.cos(s)
        }(this, t, e), this
    }
    slerp(t, e) {
        return function(t, e, s, i) {
            let r, n, a, o, l, h = e[0],
                d = e[1],
                c = e[2],
                u = e[3],
                p = s[0],
                f = s[1],
                g = s[2],
                m = s[3];
            n = h * p + d * f + c * g + u * m, n < 0 && (n = -n, p = -p, f = -f, g = -g, m = -m), 1 - n > 1e-6 ? (r = Math.acos(n), a = Math.sin(r), o = Math.sin((1 - i) * r) / a, l = Math.sin(i * r) / a) : (o = 1 - i, l = i), t[0] = o * h + l * p, t[1] = o * d + l * f, t[2] = o * c + l * g, t[3] = o * u + l * m
        }(this, this, t, e), this
    }
    fromArray(t, e = 0) {
        return this[0] = t[e], this[1] = t[e + 1], this[2] = t[e + 2], this[3] = t[e + 3], this
    }
    toArray(t = [], e = 0) {
        return t[e] = this[0], t[e + 1] = this[1], t[e + 2] = this[2], t[e + 3] = this[3], t
    }
}

function At(t, e, s) {
    let i = e[0],
        r = e[1],
        n = e[2],
        a = e[3],
        o = e[4],
        l = e[5],
        h = e[6],
        d = e[7],
        c = e[8],
        u = e[9],
        p = e[10],
        f = e[11],
        g = e[12],
        m = e[13],
        v = e[14],
        w = e[15],
        x = s[0],
        b = s[1],
        E = s[2],
        T = s[3];
    return t[0] = x * i + b * o + E * c + T * g, t[1] = x * r + b * l + E * u + T * m, t[2] = x * n + b * h + E * p + T * v, t[3] = x * a + b * d + E * f + T * w, x = s[4], b = s[5], E = s[6], T = s[7], t[4] = x * i + b * o + E * c + T * g, t[5] = x * r + b * l + E * u + T * m, t[6] = x * n + b * h + E * p + T * v, t[7] = x * a + b * d + E * f + T * w, x = s[8], b = s[9], E = s[10], T = s[11], t[8] = x * i + b * o + E * c + T * g, t[9] = x * r + b * l + E * u + T * m, t[10] = x * n + b * h + E * p + T * v, t[11] = x * a + b * d + E * f + T * w, x = s[12], b = s[13], E = s[14], T = s[15], t[12] = x * i + b * o + E * c + T * g, t[13] = x * r + b * l + E * u + T * m, t[14] = x * n + b * h + E * p + T * v, t[15] = x * a + b * d + E * f + T * w, t
}

function Ct(t, e) {
    let s = e[0],
        i = e[1],
        r = e[2],
        n = e[4],
        a = e[5],
        o = e[6],
        l = e[8],
        h = e[9],
        d = e[10];
    return t[0] = Math.hypot(s, i, r), t[1] = Math.hypot(n, a, o), t[2] = Math.hypot(l, h, d), t
}
const Pt = function() {
    const t = [0, 0, 0];
    return function(e, s) {
        let i = t;
        Ct(i, s);
        let r = 1 / i[0],
            n = 1 / i[1],
            a = 1 / i[2],
            o = s[0] * r,
            l = s[1] * n,
            h = s[2] * a,
            d = s[4] * r,
            c = s[5] * n,
            u = s[6] * a,
            p = s[8] * r,
            f = s[9] * n,
            g = s[10] * a,
            m = o + c + g,
            v = 0;
        return m > 0 ? (v = 2 * Math.sqrt(m + 1), e[3] = .25 * v, e[0] = (u - f) / v, e[1] = (p - h) / v, e[2] = (l - d) / v) : o > c && o > g ? (v = 2 * Math.sqrt(1 + o - c - g), e[3] = (u - f) / v, e[0] = .25 * v, e[1] = (l + d) / v, e[2] = (p + h) / v) : c > g ? (v = 2 * Math.sqrt(1 + c - o - g), e[3] = (p - h) / v, e[0] = (l + d) / v, e[1] = .25 * v, e[2] = (u + f) / v) : (v = 2 * Math.sqrt(1 + g - o - c), e[3] = (l - d) / v, e[0] = (p + h) / v, e[1] = (u + f) / v, e[2] = .25 * v), e
    }
}();
class _t extends Array {
    constructor(t = 1, e = 0, s = 0, i = 0, r = 0, n = 1, a = 0, o = 0, l = 0, h = 0, d = 1, c = 0, u = 0, p = 0, f = 0, g = 1) {
        return super(t, e, s, i, r, n, a, o, l, h, d, c, u, p, f, g), this
    }
    get x() {
        return this[12]
    }
    get y() {
        return this[13]
    }
    get z() {
        return this[14]
    }
    get w() {
        return this[15]
    }
    set x(t) {
        this[12] = t
    }
    set y(t) {
        this[13] = t
    }
    set z(t) {
        this[14] = t
    }
    set w(t) {
        this[15] = t
    }
    set(t, e, s, i, r, n, a, o, l, h, d, c, u, p, f, g) {
        return t.length ? this.copy(t) : (function(t, e, s, i, r, n, a, o, l, h, d, c, u, p, f, g, m) {
            t[0] = e, t[1] = s, t[2] = i, t[3] = r, t[4] = n, t[5] = a, t[6] = o, t[7] = l, t[8] = h, t[9] = d, t[10] = c, t[11] = u, t[12] = p, t[13] = f, t[14] = g, t[15] = m
        }(this, t, e, s, i, r, n, a, o, l, h, d, c, u, p, f, g), this)
    }
    translate(t, e = this) {
        return function(t, e, s) {
            let i, r, n, a, o, l, h, d, c, u, p, f, g = s[0],
                m = s[1],
                v = s[2];
            e === t ? (t[12] = e[0] * g + e[4] * m + e[8] * v + e[12], t[13] = e[1] * g + e[5] * m + e[9] * v + e[13], t[14] = e[2] * g + e[6] * m + e[10] * v + e[14], t[15] = e[3] * g + e[7] * m + e[11] * v + e[15]) : (i = e[0], r = e[1], n = e[2], a = e[3], o = e[4], l = e[5], h = e[6], d = e[7], c = e[8], u = e[9], p = e[10], f = e[11], t[0] = i, t[1] = r, t[2] = n, t[3] = a, t[4] = o, t[5] = l, t[6] = h, t[7] = d, t[8] = c, t[9] = u, t[10] = p, t[11] = f, t[12] = i * g + o * m + c * v + e[12], t[13] = r * g + l * m + u * v + e[13], t[14] = n * g + h * m + p * v + e[14], t[15] = a * g + d * m + f * v + e[15])
        }(this, e, t), this
    }
    rotate(t, e, s = this) {
        return function(t, e, s, i) {
            let r, n, a, o, l, h, d, c, u, p, f, g, m, v, w, x, b, E, T, S, M, y, A, C, P = i[0],
                _ = i[1],
                L = i[2],
                O = Math.hypot(P, _, L);
            Math.abs(O) < 1e-6 || (O = 1 / O, P *= O, _ *= O, L *= O, r = Math.sin(s), n = Math.cos(s), a = 1 - n, o = e[0], l = e[1], h = e[2], d = e[3], c = e[4], u = e[5], p = e[6], f = e[7], g = e[8], m = e[9], v = e[10], w = e[11], x = P * P * a + n, b = _ * P * a + L * r, E = L * P * a - _ * r, T = P * _ * a - L * r, S = _ * _ * a + n, M = L * _ * a + P * r, y = P * L * a + _ * r, A = _ * L * a - P * r, C = L * L * a + n, t[0] = o * x + c * b + g * E, t[1] = l * x + u * b + m * E, t[2] = h * x + p * b + v * E, t[3] = d * x + f * b + w * E, t[4] = o * T + c * S + g * M, t[5] = l * T + u * S + m * M, t[6] = h * T + p * S + v * M, t[7] = d * T + f * S + w * M, t[8] = o * y + c * A + g * C, t[9] = l * y + u * A + m * C, t[10] = h * y + p * A + v * C, t[11] = d * y + f * A + w * C, e !== t && (t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]))
        }(this, s, t, e), this
    }
    scale(t, e = this) {
        return function(t, e, s) {
            let i = s[0],
                r = s[1],
                n = s[2];
            t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i, t[3] = e[3] * i, t[4] = e[4] * r, t[5] = e[5] * r, t[6] = e[6] * r, t[7] = e[7] * r, t[8] = e[8] * n, t[9] = e[9] * n, t[10] = e[10] * n, t[11] = e[11] * n, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]
        }(this, e, "number" == typeof t ? [t, t, t] : t), this
    }
    multiply(t, e) {
        return e ? At(this, t, e) : At(this, this, t), this
    }
    identity() {
        var t;
        return (t = this)[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
    }
    copy(t) {
        var e, s;
        return s = t, (e = this)[0] = s[0], e[1] = s[1], e[2] = s[2], e[3] = s[3], e[4] = s[4], e[5] = s[5], e[6] = s[6], e[7] = s[7], e[8] = s[8], e[9] = s[9], e[10] = s[10], e[11] = s[11], e[12] = s[12], e[13] = s[13], e[14] = s[14], e[15] = s[15], this
    }
    fromPerspective({
        fov: t,
        aspect: e,
        near: s,
        far: i
    } = {}) {
        return function(t, e, s, i, r) {
            let n = 1 / Math.tan(e / 2),
                a = 1 / (i - r);
            t[0] = n / s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = n, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (r + i) * a, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * r * i * a, t[15] = 0
        }(this, t, e, s, i), this
    }
    fromOrthogonal({
        left: t,
        right: e,
        bottom: s,
        top: i,
        near: r,
        far: n
    }) {
        return function(t, e, s, i, r, n, a) {
            let o = 1 / (e - s),
                l = 1 / (i - r),
                h = 1 / (n - a);
            t[0] = -2 * o, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * l, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * h, t[11] = 0, t[12] = (e + s) * o, t[13] = (r + i) * l, t[14] = (a + n) * h, t[15] = 1
        }(this, t, e, s, i, r, n), this
    }
    fromQuaternion(t) {
        return function(t, e) {
            let s = e[0],
                i = e[1],
                r = e[2],
                n = e[3],
                a = s + s,
                o = i + i,
                l = r + r,
                h = s * a,
                d = i * a,
                c = i * o,
                u = r * a,
                p = r * o,
                f = r * l,
                g = n * a,
                m = n * o,
                v = n * l;
            t[0] = 1 - c - f, t[1] = d + v, t[2] = u - m, t[3] = 0, t[4] = d - v, t[5] = 1 - h - f, t[6] = p + g, t[7] = 0, t[8] = u + m, t[9] = p - g, t[10] = 1 - h - c, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
        }(this, t), this
    }
    setPosition(t) {
        return this.x = t[0], this.y = t[1], this.z = t[2], this
    }
    inverse(t = this) {
        return function(t, e) {
            let s = e[0],
                i = e[1],
                r = e[2],
                n = e[3],
                a = e[4],
                o = e[5],
                l = e[6],
                h = e[7],
                d = e[8],
                c = e[9],
                u = e[10],
                p = e[11],
                f = e[12],
                g = e[13],
                m = e[14],
                v = e[15],
                w = s * o - i * a,
                x = s * l - r * a,
                b = s * h - n * a,
                E = i * l - r * o,
                T = i * h - n * o,
                S = r * h - n * l,
                M = d * g - c * f,
                y = d * m - u * f,
                A = d * v - p * f,
                C = c * m - u * g,
                P = c * v - p * g,
                _ = u * v - p * m,
                L = w * _ - x * P + b * C + E * A - T * y + S * M;
            L && (L = 1 / L, t[0] = (o * _ - l * P + h * C) * L, t[1] = (r * P - i * _ - n * C) * L, t[2] = (g * S - m * T + v * E) * L, t[3] = (u * T - c * S - p * E) * L, t[4] = (l * A - a * _ - h * y) * L, t[5] = (s * _ - r * A + n * y) * L, t[6] = (m * b - f * S - v * x) * L, t[7] = (d * S - u * b + p * x) * L, t[8] = (a * P - o * A + h * M) * L, t[9] = (i * A - s * P - n * M) * L, t[10] = (f * T - g * b + v * w) * L, t[11] = (c * b - d * T - p * w) * L, t[12] = (o * y - a * C - l * M) * L, t[13] = (s * C - i * y + r * M) * L, t[14] = (g * x - f * E - m * w) * L, t[15] = (d * E - c * x + u * w) * L)
        }(this, t), this
    }
    compose(t, e, s) {
        return function(t, e, s, i) {
            let r = e[0],
                n = e[1],
                a = e[2],
                o = e[3],
                l = r + r,
                h = n + n,
                d = a + a,
                c = r * l,
                u = r * h,
                p = r * d,
                f = n * h,
                g = n * d,
                m = a * d,
                v = o * l,
                w = o * h,
                x = o * d,
                b = i[0],
                E = i[1],
                T = i[2];
            t[0] = (1 - (f + m)) * b, t[1] = (u + x) * b, t[2] = (p - w) * b, t[3] = 0, t[4] = (u - x) * E, t[5] = (1 - (c + m)) * E, t[6] = (g + v) * E, t[7] = 0, t[8] = (p + w) * T, t[9] = (g - v) * T, t[10] = (1 - (c + f)) * T, t[11] = 0, t[12] = s[0], t[13] = s[1], t[14] = s[2], t[15] = 1
        }(this, t, e, s), this
    }
    getRotation(t) {
        return Pt(t, this), this
    }
    getTranslation(t) {
        var e, s;
        return s = this, (e = t)[0] = s[12], e[1] = s[13], e[2] = s[14], this
    }
    getScaling(t) {
        return Ct(t, this), this
    }
    getMaxScaleOnAxis() {
        return function(t) {
            let e = t[0],
                s = t[1],
                i = t[2],
                r = t[4],
                n = t[5],
                a = t[6],
                o = t[8],
                l = t[9],
                h = t[10];
            const d = e * e + s * s + i * i,
                c = r * r + n * n + a * a,
                u = o * o + l * l + h * h;
            return Math.sqrt(Math.max(d, c, u))
        }(this)
    }
    lookAt(t, e, s) {
        return function(t, e, s, i) {
            let r = e[0],
                n = e[1],
                a = e[2],
                o = i[0],
                l = i[1],
                h = i[2],
                d = r - s[0],
                c = n - s[1],
                u = a - s[2],
                p = d * d + c * c + u * u;
            0 === p ? u = 1 : (p = 1 / Math.sqrt(p), d *= p, c *= p, u *= p);
            let f = l * u - h * c,
                g = h * d - o * u,
                m = o * c - l * d;
            p = f * f + g * g + m * m, 0 === p && (h ? o += 1e-6 : l ? h += 1e-6 : l += 1e-6, f = l * u - h * c, g = h * d - o * u, m = o * c - l * d, p = f * f + g * g + m * m), p = 1 / Math.sqrt(p), f *= p, g *= p, m *= p, t[0] = f, t[1] = g, t[2] = m, t[3] = 0, t[4] = c * m - u * g, t[5] = u * f - d * m, t[6] = d * g - c * f, t[7] = 0, t[8] = d, t[9] = c, t[10] = u, t[11] = 0, t[12] = r, t[13] = n, t[14] = a, t[15] = 1
        }(this, t, e, s), this
    }
    determinant() {
        return function(t) {
            let e = t[0],
                s = t[1],
                i = t[2],
                r = t[3],
                n = t[4],
                a = t[5],
                o = t[6],
                l = t[7],
                h = t[8],
                d = t[9],
                c = t[10],
                u = t[11],
                p = t[12],
                f = t[13],
                g = t[14],
                m = t[15];
            return (e * a - s * n) * (c * m - u * g) - (e * o - i * n) * (d * m - u * f) + (e * l - r * n) * (d * g - c * f) + (s * o - i * a) * (h * m - u * p) - (s * l - r * a) * (h * g - c * p) + (i * l - r * o) * (h * f - d * p)
        }(this)
    }
    fromArray(t, e = 0) {
        return this[0] = t[e], this[1] = t[e + 1], this[2] = t[e + 2], this[3] = t[e + 3], this[4] = t[e + 4], this[5] = t[e + 5], this[6] = t[e + 6], this[7] = t[e + 7], this[8] = t[e + 8], this[9] = t[e + 9], this[10] = t[e + 10], this[11] = t[e + 11], this[12] = t[e + 12], this[13] = t[e + 13], this[14] = t[e + 14], this[15] = t[e + 15], this
    }
    toArray(t = [], e = 0) {
        return t[e] = this[0], t[e + 1] = this[1], t[e + 2] = this[2], t[e + 3] = this[3], t[e + 4] = this[4], t[e + 5] = this[5], t[e + 6] = this[6], t[e + 7] = this[7], t[e + 8] = this[8], t[e + 9] = this[9], t[e + 10] = this[10], t[e + 11] = this[11], t[e + 12] = this[12], t[e + 13] = this[13], t[e + 14] = this[14], t[e + 15] = this[15], t
    }
}
const Lt = new _t;
class Ot extends Array {
    constructor(t = 0, e = t, s = t, i = "YXZ") {
        return super(t, e, s), this.order = i, this.onChange = () => {}, this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    set x(t) {
        this[0] = t, this.onChange()
    }
    set y(t) {
        this[1] = t, this.onChange()
    }
    set z(t) {
        this[2] = t, this.onChange()
    }
    set(t, e = t, s = t) {
        return t.length ? this.copy(t) : (this[0] = t, this[1] = e, this[2] = s, this.onChange(), this)
    }
    copy(t) {
        return this[0] = t[0], this[1] = t[1], this[2] = t[2], this.onChange(), this
    }
    reorder(t) {
        return this.order = t, this.onChange(), this
    }
    fromRotationMatrix(t, e = this.order) {
        return function(t, e, s = "YXZ") {
            "XYZ" === s ? (t[1] = Math.asin(Math.min(Math.max(e[8], -1), 1)), Math.abs(e[8]) < .99999 ? (t[0] = Math.atan2(-e[9], e[10]), t[2] = Math.atan2(-e[4], e[0])) : (t[0] = Math.atan2(e[6], e[5]), t[2] = 0)) : "YXZ" === s ? (t[0] = Math.asin(-Math.min(Math.max(e[9], -1), 1)), Math.abs(e[9]) < .99999 ? (t[1] = Math.atan2(e[8], e[10]), t[2] = Math.atan2(e[1], e[5])) : (t[1] = Math.atan2(-e[2], e[0]), t[2] = 0)) : "ZXY" === s ? (t[0] = Math.asin(Math.min(Math.max(e[6], -1), 1)), Math.abs(e[6]) < .99999 ? (t[1] = Math.atan2(-e[2], e[10]), t[2] = Math.atan2(-e[4], e[5])) : (t[1] = 0, t[2] = Math.atan2(e[1], e[0]))) : "ZYX" === s ? (t[1] = Math.asin(-Math.min(Math.max(e[2], -1), 1)), Math.abs(e[2]) < .99999 ? (t[0] = Math.atan2(e[6], e[10]), t[2] = Math.atan2(e[1], e[0])) : (t[0] = 0, t[2] = Math.atan2(-e[4], e[5]))) : "YZX" === s ? (t[2] = Math.asin(Math.min(Math.max(e[1], -1), 1)), Math.abs(e[1]) < .99999 ? (t[0] = Math.atan2(-e[9], e[5]), t[1] = Math.atan2(-e[2], e[0])) : (t[0] = 0, t[1] = Math.atan2(e[8], e[10]))) : "XZY" === s && (t[2] = Math.asin(-Math.min(Math.max(e[4], -1), 1)), Math.abs(e[4]) < .99999 ? (t[0] = Math.atan2(e[6], e[5]), t[1] = Math.atan2(e[8], e[0])) : (t[0] = Math.atan2(-e[9], e[10]), t[1] = 0))
        }(this, t, e), this
    }
    fromQuaternion(t, e = this.order) {
        return Lt.fromQuaternion(t), this.fromRotationMatrix(Lt, e)
    }
    toArray(t = [], e = 0) {
        return t[e] = this[0], t[e + 1] = this[1], t[e + 2] = this[2], t
    }
}
class It {
    constructor() {
        this.parent = null, this.children = [], this.visible = !0, this.matrix = new _t, this.worldMatrix = new _t, this.matrixAutoUpdate = !0, this.position = new tt, this.quaternion = new yt, this.scale = new tt(1), this.rotation = new Ot, this.up = new tt(0, 1, 0), this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation), this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion)
    }
    setParent(t, e = !0) {
        this.parent && t !== this.parent && this.parent.removeChild(this, !1), this.parent = t, e && t && t.addChild(this, !1)
    }
    addChild(t, e = !0) {
        ~this.children.indexOf(t) || this.children.push(t), e && t.setParent(this, !1)
    }
    removeChild(t, e = !0) {
        ~this.children.indexOf(t) && this.children.splice(this.children.indexOf(t), 1), e && t.setParent(null, !1)
    }
    updateMatrixWorld(t) {
        this.matrixAutoUpdate && this.updateMatrix(), (this.worldMatrixNeedsUpdate || t) && (null === this.parent ? this.worldMatrix.copy(this.matrix) : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix), this.worldMatrixNeedsUpdate = !1, t = !0);
        for (let e = 0, s = this.children.length; e < s; e++) this.children[e].updateMatrixWorld(t)
    }
    updateMatrix() {
        this.matrix.compose(this.quaternion, this.position, this.scale), this.worldMatrixNeedsUpdate = !0
    }
    traverse(t) {
        if (!t(this))
            for (let e = 0, s = this.children.length; e < s; e++) this.children[e].traverse(t)
    }
    decompose() {
        this.matrix.getTranslation(this.position), this.matrix.getRotation(this.quaternion), this.matrix.getScaling(this.scale), this.rotation.fromQuaternion(this.quaternion)
    }
    lookAt(t, e = !1) {
        e ? this.matrix.lookAt(this.position, t, this.up) : this.matrix.lookAt(t, this.position, this.up), this.matrix.getRotation(this.quaternion), this.rotation.fromQuaternion(this.quaternion)
    }
}
const Ft = new _t,
    kt = new tt,
    zt = new tt;
class Gt extends It {
    constructor(t, {
        near: e = .1,
        far: s = 100,
        fov: i = 45,
        aspect: r = 1,
        left: n,
        right: a,
        bottom: o,
        top: l,
        zoom: h = 1
    } = {}) {
        super(), Object.assign(this, {
            near: e,
            far: s,
            fov: i,
            aspect: r,
            left: n,
            right: a,
            bottom: o,
            top: l,
            zoom: h
        }), this.projectionMatrix = new _t, this.viewMatrix = new _t, this.projectionViewMatrix = new _t, this.worldPosition = new tt, this.type = n || a ? "orthographic" : "perspective", "orthographic" === this.type ? this.orthographic() : this.perspective()
    }
    perspective({
        near: t = this.near,
        far: e = this.far,
        fov: s = this.fov,
        aspect: i = this.aspect
    } = {}) {
        return Object.assign(this, {
            near: t,
            far: e,
            fov: s,
            aspect: i
        }), this.projectionMatrix.fromPerspective({
            fov: s * (Math.PI / 180),
            aspect: i,
            near: t,
            far: e
        }), this.type = "perspective", this
    }
    orthographic({
        near: t = this.near,
        far: e = this.far,
        left: s = this.left,
        right: i = this.right,
        bottom: r = this.bottom,
        top: n = this.top,
        zoom: a = this.zoom
    } = {}) {
        return Object.assign(this, {
            near: t,
            far: e,
            left: s,
            right: i,
            bottom: r,
            top: n,
            zoom: a
        }), s /= a, i /= a, r /= a, n /= a, this.projectionMatrix.fromOrthogonal({
            left: s,
            right: i,
            bottom: r,
            top: n,
            near: t,
            far: e
        }), this.type = "orthographic", this
    }
    updateMatrixWorld() {
        return super.updateMatrixWorld(), this.viewMatrix.inverse(this.worldMatrix), this.worldMatrix.getTranslation(this.worldPosition), this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix), this
    }
    lookAt(t) {
        return super.lookAt(t, !0), this
    }
    project(t) {
        return t.applyMatrix4(this.viewMatrix), t.applyMatrix4(this.projectionMatrix), this
    }
    unproject(t) {
        return t.applyMatrix4(Ft.inverse(this.projectionMatrix)), t.applyMatrix4(this.worldMatrix), this
    }
    updateFrustum() {
        this.frustum || (this.frustum = [new tt, new tt, new tt, new tt, new tt, new tt]);
        const t = this.projectionViewMatrix;
        this.frustum[0].set(t[3] - t[0], t[7] - t[4], t[11] - t[8]).constant = t[15] - t[12], this.frustum[1].set(t[3] + t[0], t[7] + t[4], t[11] + t[8]).constant = t[15] + t[12], this.frustum[2].set(t[3] + t[1], t[7] + t[5], t[11] + t[9]).constant = t[15] + t[13], this.frustum[3].set(t[3] - t[1], t[7] - t[5], t[11] - t[9]).constant = t[15] - t[13], this.frustum[4].set(t[3] - t[2], t[7] - t[6], t[11] - t[10]).constant = t[15] - t[14], this.frustum[5].set(t[3] + t[2], t[7] + t[6], t[11] + t[10]).constant = t[15] + t[14];
        for (let e = 0; e < 6; e++) {
            const t = 1 / this.frustum[e].distance();
            this.frustum[e].multiply(t), this.frustum[e].constant *= t
        }
    }
    frustumIntersectsMesh(t) {
        if (!t.geometry.attributes.position) return !0;
        if (t.geometry.bounds && t.geometry.bounds.radius !== 1 / 0 || t.geometry.computeBoundingSphere(), !t.geometry.bounds) return !0;
        const e = kt;
        e.copy(t.geometry.bounds.center), e.applyMatrix4(t.worldMatrix);
        const s = t.geometry.bounds.radius * t.worldMatrix.getMaxScaleOnAxis();
        return this.frustumIntersectsSphere(e, s)
    }
    frustumIntersectsSphere(t, e) {
        const s = zt;
        for (let i = 0; i < 6; i++) {
            const r = this.frustum[i];
            if (s.copy(r).dot(t) + r.constant < -e) return !1
        }
        return !0
    }
}

function Rt(t, e, s) {
    let i = e[0],
        r = e[1],
        n = e[2],
        a = e[3],
        o = e[4],
        l = e[5],
        h = e[6],
        d = e[7],
        c = e[8],
        u = s[0],
        p = s[1],
        f = s[2],
        g = s[3],
        m = s[4],
        v = s[5],
        w = s[6],
        x = s[7],
        b = s[8];
    return t[0] = u * i + p * a + f * h, t[1] = u * r + p * o + f * d, t[2] = u * n + p * l + f * c, t[3] = g * i + m * a + v * h, t[4] = g * r + m * o + v * d, t[5] = g * n + m * l + v * c, t[6] = w * i + x * a + b * h, t[7] = w * r + x * o + b * d, t[8] = w * n + x * l + b * c, t
}
class Bt extends Array {
    constructor(t = 1, e = 0, s = 0, i = 0, r = 1, n = 0, a = 0, o = 0, l = 1) {
        return super(t, e, s, i, r, n, a, o, l), this
    }
    set(t, e, s, i, r, n, a, o, l) {
        return t.length ? this.copy(t) : (function(t, e, s, i, r, n, a, o, l, h) {
            t[0] = e, t[1] = s, t[2] = i, t[3] = r, t[4] = n, t[5] = a, t[6] = o, t[7] = l, t[8] = h
        }(this, t, e, s, i, r, n, a, o, l), this)
    }
    translate(t, e = this) {
        return function(t, e, s) {
            let i = e[0],
                r = e[1],
                n = e[2],
                a = e[3],
                o = e[4],
                l = e[5],
                h = e[6],
                d = e[7],
                c = e[8],
                u = s[0],
                p = s[1];
            t[0] = i, t[1] = r, t[2] = n, t[3] = a, t[4] = o, t[5] = l, t[6] = u * i + p * a + h, t[7] = u * r + p * o + d, t[8] = u * n + p * l + c
        }(this, e, t), this
    }
    rotate(t, e = this) {
        return function(t, e, s) {
            let i = e[0],
                r = e[1],
                n = e[2],
                a = e[3],
                o = e[4],
                l = e[5],
                h = e[6],
                d = e[7],
                c = e[8],
                u = Math.sin(s),
                p = Math.cos(s);
            t[0] = p * i + u * a, t[1] = p * r + u * o, t[2] = p * n + u * l, t[3] = p * a - u * i, t[4] = p * o - u * r, t[5] = p * l - u * n, t[6] = h, t[7] = d, t[8] = c
        }(this, e, t), this
    }
    scale(t, e = this) {
        return function(t, e, s) {
            let i = s[0],
                r = s[1];
            t[0] = i * e[0], t[1] = i * e[1], t[2] = i * e[2], t[3] = r * e[3], t[4] = r * e[4], t[5] = r * e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8]
        }(this, e, t), this
    }
    multiply(t, e) {
        return e ? Rt(this, t, e) : Rt(this, this, t), this
    }
    identity() {
        var t;
        return (t = this)[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, this
    }
    copy(t) {
        var e, s;
        return s = t, (e = this)[0] = s[0], e[1] = s[1], e[2] = s[2], e[3] = s[3], e[4] = s[4], e[5] = s[5], e[6] = s[6], e[7] = s[7], e[8] = s[8], this
    }
    fromMatrix4(t) {
        var e, s;
        return s = t, (e = this)[0] = s[0], e[1] = s[1], e[2] = s[2], e[3] = s[4], e[4] = s[5], e[5] = s[6], e[6] = s[8], e[7] = s[9], e[8] = s[10], this
    }
    fromQuaternion(t) {
        return function(t, e) {
            let s = e[0],
                i = e[1],
                r = e[2],
                n = e[3],
                a = s + s,
                o = i + i,
                l = r + r,
                h = s * a,
                d = i * a,
                c = i * o,
                u = r * a,
                p = r * o,
                f = r * l,
                g = n * a,
                m = n * o,
                v = n * l;
            t[0] = 1 - c - f, t[3] = d - v, t[6] = u + m, t[1] = d + v, t[4] = 1 - h - f, t[7] = p - g, t[2] = u - m, t[5] = p + g, t[8] = 1 - h - c
        }(this, t), this
    }
    fromBasis(t, e, s) {
        return this.set(t[0], t[1], t[2], e[0], e[1], e[2], s[0], s[1], s[2]), this
    }
    inverse(t = this) {
        return function(t, e) {
            let s = e[0],
                i = e[1],
                r = e[2],
                n = e[3],
                a = e[4],
                o = e[5],
                l = e[6],
                h = e[7],
                d = e[8],
                c = d * a - o * h,
                u = -d * n + o * l,
                p = h * n - a * l,
                f = s * c + i * u + r * p;
            f && (f = 1 / f, t[0] = c * f, t[1] = (-d * i + r * h) * f, t[2] = (o * i - r * a) * f, t[3] = u * f, t[4] = (d * s - r * l) * f, t[5] = (-o * s + r * n) * f, t[6] = p * f, t[7] = (-h * s + i * l) * f, t[8] = (a * s - i * n) * f)
        }(this, t), this
    }
    getNormalMatrix(t) {
        return function(t, e) {
            let s = e[0],
                i = e[1],
                r = e[2],
                n = e[3],
                a = e[4],
                o = e[5],
                l = e[6],
                h = e[7],
                d = e[8],
                c = e[9],
                u = e[10],
                p = e[11],
                f = e[12],
                g = e[13],
                m = e[14],
                v = e[15],
                w = s * o - i * a,
                x = s * l - r * a,
                b = s * h - n * a,
                E = i * l - r * o,
                T = i * h - n * o,
                S = r * h - n * l,
                M = d * g - c * f,
                y = d * m - u * f,
                A = d * v - p * f,
                C = c * m - u * g,
                P = c * v - p * g,
                _ = u * v - p * m,
                L = w * _ - x * P + b * C + E * A - T * y + S * M;
            L && (L = 1 / L, t[0] = (o * _ - l * P + h * C) * L, t[1] = (l * A - a * _ - h * y) * L, t[2] = (a * P - o * A + h * M) * L, t[3] = (r * P - i * _ - n * C) * L, t[4] = (s * _ - r * A + n * y) * L, t[5] = (i * A - s * P - n * M) * L, t[6] = (g * S - m * T + v * E) * L, t[7] = (m * b - f * S - v * x) * L, t[8] = (f * T - g * b + v * w) * L)
        }(this, t), this
    }
}
let Nt = 0;
class Dt extends It {
    constructor(t, {
        geometry: e,
        program: s,
        mode: i = t.TRIANGLES,
        frustumCulled: r = !0,
        renderOrder: n = 0
    } = {}) {
        super(), t.canvas || console.error("gl not passed as first argument to Mesh"), this.gl = t, this.id = Nt++, this.geometry = e, this.program = s, this.mode = i, this.frustumCulled = r, this.renderOrder = n, this.modelViewMatrix = new _t, this.normalMatrix = new Bt, this.beforeRenderCallbacks = [], this.afterRenderCallbacks = []
    }
    onBeforeRender(t) {
        return this.beforeRenderCallbacks.push(t), this
    }
    onAfterRender(t) {
        return this.afterRenderCallbacks.push(t), this
    }
    draw({
        camera: t
    } = {}) {
        this.beforeRenderCallbacks.forEach((e => e && e({
            mesh: this,
            camera: t
        }))), t && (this.program.uniforms.modelMatrix || Object.assign(this.program.uniforms, {
            modelMatrix: {
                value: null
            },
            viewMatrix: {
                value: null
            },
            modelViewMatrix: {
                value: null
            },
            normalMatrix: {
                value: null
            },
            projectionMatrix: {
                value: null
            },
            cameraPosition: {
                value: null
            }
        }), this.program.uniforms.projectionMatrix.value = t.projectionMatrix, this.program.uniforms.cameraPosition.value = t.worldPosition, this.program.uniforms.viewMatrix.value = t.viewMatrix, this.modelViewMatrix.multiply(t.viewMatrix, this.worldMatrix), this.normalMatrix.getNormalMatrix(this.modelViewMatrix), this.program.uniforms.modelMatrix.value = this.worldMatrix, this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix, this.program.uniforms.normalMatrix.value = this.normalMatrix);
        let e = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({
            flipFaces: e
        }), this.geometry.draw({
            mode: this.mode,
            program: this.program
        }), this.afterRenderCallbacks.forEach((e => e && e({
            mesh: this,
            camera: t
        })))
    }
}
const Vt = new Uint8Array(4);

function Ut(t) {
    return 0 == (t & t - 1)
}
let Xt = 1;
class qt {
    constructor(t, {
        image: e,
        target: s = t.TEXTURE_2D,
        type: i = t.UNSIGNED_BYTE,
        format: r = t.RGBA,
        internalFormat: n = r,
        wrapS: a = t.CLAMP_TO_EDGE,
        wrapT: o = t.CLAMP_TO_EDGE,
        generateMipmaps: l = !0,
        minFilter: h = (l ? t.NEAREST_MIPMAP_LINEAR : t.LINEAR),
        magFilter: d = t.LINEAR,
        premultiplyAlpha: c = !1,
        unpackAlignment: u = 4,
        flipY: p = s == t.TEXTURE_2D,
        anisotropy: f = 0,
        level: g = 0,
        width: m,
        height: v = m
    } = {}) {
        this.gl = t, this.id = Xt++, this.image = e, this.target = s, this.type = i, this.format = r, this.internalFormat = n, this.minFilter = h, this.magFilter = d, this.wrapS = a, this.wrapT = o, this.generateMipmaps = l, this.premultiplyAlpha = c, this.unpackAlignment = u, this.flipY = p, this.anisotropy = Math.min(f, this.gl.renderer.parameters.maxAnisotropy), this.level = g, this.width = m, this.height = v, this.texture = this.gl.createTexture(), this.store = {
            image: null
        }, this.glState = this.gl.renderer.state, this.state = {}, this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR, this.state.magFilter = this.gl.LINEAR, this.state.wrapS = this.gl.REPEAT, this.state.wrapT = this.gl.REPEAT, this.state.anisotropy = 0
    }
    bind() {
        this.glState.textureUnits[this.glState.activeTextureUnit] !== this.id && (this.gl.bindTexture(this.target, this.texture), this.glState.textureUnits[this.glState.activeTextureUnit] = this.id)
    }
    update(t = 0) {
        const e = !(this.image === this.store.image && !this.needsUpdate);
        if ((e || this.glState.textureUnits[t] !== this.id) && (this.gl.renderer.activeTexture(t), this.bind()), e) {
            if (this.needsUpdate = !1, this.flipY !== this.glState.flipY && (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY), this.glState.flipY = this.flipY), this.premultiplyAlpha !== this.glState.premultiplyAlpha && (this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha), this.glState.premultiplyAlpha = this.premultiplyAlpha), this.unpackAlignment !== this.glState.unpackAlignment && (this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment), this.glState.unpackAlignment = this.unpackAlignment), this.minFilter !== this.state.minFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter), this.state.minFilter = this.minFilter), this.magFilter !== this.state.magFilter && (this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter), this.state.magFilter = this.magFilter), this.wrapS !== this.state.wrapS && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS), this.state.wrapS = this.wrapS), this.wrapT !== this.state.wrapT && (this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT), this.state.wrapT = this.wrapT), this.anisotropy && this.anisotropy !== this.state.anisotropy && (this.gl.texParameterf(this.target, this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy), this.state.anisotropy = this.anisotropy), this.image) {
                if (this.image.width && (this.width = this.image.width, this.height = this.image.height), this.target === this.gl.TEXTURE_CUBE_MAP)
                    for (let t = 0; t < 6; t++) this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + t, this.level, this.internalFormat, this.format, this.type, this.image[t]);
                else if (ArrayBuffer.isView(this.image)) this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
                else if (this.image.isCompressedTexture)
                    for (let t = 0; t < this.image.length; t++) this.gl.compressedTexImage2D(this.target, t, this.internalFormat, this.image[t].width, this.image[t].height, 0, this.image[t].data);
                else this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
                this.generateMipmaps && (this.gl.renderer.isWebgl2 || Ut(this.image.width) && Ut(this.image.height) ? this.gl.generateMipmap(this.target) : (this.generateMipmaps = !1, this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE, this.minFilter = this.gl.LINEAR)), this.onUpdate && this.onUpdate()
            } else if (this.target === this.gl.TEXTURE_CUBE_MAP)
                for (let t = 0; t < 6; t++) this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, Vt);
            else this.width ? this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null) : this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, Vt);
            this.store.image = this.image
        }
    }
}
class jt extends Array {
    constructor(t = 0, e = t, s = t, i = t) {
        return super(t, e, s, i), this
    }
    get x() {
        return this[0]
    }
    get y() {
        return this[1]
    }
    get z() {
        return this[2]
    }
    get w() {
        return this[3]
    }
    set x(t) {
        this[0] = t
    }
    set y(t) {
        this[1] = t
    }
    set z(t) {
        this[2] = t
    }
    set w(t) {
        this[3] = t
    }
    set(t, e, s, i) {
        return t.length ? this.copy(t) : (vt(this, t, e, s, i), this)
    }
    copy(t) {
        return mt(this, t), this
    }
    normalize() {
        return wt(this, this), this
    }
    multiply(t) {
        var e, s, i;
        return s = this, i = t, (e = this)[0] = s[0] * i, e[1] = s[1] * i, e[2] = s[2] * i, e[3] = s[3] * i, this
    }
    dot(t) {
        return xt(this, t)
    }
    fromArray(t, e = 0) {
        return this[0] = t[e], this[1] = t[e + 1], this[2] = t[e + 2], this[3] = t[e + 3], this
    }
    toArray(t = [], e = 0) {
        return t[e] = this[0], t[e + 1] = this[1], t[e + 2] = this[2], t[e + 3] = this[3], t
    }
}
class Wt extends nt {
    constructor(t, {
        width: e = 1,
        height: s = 1,
        widthSegments: i = 1,
        heightSegments: r = 1,
        attributes: n = {}
    } = {}) {
        const a = i,
            o = r,
            l = (a + 1) * (o + 1),
            h = a * o * 6,
            d = new Float32Array(3 * l),
            c = new Float32Array(3 * l),
            u = new Float32Array(2 * l),
            p = h > 65536 ? new Uint32Array(h) : new Uint16Array(h);
        Wt.buildPlane(d, c, u, p, e, s, 0, a, o), Object.assign(n, {
            position: {
                size: 3,
                data: d
            },
            normal: {
                size: 3,
                data: c
            },
            uv: {
                size: 2,
                data: u
            },
            index: {
                data: p
            }
        }), super(t, n)
    }
    static buildPlane(t, e, s, i, r, n, a, o, l, h = 0, d = 1, c = 2, u = 1, p = -1, f = 0, g = 0) {
        const m = f,
            v = r / o,
            w = n / l;
        for (let x = 0; x <= l; x++) {
            let b = x * w - n / 2;
            for (let n = 0; n <= o; n++, f++) {
                let w = n * v - r / 2;
                if (t[3 * f + h] = w * u, t[3 * f + d] = b * p, t[3 * f + c] = a / 2, e[3 * f + h] = 0, e[3 * f + d] = 0, e[3 * f + c] = a >= 0 ? 1 : -1, s[2 * f] = n / o, s[2 * f + 1] = 1 - x / l, x === l || n === o) continue;
                let E = m + n + x * (o + 1),
                    T = m + n + (x + 1) * (o + 1),
                    S = m + n + (x + 1) * (o + 1) + 1,
                    M = m + n + x * (o + 1) + 1;
                i[6 * g] = E, i[6 * g + 1] = T, i[6 * g + 2] = M, i[6 * g + 3] = T, i[6 * g + 4] = S, i[6 * g + 5] = M, g++
            }
        }
    }
}
const Yt = .5 * (Math.sqrt(3) - 1),
    $t = (3 - Math.sqrt(3)) / 6,
    Ht = t => 0 | Math.floor(t),
    Zt = new Float64Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1]);

function Kt(t = Math.random) {
    const e = function(t) {
            const e = 512,
                s = new Uint8Array(e);
            for (let i = 0; i < e / 2; i++) s[i] = i;
            for (let i = 0; i < e / 2 - 1; i++) {
                const e = i + ~~(t() * (256 - i)),
                    r = s[i];
                s[i] = s[e], s[e] = r
            }
            for (let i = 256; i < e; i++) s[i] = s[i - 256];
            return s
        }(t),
        s = new Float64Array(e).map((t => Zt[t % 12 * 2])),
        i = new Float64Array(e).map((t => Zt[t % 12 * 2 + 1]));
    return function(t, r) {
        let n = 0,
            a = 0,
            o = 0;
        const l = (t + r) * Yt,
            h = Ht(t + l),
            d = Ht(r + l),
            c = (h + d) * $t,
            u = t - (h - c),
            p = r - (d - c);
        let f, g;
        u > p ? (f = 1, g = 0) : (f = 0, g = 1);
        const m = u - f + $t,
            v = p - g + $t,
            w = u - 1 + 2 * $t,
            x = p - 1 + 2 * $t,
            b = 255 & h,
            E = 255 & d;
        let T = .5 - u * u - p * p;
        if (T >= 0) {
            const t = b + e[E];
            T *= T, n = T * T * (s[t] * u + i[t] * p)
        }
        let S = .5 - m * m - v * v;
        if (S >= 0) {
            const t = b + f + e[E + g];
            S *= S, a = S * S * (s[t] * m + i[t] * v)
        }
        let M = .5 - w * w - x * x;
        if (M >= 0) {
            const t = b + 1 + e[E + 1];
            M *= M, o = M * M * (s[t] * w + i[t] * x)
        }
        return 70 * (n + a + o)
    }
}
export {
    Gt as C, nt as G, Dt as M, X as N, lt as P, gt as R, U as S, It as T, jt as V, qt as a, Wt as b, Kt as c
};