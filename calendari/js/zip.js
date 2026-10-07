/*!
 * zip.js — Escriptor de ZIP mínim (mètode "store", sense compressió).
 *
 * Els PNG ja estan comprimits, així que val la pena evitar una dependència
 * externa per empaquetar els 12 mesos en un sol fitxer.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BLZip = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function dosDateTime(date) {
    var d = date || new Date();
    var time = ((d.getHours() & 0x1F) << 11) | ((d.getMinutes() & 0x3F) << 5) | ((d.getSeconds() / 2) & 0x1F);
    var day = (((d.getFullYear() - 1980) & 0x7F) << 9) | (((d.getMonth() + 1) & 0x0F) << 5) | (d.getDate() & 0x1F);
    return { time: time, date: day };
  }

  function u16(v) { return [v & 0xFF, (v >>> 8) & 0xFF]; }
  function u32(v) { return [v & 0xFF, (v >>> 8) & 0xFF, (v >>> 16) & 0xFF, (v >>> 24) & 0xFF]; }

  /**
   * files: [{ name, blob }]  (els blobs es llegeixen amb arrayBuffer)
   * Retorna Promise<Blob> amb el .zip
   */
  function create(files) {
    return Promise.all(files.map(function (f) {
      return f.blob.arrayBuffer().then(function (buf) {
        return { name: f.name, bytes: new Uint8Array(buf) };
      });
    })).then(function (entries) {
      var chunks = [];
      var central = [];
      var offset = 0;
      var dt = dosDateTime(new Date());

      entries.forEach(function (e) {
        var nameBytes = new TextEncoder().encode(e.name);
        var crc = crc32(e.bytes);
        var local = [].concat(
          u32(0x04034b50), u16(20), u16(0), u16(0), u16(dt.time), u16(dt.date),
          u32(crc), u32(e.bytes.length), u32(e.bytes.length),
          u16(nameBytes.length), u16(0)
        );
        chunks.push(new Uint8Array(local));
        chunks.push(nameBytes);
        chunks.push(e.bytes);

        central.push({
          name: nameBytes,
          crc: crc,
          size: e.bytes.length,
          offset: offset
        });
        offset += local.length + nameBytes.length + e.bytes.length;
      });

      var cdStart = offset;
      central.forEach(function (c) {
        var header = [].concat(
          u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(dt.time), u16(dt.date),
          u32(c.crc), u32(c.size), u32(c.size),
          u16(c.name.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(c.offset)
        );
        chunks.push(new Uint8Array(header));
        chunks.push(c.name);
        offset += header.length + c.name.length;
      });
      var cdSize = offset - cdStart;

      chunks.push(new Uint8Array([].concat(
        u32(0x06054b50), u16(0), u16(0),
        u16(central.length), u16(central.length),
        u32(cdSize), u32(cdStart), u16(0)
      )));

      return new Blob(chunks, { type: 'application/zip' });
    });
  }

  return { create: create, crc32: crc32 };
});
