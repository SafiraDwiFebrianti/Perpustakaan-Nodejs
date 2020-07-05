require("dotenv").config();
const express = require('express')
const app = express();
const petugasRouter = require("./api/petugas/petugas.router")
const bukuRouter = require("./api/buku/buku.router")
const anggotaRouter = require("./api/anggota/anggota.router")
const peminjamRouter = require("./api/peminjam/peminjam.router")


app.use(express.json())
app.use("/api/petugas", petugasRouter)
app.use("/api/buku", bukuRouter)
app.use("/api/anggota", anggotaRouter)
app.use("/api/peminjam", peminjamRouter)

app.listen(process.env.APP_PORT, ()=>{
  console.log("running on port "+process.env.APP_PORT)
})
