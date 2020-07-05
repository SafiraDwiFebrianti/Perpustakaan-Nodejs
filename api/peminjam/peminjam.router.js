const {
  controllerCekBuku,
  controllerGetBuku,
  controllerPesanBuku
} = require('./peminjam.controller');
const {checkToken} = require("../auth/token_validation")
const router = require('express').Router();

router.get('/cek', checkToken, controllerCekBuku) //mengecek data berdasarkan email
router.get('/', checkToken, controllerGetBuku)    //mengecek seluruh data dalam tabel barang
router.post('/pesan', checkToken, controllerPesanBuku)

module.exports = router
