const{
  controllerAddPetugas,
  controllerGetPetugas,
  controllerGetAnggota,
  controllerGetPetugasById,
  // controllerGetPetugasByEmail,
  controllerUpdatePetugas,
  controllerDeletePetugas,
  controllerLogin } = require("./petugas.controller");

  const router = require("express").Router();
  const { checkToken } = require("../auth/token_validation")

router.post("/", controllerAddPetugas);
router.get("/cekpetugas", checkToken, controllerGetPetugas);
router.get("/cekanggota", checkToken, controllerGetAnggota);
router.get("/id", checkToken, controllerGetPetugasById);
// router.get("/email", checkToken, controllerGetPetugasByEmail);

router.patch("/", checkToken, controllerUpdatePetugas);
router.delete("/", checkToken, controllerDeletePetugas);
router.post("/login",controllerLogin)

module.exports = router;
