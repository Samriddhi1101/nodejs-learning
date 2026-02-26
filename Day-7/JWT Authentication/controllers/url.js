const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).render("home", {
                error: "URL is required"
            });
        }

        const shortId = nanoid(8);

        const newUrl = await URL.create({
            shortId,
            redirectedUrl: url,
            visitHistory: []
        });

        // ✅ Render page instead of JSON
        return res.render("home", {
            id: newUrl.shortId
        });

    } catch (error) {
        console.error("Error creating short URL:", error);

        return res.status(500).render("home", {
            error: "Internal Server Error"
        });
    }
}

async function handleGetAnalytics(req, res) {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Short URL not found"
        });
    }
    return res.json({
        totalClick: result.visitHistory.length,
        analytics: result.visitHistory
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};