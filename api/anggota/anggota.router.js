const{
  controllerAddAnggota,
  controllerUpdateAnggota,
  controllerDeleteAnggota,
  controllerLogin } = require("./anggota.controller");

  const router = require("express").Router();
  const { checkToken } = require("../auth/token_validation")

router.post("/", controllerAddAnggota);
// router.get("/", checkToken, controllerGetAnggotaByEmail);
router.patch("/", checkToken, controllerUpdateAnggota);
router.delete("/", checkToken, controllerDeleteAnggota);
router.post("/login",controllerLogin)

module.exports = router;
