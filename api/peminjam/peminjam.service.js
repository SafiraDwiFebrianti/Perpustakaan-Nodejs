const db = require('../config/connection');
module.exports={
    serviceCekBuku:(data,callBack)=>{
        db.query(
            `select * from buku where email=?`,
            [data],
            (err,results)=>{
              console.log(results)
                if(err){
                    console.log(err)
                    return callBack(err);
                }else if(results.length < 1){
                    return callBack("item not found")
                }else if(results[0].stok <= 0){
                    console.log(results[0].stok);
                    return callBack("out of stok");

                }else{
                    return callBack(null,results);
                }
            }
        )
    },

    serviceGetBuku:callBack=>{
        db.query(`select * from buku`,
        [],
        (err,result)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    },

    servicePesanBuku:(data,callBack)=>{
        db.query(
            `select * from buku where kode_buku=?`,
            [data.kode_buku],(err,results)=>{
                if(err){
                    console.log(err);
                    return callBack(err)
                }if(results.length < 1){
                    return callBack("No-Id")
                }else if(results[0].stok <= 0){
                    return callBack("out of stok")
                }else if(results[0].stok < data.stok){
                    return callBack("stok tdk cukup")
                }else if(data.petugas === results[0].petugas){
                    return callBack("myItem")
                }
                else{
                    const data_buku = results[0];
                    // const total = data_buku.harga * data.jumlah
                    const hasil = results[0].stok - data.jumlah
                    console.log(results[0].petugas);
                    db.query(
                        `update buku set stok=? where kode_buku=?`,
                        [
                            hasil,
                            data.kode_buku
                        ]
                    );
                    db.query(
                        `insert into peminjam(anggota,petugas,jumlah,tgl_pinjam)
                            values(?,?,?,?)`,
                            [
                                data.anggota, //pembeli
                                data.petugas,
                                data.jumlah,
                                data.tgl_pinjam
                                // total,
                            ], (err, res)=>{
                              console.log(res)
                            }
                    );

                    return callBack(null,results)
                }
            }
        )
    }
}
