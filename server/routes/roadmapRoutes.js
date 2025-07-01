const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const NodeCache = require("node-cache");

const router = express.Router();

const API_KEY = "AIzaSyCLVgqqKzNXjewGkPJSz4bm48mjJURc7rI";
const genAI = new GoogleGenerativeAI(API_KEY);
const myCache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

router.post("/generate", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "İçerik eksik." });
    }

    // Önbellek kontrol
    const cachedResponse = myCache.get(content);
    if (cachedResponse) {
      return res.status(200).json({ success: true, generatedContent: cachedResponse });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemMessage = `
Sen bir yazılım uzmanı gibi davran. Kullanıcı hangi alanda yol haritası isterse ona detaylı ama sade bir yol haritası ver.

Eğer "Backend öğrenmek istiyorum" derse:
- Hangi teknolojileri öğrenmesi gerektiğini sırayla yaz (örneğin: Git, Linux, Node.js, Express.js, MongoDB vs.)
- Hangi kaynaklardan çalışabileceğini öner
- Hangi projeleri yaparak pratiğe dökebileceğini yaz

Yanıtı sade, temiz ve adım adım ver.
Eğer kullanıcı frontend, mobil, siber güvenlik gibi başka bir alan isterse ona göre özelleştir.
Eğer konu ilgisizse şu cevabı ver:
"Yalnızca yazılım alanlarında yol haritası verebilirim (örneğin backend, frontend, mobil, oyun geliştirme)."

Eğer kullanıcı "sen kimsin" derse: 
"Ben yazılım yol arkadaşınım" cevabını ver.

Yapay zeka olduğunu söyleme.
`;

    const result = await model.generateContent([systemMessage, content]);
    const response = await result.response;
    const text = response.text();

    // Önbelleğe yaz
    myCache.set(content, text);

    res.status(200).json({
      success: true,
      generatedContent: text,
    });

  } catch (error) {
    console.error("❌ Yol Haritası AI Hatası:", error);
    res.status(500).json({
      error: error.message || "Sunucu hatası oluştu.",
      detay: error.stack || "Stack trace yok",
    });
  }
});

module.exports = router;
