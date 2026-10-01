
/**
 * COGNIRA — BESPOKE MOTION ENGINE v2
 * Non-generic, thematic animations for NODI-Seconds:
 *   - Multi-plane parallax (3 depth layers at different velocities)
 *   - Light-sweep reveal on glass panels
 *   - Clip-path text emergence (words unwrap from masks)
 *   - Continuous float / mouse-follow tilt
 *   - Directional momentum (left vs right navigation awareness)
 *   - CRT scanline transition overlay
 *   - Depth-of-field blur staging
 *
 * Depends on GSAP 3.12+
 */

window.CogniraMotion = (function () {
  'use strict';

  var E = {
    spring:    'power4.out',
    snap:      'power3.inOut',
    smooth:    'power2.out',
    dramatic:  'power3.out',
    elastic:   'elastic.out(1, 0.5)',
    overshoot: 'back.out(1.4)'
  };

  var D = {
    micro:   0.2,
    fast:    0.35,
    normal:  0.55,
    slow:    0.75,
    xslow:   1.0,
    enter:   0.7,
    exit:    0.35,
    stagger: 0.07
  };

  var lastSlideIdx = 0;
  var navDirection = 'right';

  function q(s, sel) { return s.querySelector(sel); }
  function qa(s, sel) { return s.querySelectorAll(sel); }

  function killSlideTweens(slide) {
    gsap.killTweensOf(slide.querySelectorAll('*'));
    gsap.killTweensOf(slide);
  }

  function getSlideIndex(slide) {
    return parseInt(slide.getAttribute('data-slide'), 10) || 1;
  }
  /* ===========================================================================
     1. DIRECTIONAL MOMENTUM — elements enter from travel direction
     =========================================================================== */
  function momX(layer) {
    var d = navDirection === 'right' ? -1 : 1;
    if (layer === 'far')  return d * -90;
    if (layer === 'bg')   return d * -60;
    if (layer === 'mid')  return d * -35;
    return d * -15;
  }

  function momY(layer) {
    if (layer === 'far')  return -8;
    if (layer === 'bg')   return 0;
    if (layer === 'mid')  return 12;
    return 20;
  }

  function speed(layer) {
    if (layer === 'far')  return D.xslow;
    if (layer === 'bg')   return D.slow * 1.2;
    if (layer === 'mid')  return D.slow;
    return D.fast;
  }

  function scaleFrom(layer) {
    if (layer === 'far')  return 1.06;
    if (layer === 'bg')   return 1.03;
    if (layer === 'fg')   return 0.97;
    return 1;
  }

  /* ===========================================================================
     2. MULTI-PLANE PARALLAX — three depth layers at different velocities
     =========================================================================== */
  function parallax(slide, layers) {
    var tl = gsap.timeline();
    layers.forEach(function (item) {
      var el = item.el;
      var layer = item.layer || 'mid';
      var delay = item.delay || 0;
      var sx = scaleFrom(layer);
      var isBg = layer === 'far' || layer === 'bg';

      gsap.set(el, {
        opacity: 0,
        x: momX(layer),
        y: momY(layer),
        scale: sx,
        filter: isBg ? 'blur(4px)' : 'blur(0px)'
      });

      tl.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: speed(layer),
        ease: E.spring,
        delay: delay
      }, delay > 0 ? '-=' + (delay * 0.5) : 0);
    });
    return tl;
  }

  /* ===========================================================================
     3. LIGHT SWEEP — a highlight bar crosses glass panels on entrance
     =========================================================================== */
  function lightSweep(els) {
    if (!els || !els.length) return;
    els.forEach(function (el) {
      var sweep = document.createElement('div');
      sweep.style.position = 'absolute';
      sweep.style.top = '0';
      sweep.style.left = '-100%';
      sweep.style.width = '60%';
      sweep.style.height = '100%';
      sweep.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)';
      sweep.style.pointerEvents = 'none';
      sweep.style.zIndex = '10';
      sweep.style.borderRadius = 'inherit';
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(sweep);

      gsap.to(sweep, {
        left: '140%',
        duration: 0.9,
        ease: E.smooth,
        delay: 0.3 + Math.random() * 0.3,
        onComplete: function () { sweep.remove(); }
      });
    });
  }

  /* ===========================================================================
     4. CLIP-PATH TEXT REVEAL — words unwrap upward from a mask
     =========================================================================== */
  function clipReveal(els, staggerDelay) {
    if (!els || !els.length) return;
    els.forEach(function (el) {
      gsap.set(el, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0
      });
    });
    gsap.to(els, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: D.slow,
      ease: E.overshoot,
      stagger: staggerDelay || D.stagger
    });
  }
  /* ===========================================================================
     5. FLOATING IDLE — subtle continuous bob on cards at rest
     =========================================================================== */
  function startFloat(els) {
    if (!els || !els.length) return;
    els.forEach(function (el, i) {
      gsap.to(el, {
        y: -4 + (i % 3) * 2,
        duration: 2.5 + (i % 4) * 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
      });
    });
  }

  /* ===========================================================================
     6. MOUSE-FOLLOW TILT — 3D perspective tilt toward cursor
     =========================================================================== */
  var tiltActive = false;
  var tiltTarget = null;

  function initMouseTilt() {
    if (tiltActive) return;
    tiltActive = true;
    document.addEventListener('mousemove', function (e) {
      if (!tiltTarget) return;
      var rect = tiltTarget.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / (rect.width / 2);
      var dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(tiltTarget, {
        rotationY: dx * 5,
        rotationX: -dy * 3,
        transformPerspective: 800,
        duration: 0.4,
        ease: E.smooth
      });
    });
  }

  function setTiltTarget(el) {
    tiltTarget = el;
    if (el) {
      gsap.set(el, { transformPerspective: 800 });
    }
  }

  /* ===========================================================================
     7. CRT SCANLINE OVERLAY — brief digital noise between slides
     =========================================================================== */
  function scanlineTransition(slide, onComplete) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;z-index:998;pointer-events:none;overflow:hidden;';

    var lines = '';
    for (var i = 0; i < 40; i++) {
      var top = Math.random() * 100;
      var opacity = 0.03 + Math.random() * 0.06;
      lines += '<div style="position:absolute;top:' + top + '%;left:0;width:100%;height:1px;background:rgba(139,162,199,' + opacity + ');"></div>';
    }
    overlay.innerHTML = lines;
    slide.appendChild(overlay);

    var scanBar = document.createElement('div');
    scanBar.style.cssText = 'position:absolute;left:0;width:100%;height:3px;background:linear-gradient(90deg,transparent,rgba(139,162,199,0.3),transparent);top:-3px;z-index:1;';
    overlay.appendChild(scanBar);

    var tl = gsap.timeline({
      onComplete: function () {
        overlay.remove();
        if (onComplete) onComplete();
      }
    });

    tl.to(scanBar, {
      top: '100%',
      duration: 0.35,
      ease: 'power1.inOut'
    });
    tl.to(overlay, {
      opacity: 0,
      duration: 0.15,
      ease: E.smooth
    }, '-=0.1');

    return tl;
  }

  /* ===========================================================================
     8. DEPTH-OF-FIELD — background blurs in, foreground sharp
     =========================================================================== */
  function dofReveal(bgEls, fgEls) {
    if (bgEls && bgEls.length) {
      gsap.set(bgEls, { filter: 'blur(6px)', opacity: 0 });
      gsap.to(bgEls, {
        filter: 'blur(0px)',
        opacity: 1,
        duration: D.xslow,
        ease: E.smooth,
        stagger: 0.05
      });
    }
    if (fgEls && fgEls.length) {
      gsap.set(fgEls, { filter: 'blur(0px)', opacity: 0, y: 15 });
      gsap.to(fgEls, {
        opacity: 1,
        y: 0,
        duration: D.normal,
        ease: E.spring,
        stagger: D.stagger,
        delay: 0.2
      });
    }
  }

  /* ===========================================================================
     9. SCALE BURST — element pops from tiny to full with overshoot
     =========================================================================== */
  function scaleBurst(els, staggerDelay) {
    if (!els || !els.length) return;
    gsap.set(els, { opacity: 0, scale: 0.4, transformOrigin: 'center center' });
    gsap.to(els, {
      opacity: 1,
      scale: 1,
      duration: D.normal,
      ease: E.elastic,
      stagger: staggerDelay || 0.1
    });
  }

  /* ===========================================================================
     10. STAGGERED SLIDE-IN — cards cascade from alternating sides
     =========================================================================== */
  function cascadeSlide(els, fromSide) {
    if (!els || !els.length) return;
    var dir = fromSide === 'left' ? -1 : 1;
    els.forEach(function (el, i) {
      var side = i % 2 === 0 ? dir : -dir;
      gsap.set(el, { opacity: 0, x: side * 40, y: 10 });
    });
    gsap.to(els, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: D.normal,
      ease: E.overshoot,
      stagger: 0.09
    });
  }
  /* ===========================================================================
     PER-SLIDE ENTRANCE FUNCTIONS
     =========================================================================== */

  /* --- SLIDE 1: HERO --- */
  function enterHero(slide) {
    var badge   = q(slide, '.meta-badge');
    var title   = q(slide, '.slide-title');
    var sub     = q(slide, '.slide-subtitle');
    var stats   = qa(slide, '.hero-stat-card');
    var visual  = q(slide, '.media-viewport-16-9');
    var hud     = q(slide, '.media-hud-chip');
    var viewFX  = qa(slide, '.viewfinder-corner');

    parallax(slide, [
      { el: visual,  layer: 'bg',  delay: 0 },
      { el: badge,   layer: 'fg',  delay: 0.1 },
      { el: title,   layer: 'mid', delay: 0.15 },
      { el: sub,     layer: 'mid', delay: 0.25 }
    ]);

    clipReveal([title], 0);

    if (stats.length) {
      gsap.set(stats, { opacity: 0, y: 20, scale: 0.92, transformOrigin: 'bottom center' });
      gsap.to(stats, {
        opacity: 1, y: 0, scale: 1,
        duration: D.normal,
        ease: E.overshoot,
        stagger: 0.1,
        delay: 0.35
      });
      startFloat(stats);
      lightSweep(stats);
    }

    if (hud) {
      gsap.set(hud, { opacity: 0, y: 8 });
      gsap.to(hud, { opacity: 1, y: 0, duration: D.fast, ease: E.smooth, delay: 0.6 });
    }

    if (viewFX.length) {
      gsap.set(viewFX, { opacity: 0, scale: 0 });
      gsap.to(viewFX, {
        opacity: 1, scale: 1,
        duration: D.micro,
        ease: E.elastic,
        stagger: 0.04,
        delay: 0.5
      });
    }

    setTiltTarget(visual);
  }

  /* --- SLIDE 2: PROBLEM --- */
  function enterProblem(slide) {
    var badge   = q(slide, '.meta-badge');
    var title   = q(slide, '.slide-title');
    var sub     = q(slide, '.slide-subtitle');
    var panels  = qa(slide, '.stat-callout-panel');
    var nums    = qa(slide, '.stat-callout-panel .num');
    var visual  = q(slide, '.media-viewport-16-9');
    var hud     = q(slide, '.media-hud-chip');

    parallax(slide, [
      { el: visual, layer: 'bg', delay: 0 },
      { el: badge,  layer: 'fg', delay: 0.08 },
      { el: title,  layer: 'mid', delay: 0.12 },
      { el: sub,    layer: 'mid', delay: 0.2 }
    ]);

    clipReveal([title], 0);

    if (panels.length) {
      panels.forEach(function (p, i) {
        gsap.set(p, { opacity: 0, x: momX('mid'), y: 8, filter: 'blur(3px)' });
        gsap.to(p, {
          opacity: 1, x: 0, y: 0, filter: 'blur(0px)',
          duration: D.slow,
          ease: E.spring,
          delay: 0.3 + i * 0.12
        });
      });
      lightSweep(panels);
    }

    if (nums.length) {
      nums.forEach(function (n) {
        gsap.set(n, { opacity: 0, scale: 0.3 });
        gsap.to(n, {
          opacity: 1, scale: 1,
          duration: 0.9,
          ease: E.elastic,
          delay: 0.5
        });
      });
    }

    if (hud) {
      gsap.set(hud, { opacity: 0, y: 8 });
      gsap.to(hud, { opacity: 1, y: 0, duration: D.fast, ease: E.smooth, delay: 0.55 });
    }

    setTiltTarget(visual);
  }
  /* --- SLIDE 3: COMPARISON --- */
  function enterComparison(slide) {
    var badge    = q(slide, '.meta-badge');
    var title    = q(slide, '.slide-title');
    var sub      = q(slide, '.slide-subtitle');
    var frame    = q(slide, '.split-hero-frame');
    var leftTag  = q(slide, '.split-label-tag.left-flawed');
    var rightTag = q(slide, '.split-label-tag.right-solution');
    var cards    = qa(slide, '.comparison-card');

    parallax(slide, [
      { el: badge, layer: 'fg', delay: 0.05 },
      { el: title, layer: 'mid', delay: 0.1 },
      { el: sub,   layer: 'mid', delay: 0.18 }
    ]);

    clipReveal([title], 0);

    if (frame) {
      gsap.set(frame, { opacity: 0, scale: 0.92, filter: 'blur(4px)' });
      gsap.to(frame, {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: D.xslow,
        ease: E.spring,
        delay: 0.2
      });
    }

    if (leftTag) {
      gsap.set(leftTag, { opacity: 0, x: -40, scale: 0.8 });
      gsap.to(leftTag, { opacity: 1, x: 0, scale: 1, duration: D.normal, ease: E.overshoot, delay: 0.5 });
    }
    if (rightTag) {
      gsap.set(rightTag, { opacity: 0, x: 40, scale: 0.8 });
      gsap.to(rightTag, { opacity: 1, x: 0, scale: 1, duration: D.normal, ease: E.overshoot, delay: 0.6 });
    }

    if (cards.length) {
      cascadeSlide(cards, 'left');
      lightSweep(cards);
    }

    setTiltTarget(frame);
  }

  /* --- SLIDE 4: HARDWARE --- */
  function enterHardware(slide) {
    var badge = q(slide, '.meta-badge');
    var title = q(slide, '.slide-title');
    var sub   = q(slide, '.slide-subtitle');
    var vis   = q(slide, '.media-viewport-16-9');
    var cards = qa(slide, '.hw-spec-card');
    var hud   = q(slide, '.media-hud-chip');
    var icons = qa(slide, '.hw-spec-icon');

    parallax(slide, [
      { el: vis,   layer: 'bg', delay: 0 },
      { el: badge, layer: 'fg', delay: 0.08 },
      { el: title, layer: 'mid', delay: 0.12 },
      { el: sub,   layer: 'mid', delay: 0.2 }
    ]);

    clipReveal([title], 0);

    if (cards.length) {
      cards.forEach(function (c, i) {
        gsap.set(c, {
          opacity: 0,
          x: 60,
          y: 15,
          rotationY: -8,
          transformPerspective: 600
        });
        gsap.to(c, {
          opacity: 1, x: 0, y: 0, rotationY: 0,
          duration: D.slow,
          ease: E.overshoot,
          delay: 0.35 + i * 0.13
        });
      });
      startFloat(cards);
      lightSweep(cards);
    }

    if (icons.length) {
      scaleBurst(icons, 0.08);
    }

    if (hud) {
      gsap.set(hud, { opacity: 0, y: 8 });
      gsap.to(hud, { opacity: 1, y: 0, duration: D.fast, ease: E.smooth, delay: 0.6 });
    }

    setTiltTarget(vis);
  }

  /* --- SLIDE 5: DETECTION --- */
  function enterDetection(slide) {
    var badge   = q(slide, '.meta-badge');
    var title   = q(slide, '.slide-title');
    var sub     = q(slide, '.slide-subtitle');
    var imgFrame = q(slide, '.detection-image-frame');
    var caption = q(slide, '.detection-image-caption');
    var steps   = qa(slide, '.sequence-step');

    parallax(slide, [
      { el: badge, layer: 'fg', delay: 0.05 },
      { el: title, layer: 'mid', delay: 0.1 },
      { el: sub,   layer: 'mid', delay: 0.18 }
    ]);

    clipReveal([title], 0);

    if (imgFrame) {
      gsap.set(imgFrame, { opacity: 0, scale: 0.93, filter: 'blur(3px)' });
      gsap.to(imgFrame, {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: D.xslow,
        ease: E.spring,
        delay: 0.25
      });
    }

    if (caption) {
      gsap.set(caption, { opacity: 0, x: -20 });
      gsap.to(caption, { opacity: 1, x: 0, duration: D.fast, ease: E.smooth, delay: 0.5 });
    }

    if (steps.length) {
      steps.forEach(function (s, i) {
        var isConfirm = s.classList.contains('confirmation-step');
        gsap.set(s, {
          opacity: 0,
          y: 20,
          scale: isConfirm ? 0.85 : 0.95
        });
        gsap.to(s, {
          opacity: 1, y: 0, scale: 1,
          duration: isConfirm ? D.slow : D.normal,
          ease: isConfirm ? E.elastic : E.spring,
          delay: 0.55 + i * 0.1
        });
      });
    }

    setTiltTarget(imgFrame);
  }
  /* --- SLIDE 6: SAFETY --- */
  function enterSafety(slide) {
    var badge = q(slide, '.meta-badge');
    var title = q(slide, '.slide-title');
    var sub   = q(slide, '.slide-subtitle');
    var cards = qa(slide, '.safety-vault-card');
    var vis   = q(slide, '.media-viewport-16-9');
    var hud   = q(slide, '.media-hud-chip');
    var icons = qa(slide, '.safety-badge-icon');

    parallax(slide, [
      { el: vis,   layer: 'bg', delay: 0 },
      { el: badge, layer: 'fg', delay: 0.08 },
      { el: title, layer: 'mid', delay: 0.12 },
      { el: sub,   layer: 'mid', delay: 0.2 }
    ]);

    clipReveal([title], 0);

    if (cards.length) {
      cards.forEach(function (c, i) {
        var isAmber = c.classList.contains('amber-glow');
        gsap.set(c, {
          opacity: 0,
          x: -50,
          filter: isAmber ? 'brightness(1.3)' : 'brightness(0.8)'
        });
        gsap.to(c, {
          opacity: 1, x: 0, filter: 'brightness(1)',
          duration: D.slow,
          ease: E.overshoot,
          delay: 0.35 + i * 0.15
        });
      });
      lightSweep(cards);
    }

    if (icons.length) {
      scaleBurst(icons, 0.1);
    }

    if (hud) {
      gsap.set(hud, { opacity: 0, y: 8 });
      gsap.to(hud, { opacity: 1, y: 0, duration: D.fast, ease: E.smooth, delay: 0.6 });
    }

    setTiltTarget(vis);
  }

  /* --- SLIDE 7: COST --- */
  function enterCost(slide) {
    var badge  = q(slide, '.meta-badge');
    var title  = q(slide, '.slide-title');
    var sub    = q(slide, '.slide-subtitle');
    var vis    = q(slide, '.media-viewport-16-9');
    var panels = qa(slide, '.cost-hero-panel');
    var hud    = q(slide, '.media-hud-chip');
    var nums   = qa(slide, '.cost-num-big');

    parallax(slide, [
      { el: vis,   layer: 'bg', delay: 0 },
      { el: badge, layer: 'fg', delay: 0.08 },
      { el: title, layer: 'mid', delay: 0.12 },
      { el: sub,   layer: 'mid', delay: 0.2 }
    ]);

    clipReveal([title], 0);

    if (vis) {
      gsap.set(vis, { opacity: 0, scale: 0.92, filter: 'blur(4px)' });
      gsap.to(vis, {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: D.xslow,
        ease: E.spring,
        delay: 0.2
      });
    }

    if (panels.length) {
      panels.forEach(function (p, i) {
        var fromRight = i === 0;
        gsap.set(p, {
          opacity: 0,
          x: fromRight ? 50 : -50,
          rotationY: fromRight ? 6 : -6,
          transformPerspective: 600
        });
        gsap.to(p, {
          opacity: 1, x: 0, rotationY: 0,
          duration: D.slow,
          ease: E.overshoot,
          delay: 0.4 + i * 0.18
        });
      });
      lightSweep(panels);
    }

    if (nums.length) {
      nums.forEach(function (n) {
        gsap.set(n, { opacity: 0, scale: 0.5 });
        gsap.to(n, {
          opacity: 1, scale: 1,
          duration: 1.0,
          ease: E.elastic,
          delay: 0.6
        });
      });
    }

    if (hud) {
      gsap.set(hud, { opacity: 0, y: 8 });
      gsap.to(hud, { opacity: 1, y: 0, duration: D.fast, ease: E.smooth, delay: 0.55 });
    }

    setTiltTarget(vis);
  }
  /* --- SLIDE 8: VISION --- */
  function enterVision(slide) {
    var badge    = q(slide, '.meta-badge');
    var title    = q(slide, '.slide-title');
    var sub      = q(slide, '.slide-subtitle');
    var frame    = q(slide, '.vision-hero-frame');
    var leftTag  = q(slide, '.split-label-tag.left-flawed');
    var rightTag = q(slide, '.split-label-tag.right-solution');
    var cards    = qa(slide, '.comparison-card');

    parallax(slide, [
      { el: badge, layer: 'fg', delay: 0.05 },
      { el: title, layer: 'mid', delay: 0.1 },
      { el: sub,   layer: 'mid', delay: 0.18 }
    ]);

    clipReveal([title], 0);

    if (frame) {
      gsap.set(frame, { opacity: 0, scale: 0.92, filter: 'blur(4px)' });
      gsap.to(frame, {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: D.xslow,
        ease: E.spring,
        delay: 0.2
      });
    }

    if (leftTag) {
      gsap.set(leftTag, { opacity: 0, x: -40, scale: 0.8 });
      gsap.to(leftTag, { opacity: 1, x: 0, scale: 1, duration: D.normal, ease: E.overshoot, delay: 0.5 });
    }
    if (rightTag) {
      gsap.set(rightTag, { opacity: 0, x: 40, scale: 0.8 });
      gsap.to(rightTag, { opacity: 1, x: 0, scale: 1, duration: D.normal, ease: E.overshoot, delay: 0.6 });
    }

    if (cards.length) {
      cascadeSlide(cards, 'right');
      lightSweep(cards);
    }

    setTiltTarget(frame);
  }

  /* --- SLIDE 9: PIPELINE --- */
  function enterPipeline(slide) {
    var badge  = q(slide, '.meta-badge');
    var title  = q(slide, '.slide-title');
    var sub    = q(slide, '.slide-subtitle');
    var ribbon = q(slide, '.pipeline-hero-ribbon');
    var cards  = qa(slide, '.pipeline-step-card');

    parallax(slide, [
      { el: badge, layer: 'fg', delay: 0.05 },
      { el: title, layer: 'mid', delay: 0.1 },
      { el: sub,   layer: 'mid', delay: 0.18 }
    ]);

    clipReveal([title], 0);

    if (ribbon) {
      gsap.set(ribbon, { opacity: 0, scale: 0.93, filter: 'blur(3px)' });
      gsap.to(ribbon, {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: D.xslow,
        ease: E.spring,
        delay: 0.25
      });
    }

    if (cards.length) {
      cards.forEach(function (c, i) {
        gsap.set(c, {
          opacity: 0,
          y: 30,
          scale: 0.88,
          rotationX: 8,
          transformPerspective: 500
        });
        gsap.to(c, {
          opacity: 1, y: 0, scale: 1, rotationX: 0,
          duration: D.normal,
          ease: E.overshoot,
          delay: 0.5 + i * 0.12
        });
      });
      startFloat(cards);
      lightSweep(cards);
    }

    setTiltTarget(ribbon);
  }

  /* --- SLIDE 10: VISION CONCLUSION --- */
  function enterConclusion(slide) {
    var wrap     = q(slide, '.vision-horizon-wrap');
    var badge    = q(slide, '.meta-badge');
    var title    = q(slide, '.vision-conclusion-title');
    var sub      = q(slide, '.vision-conclusion-subtitle');
    var pills    = qa(slide, '.vision-pill');
    var bgImg    = q(slide, '.vision-bg-img');

    if (bgImg) {
      gsap.set(bgImg, { scale: 1.1, filter: 'blur(6px) brightness(0.6)' });
      gsap.to(bgImg, {
        scale: 1, filter: 'blur(0px) brightness(1)',
        duration: D.xslow * 1.5,
        ease: E.smooth
      });
    }

    if (wrap) {
      gsap.set(wrap, { opacity: 0, scale: 0.95 });
      gsap.to(wrap, {
        opacity: 1, scale: 1,
        duration: D.slow,
        ease: E.spring,
        delay: 0.1
      });
    }

    if (badge) {
      gsap.set(badge, { opacity: 0, y: -15 });
      gsap.to(badge, { opacity: 1, y: 0, duration: D.normal, ease: E.spring, delay: 0.3 });
    }

    if (title) {
      clipReveal([title], 0);
      gsap.set(title, { delay: 0.35 });
    }

    if (sub) {
      gsap.set(sub, { opacity: 0, y: 15 });
      gsap.to(sub, { opacity: 1, y: 0, duration: D.normal, ease: E.smooth, delay: 0.55 });
    }

    if (pills.length) {
      pills.forEach(function (p, i) {
        gsap.set(p, {
          opacity: 0,
          y: 25,
          scale: 0.7,
          rotationX: 15,
          transformPerspective: 400
        });
        gsap.to(p, {
          opacity: 1, y: 0, scale: 1, rotationX: 0,
          duration: D.normal,
          ease: E.elastic,
          delay: 0.7 + i * 0.1
        });
      });
      startFloat(pills);
    }
  }
  /* ===========================================================================
     SLIDE ENTRANCE ROUTER
     =========================================================================== */
  var entranceMap = {
    1:  enterHero,
    2:  enterProblem,
    3:  enterComparison,
    4:  enterHardware,
    5:  enterDetection,
    6:  enterSafety,
    7:  enterCost,
    8:  enterVision,
    9:  enterPipeline,
    10: enterConclusion
  };

  /* ===========================================================================
     PUBLIC API
     =========================================================================== */
  function animateSlideEntrance(slide) {
    var idx = getSlideIndex(slide);
    navDirection = idx > lastSlideIdx ? 'right' : 'left';

    killSlideTweens(slide);

    var fn = entranceMap[idx];
    if (fn) fn(slide);

    lastSlideIdx = idx;
  }

  function animateSlideExit(slide, onComplete) {
    killSlideTweens(slide);

    scanlineTransition(slide, function () {
      var content = q(slide, '.slide-content-wrap');
      var target = content || slide;

      gsap.set(target, { opacity: 1 });
      gsap.to(target, {
        opacity: 0,
        scale: 0.97,
        duration: D.exit,
        ease: E.smooth,
        onComplete: function () {
          gsap.set(target, { opacity: 1, scale: 1 });
          if (onComplete) onComplete();
        }
      });
    });
  }

  initMouseTilt();

  return {
    animateSlideEntrance: animateSlideEntrance,
    animateSlideExit: animateSlideExit
  };

})();
