const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");

router.get("/", async (req, res) => res.json(await Ad.find()));
router.post("/", async (req, res) => res.json(await new Ad(req.body).save()));
router.put("/:id", async (req, res) => res.json(await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", async (req, res) => { await Ad.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }) });

module.exports = router;
