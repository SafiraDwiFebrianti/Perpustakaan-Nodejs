const {
    serviceAddBuku,
    serviceGetBuku,
    serviceGetBukuById,
    serviceUpdateBuku,
    serviceDeleteBuku
} = require("./buku.service")

const {checkToken} = require("../auth/token_validation")
const { verify } = require("jsonwebtoken")

module.exports = {
  controllerAddBuku: (req, res)=>{
      let body = req.body
      let token = req.get("authorization")
      if (token) {
        token = token.slice(7)
        verify(token, "secretkey", (err, decoded)=>{
          if (err) {
            res.json({
              success: 0,
              message: "login first"
            })
          }else {
            var user = decoded.result
            const data_buku = {
              kode_buku: body.kode_buku,
              judul: body.judul,
              pengarang: body.pengarang,
              penerbit: body.penerbit,
              stok: body.stok,
              petugas: user.nama_petugas,
              email: user.email
            }
      serviceAddBuku(data_buku, (err, results)=>{
          if(err){
              console.log(err);
              return res.json({
                  success: 0,
                  message: "Not success input Item"
              })
          }else {
            return res.json({
              success: 1,
              message: "success input new item",
              data:results
            })
          }
        })
      }
    })
  }
},


  controllerUpdateBuku: (req, res)=>{
          let body = req.body
          let token = req.get("authorization")
          if(token){
              token = token.slice(7)
              verify(token, "secretkey", (err, decoded)=>{
                  if(err){
                      res.json({
                          success: 0,
                          message: "login firs"
                      })
                  }else{
                      var user = decoded.result
                      const data_buku ={
                        id_buku: body.id_buku,
                        kode_buku: body.kode_buku,
                        judul: body.judul,
                        pengarang: body.pengarang,
                        penerbit: body.penerbit,
                        stok: body.stok
                      }
                      serviceUpdateBuku(data_buku, (err, results)=>{
                          if(err){
                              if(err === "false"){
                                  return res.json({
                                      success: 0,
                                      message: "user account access denied to access data"
                                  })
                              }
                              else{
                                  return console.log(err)
                              }
                          }if(!results){
                              console.log(results)
                              return res.json({
                                  success: 0,
                                  message: "Data Not Found"
                              })
                          }else{
                              return res.json({
                                  success: 1,
                                  message: "Update succesfuly"
                              })
                          }
                      })
                  }
              })
          }
      },


      controllerDeleteBuku:(req,res)=>{
          const body = req.body;
          serviceDeleteBuku(body,(err,results)=>{
              if(err){
                  return res.json({
                      success:0,
                      message:"Not Found data"+err
                  })
              }else{
                  return res.json({
                      success:1,
                      message:"Delete Success"
                  })
              }
          })
      },


      controllerGetBuku:(req,res)=>{
          serviceGetBuku((err,results)=>{
              if(err){
                console.log(err)
                  return
              }else{
                  return res.json({
                      success:1,
                      data:results
                  })
              }
          })
      },


      controllerGetBukuById:(req,res)=>{
          const data = req.params.id;
          serviceGetBukuById(data,(err,results)=>{
              if(err){
                  return res.json({
                      success:0,
                      message:"Not Found"
                  })
              }else{
                  return res.json({
                      success:1,
                      data:results
                  })
              }
          })
      },
  }
