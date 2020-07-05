const db = require("../config/connection")

module.exports = {
    serviceAddAnggota: (data, callBack)=>{
        db.query(
            `insert into anggota(nama_anggota, gender, alamat, telefon, email, password)
            values (?,?,?,?,?,?)`,
            [
                data.nama_anggota,
                data.gender,
                data.alamat,
                data.telefon,
                data.email,
                data.password
            ],
            (error, result, fields) =>{
                if(error){
                    return callBack(error);
                }else{
                    return callBack(null, result)
                }
            }
        )
    },


    serviceUpdateAnggota: (data, callBack)=>{
        db.query(
            `update anggota set nama_anggota=?, gender=?, alamat=?, telefon=?, email=?, password=? where id_anggota=?`,
            [
              data.nama_anggota,
              data.gender,
              data.alamat,
              data.telefon,
              data.email,
              data.password,
              data.id_anggota
            ],
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },


    serviceDeleteAnggota: (data, callBack)=>{
        db.query(
            `select * from anggota where id_anggota=?`,
            [data.id_anggota],
            (err, results)=>{
                if(err){
                    callBack(err)
                }if(!results){
                  callBack(results)
                  // console.log(result)
                }
                else{
                    db.query(`delete from anggota where id_anggota=?`,
                        [data.id_anggota]
                    )
                    //console.log(results)
                    return callBack(null, results[0])
                }
            })
          },


    serviceGetAnggotaByEmail: (email, callBack)=>{
        db.query(
            `select nama_anggota, email, password from anggota where email = ?`,
            [email],
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    }
}
