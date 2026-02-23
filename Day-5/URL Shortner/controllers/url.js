const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }

        const shortId = nanoid(8);

        const newUrl = await URL.create({
            shortId,
            redirectedUrl: url,
            visitHistory: []
        });

        return res.status(201).json({
            success: true,
            shortId: newUrl.shortId
        });

    } catch (error) {
        console.error("Error creating short URL:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    handleGenerateNewShortURL
};