const {
    serviceCekBuku,
    serviceGetBuku,
    servicePesanBuku
} = require('./peminjam.service');
const { verify } = require('jsonwebtoken')

module.exports={
  //berdasarkan email dan token
    controllerCekBuku:(req,res)=>{
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
            var user = decoded.result.email
            serviceCekBuku(user,(err,results)=>{
                if(err){
                    if(err === "item not found"){
                        return res.json({
                            success:0,
                            message:"Data Tidak Ditemukan"
                        })
                    }
                    if(err === "out of stok"){
                        return res.json({
                            success:0,
                            message:"out of stok"
                        })
                    }
                    console.log(err);
                    return;
                }if(!results){
                    return res.json({
                        message:"Tidak Ada",
                        data:results
                    })
                }else{
                    return res.json({
                        message:"Tersedia",
                        data:results
                    })
                  }
                })
              }
            })
          }
        },


  //menampilkan semua barang yang ada di database
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

    controllerPesanBuku:(req,res)=>{
        const body = req.body
        const token = req.get("authorization")
        if(token){
            let wow = token.slice(7)
            verify(wow,"secretkey",(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Login First"
                    })
                }else{
                    var user = decoded.result
                    const data = {
                        anggota: user.nama_anggota,
                        jumlah: body.jumlah,
                        tgl_pinjam: body.tgl_pinjam
                    }
                    servicePesanBuku(data,(err,results)=>{
                        if(err){
                            if(err === "out of stok"){
                                return res.json({
                                    success: 0,
                                    message: "Stok Habis"
                                })
                            }
                            if(err === "stok tdk cukup"){
                                return res.json({
                                    success: 0,
                                    message: "Permintaan Terlalu Banyak"
                                })
                            }
                            if(err === "No-Id"){
                                return res.json({
                                    success:0,
                                    message:"Tidak Ditemukan"
                                })
                            }
                            if(err === "myItem"){
                                return res.json({
                                    success: 0,
                                    message: "Barang Milik Sendiri"
                                })
                            }
                            console.log(err);
                            return ;
                        }
                        if(!results){
                            return res.json({
                                success:0,
                                message:"Tidak Ditemukan"
                            })
                        }else{
                            return res.json({
                                success:1,
                                message:"Terpesan"
                            })
                        }
                    })
                }
            })
        }
    },

}
