const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app.js'), 'utf8');
function setup({ reduced = false, observer = true, animationSupport = true, hash = '' } = {}) {
  const motionListeners = [], events = {}, windowEvents = {}, observers = [], animations = [];
  const media = { matches: reduced, addEventListener: (_, listener) => motionListeners.push(listener) };
  const parent = { closest: () => null };
  const nodes = Array.from({ length: 6 }, (_, index) => ({
    index, parentElement: parent, contains: () => false, closest: () => hash ? nodes[0] : null,
    ...(animationSupport ? { animate: (frames, options) => {
      const animation = { frames, options, canceled: false, finished: new Promise(() => {}), cancel() { this.canceled = true; } };
      animations.push(animation); return animation;
    } } : {})
  }));
  // A descendant of an already animated section must not be animated again.
  const nested = { ...nodes[0], parentElement: { closest: () => nodes[0] } };
  class Observer {
    constructor(callback) { this.callback = callback; this.observed = new Set(); this.disconnected = false; observers.push(this); }
    observe(node) { this.observed.add(node); }
    unobserve(node) { this.observed.delete(node); }
    disconnect() { this.observed.clear(); this.disconnected = true; }
    enter() { this.callback(Array.from(this.observed, target => ({ target, isIntersecting: true }))); }
  }
  const document = {
    activeElement: {}, documentElement: { scrollHeight: 1200 },
    querySelector: () => null,
    querySelectorAll: selector => selector.startsWith('.reveal:') ? [...nodes, nested] : [],
    addEventListener: (type, callback) => { events[type] = callback; }
  };
  const window = { BRANOC_CONFIG: {}, matchMedia: () => media, innerHeight: 800, scrollY: 0,
    addEventListener: (type, callback) => { windowEvents[type] = callback; },
    ...(observer ? { IntersectionObserver: Observer } : {}) };
  vm.runInNewContext(source, { document, window, location: { hash }, IntersectionObserver: Observer,
    requestAnimationFrame: callback => callback(), setTimeout, clearTimeout });
  return { nodes, animations, observers, events, windowEvents, reduce() { media.matches = true; motionListeners.forEach(fn => fn()); } };
}
let state = setup();
assert.equal(state.observers[0].observed.size, 6, 'Nested animations excluded');
state.observers[0].enter();
assert.deepEqual(state.animations.map(a => a.options.delay), [0, 55, 110, 165, 220, 220], 'Stagger capped');
assert.equal(state.observers[0].observed.size, 0, 'Entrances run once');
assert.ok(state.animations.every(a => a.options.fill === 'backwards'), 'Finished effects do not override hover styles');
state.reduce();
assert.ok(state.observers[0].disconnected, 'Preference change stops observation');
assert.ok(state.animations.every(a => a.canceled), 'Preference change cancels running entrances');
assert.equal(setup({ reduced: true }).observers.length, 0, 'Reduced motion starts without entrances');
assert.equal(setup({ observer: false }).observers.length, 0, 'Observer fallback keeps content available');
state = setup({ animationSupport: false }); state.observers[0].enter();
assert.equal(state.animations.length, 0, 'Animation API fallback');
state = setup({ hash: '#foxtrot' }); state.observers[0].enter();
assert.equal(state.animations.length, 0, 'Linked sections readable immediately');
state = setup(); state.observers[0].enter(); state.events.focusin();
assert.ok(state.animations.every(a => a.canceled), 'Keyboard focus cancels entrances');
state = setup(); state.observers[0].enter(); state.windowEvents.pageshow({ persisted: true });
assert.ok(state.animations.every(a => a.canceled), 'Back/forward cache does not replay entrances');
console.log('Passed: stagger, nesting, one-shot entrances, reduced motion, API fallbacks, anchors, keyboard focus and history restoration.');
