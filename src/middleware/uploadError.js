const multer = require('multer');

const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // kesalahan terkait multer
    console.log(err.code);
    if (err.code === "LIMIT_FILE_SIZE") {
      // ukuran file melebihi batas
      return res.status(400).json({
        error: true,
        message: "kecilin bang!",
      });
    }
  } else {
    // kesalahan bukan terkait multer
    console.log(err);
    return res.status(500).json({
      error: true,
      message: "Terjadi kesalahan saat mengunggah file.",
    });
  }
};


module.exports = handleUploadError;