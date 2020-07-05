const{
  controllerAddBuku,
  controllerUpdateBuku,
  controllerDeleteBuku,
  controllerGetBuku,
  controllerGetBukuById
} = require("./buku.controller");

  const router = require("express").Router();
  const { checkToken } = require("../auth/token_validation")

  router.post("/", checkToken, controllerAddBuku);
  router.get("/",checkToken, controllerGetBuku);
  router.get("/cek",checkToken, controllerGetBukuById);
  router.patch("/",checkToken, controllerUpdateBuku);
  router.delete("/",checkToken, controllerDeleteBuku);

  module.exports = router;
