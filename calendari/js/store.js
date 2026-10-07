/*!
 * store.js — Persistència local: estat (petit) i dibuixos (grans).
 *
 * - L'estat del projecte va a localStorage (uns quants KB).
 * - Els dibuixos (data URLs de fins a uns quants MB) van a IndexedDB.
 * - Si IndexedDB no està disponible (per exemple obrint els fitxers amb
 *   file://), es fa servir memòria: l'app funciona, però els dibuixos no
 *   sobreviuen a un refresc. L'estat sí (localStorage).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BLStore = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var DB_NAME = 'bernatlab-calendari';
  var DB_VERSION = 1;
  var STORE = 'kv';
  var STATE_KEY = 'bl-calendari-2027:state';
  var mem = {};
  var dbPromise = null;
  var idbOk = typeof indexedDB !== 'undefined' && indexedDB !== null;
  var warned = false;

  function openDB() {
    if (!idbOk) return Promise.reject(new Error('sense IndexedDB'));
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      var req;
      try { req = indexedDB.open(DB_NAME, DB_VERSION); }
      catch (e) { reject(e); return; }
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'k' });
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
      req.onblocked = function () { reject(new Error('IndexedDB bloquejat')); };
    }).catch(function (e) {
      idbOk = false;
      dbPromise = null;
      throw e;
    });
    return dbPromise;
  }

  function tx(mode, fn) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode);
        var store = t.objectStore(STORE);
        var out = fn(store);
        t.oncomplete = function () { resolve(out && out.result !== undefined ? out.result : out); };
        t.onerror = function () { reject(t.error); };
        t.onabort = function () { reject(t.error); };
      });
    });
  }

  function get(key) {
    if (!idbOk) return Promise.resolve(mem[key]);
    return tx('readonly', function (s) { return s.get(key); }).then(function (rec) {
      return rec ? rec.v : undefined;
    }).catch(function () { return mem[key]; });
  }

  function set(key, value) {
    mem[key] = value;
    if (!idbOk) return Promise.resolve(false);
    return tx('readwrite', function (s) { s.put({ k: key, v: value }); }).then(function () { return true; })
      .catch(function () { return false; });
  }

  function del(key) {
    delete mem[key];
    if (!idbOk) return Promise.resolve(false);
    return tx('readwrite', function (s) { s.delete(key); }).then(function () { return true; })
      .catch(function () { return false; });
  }

  function clearAll() {
    mem = {};
    try { localStorage.removeItem(STATE_KEY); } catch (e) {}
    if (!idbOk) return Promise.resolve(false);
    return tx('readwrite', function (s) { s.clear(); }).then(function () { return true; })
      .catch(function () { return false; });
  }

  /* Estat del projecte (petit) a localStorage. */
  function saveState(state) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
      return true;
    } catch (e) { return false; }
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STATE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function clearState() {
    try { localStorage.removeItem(STATE_KEY); } catch (e) {}
  }

  function isPersistent() { return idbOk; }

  return {
    get: get, set: set, del: del, clearAll: clearAll,
    saveState: saveState, loadState: loadState, clearState: clearState,
    isPersistent: isPersistent
  };
});
