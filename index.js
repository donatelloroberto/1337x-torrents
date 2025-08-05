const { addonBuilder } = require("stremio-addon-sdk");
const builder = new addonBuilder(require("./manifest.json"));

// Sample handlers (replace with real ones)
const rarbg = require("./rarbg");      // should export getStream/getCatalog
const tpb = require("./tpb");
const kat = require("./kat");
const debrid = require("./debrid");
const sktorrent = require("./sktorrent");

builder.defineStreamHandler(args => {
    if (args.id.startsWith("rarbg_")) return rarbg.getStream(args);
    if (args.id.startsWith("tpb_")) return tpb.getStream(args);
    if (args.id.startsWith("kat_")) return kat.getStream(args);
    if (args.id.startsWith("debrid_")) return debrid.getStream(args);
    if (args.id.startsWith("skt_")) return sktorrent.getStream(args);
    return null;
});

builder.defineCatalogHandler(args => {
    if (args.id === "rarbg_catalog") return rarbg.getCatalog(args);
    if (args.id === "tpb_catalog") return tpb.getCatalog(args);
    if (args.id === "kat_catalog") return kat.getCatalog(args);
    if (args.id === "debrid_catalog") return debrid.getCatalog(args);
    if (args.id === "sktorrent_catalog") return sktorrent.getCatalog(args);
    return null;
});

builder.defineMetaHandler(args => {
    // You can implement unified meta lookup if needed
    return { meta: {} };
});

module.exports = builder.getInterface();