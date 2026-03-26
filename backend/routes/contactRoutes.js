const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// CREATE
router.post("/", async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ
router.get("/", async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
});

// UPDATE
router.put("/:id", async (req, res) => {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
