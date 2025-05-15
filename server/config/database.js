const mongoose = require("mongoose")


const databaseConnect = async()=>{
try {
   await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));
} catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
}
}


module.exports = databaseConnect