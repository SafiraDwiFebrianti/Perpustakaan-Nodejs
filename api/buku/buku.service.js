const db = require("../config/connection")

module.exports = {
    serviceAddBuku: (data, callBack)=>{
        db.query(
              `insert into buku set ?`,
              data, (err, result, fields)=>{
                if (err) {
                  return callBack(err)
                }else {
                  return callBack(null, result)
                }
              }
            )
          },


    serviceUpdateBuku: (data, callBack)=>{
        db.query(
            `select * from buku where id_buku = ?`,
            [data.id_buku],
            (err, result)=>{
                if(err){
                    return callBack(err)
                }else if(data.buku === result[0].buku){
                    db.query(
                        `update buku set ? where id_buku = ?`,
                        [data, data.id_buku],
                        (err, result)=>{
                            if(err){
                                return callBack(err)
                            }else{
                                return callBack(null, result)
                            }
                        }
                    )
                }else{
                    return callBack("false")
                }
            }
        )
    },


    serviceDeleteBuku:(data,callBack)=>{
        db.query(
            `select id_buku from buku where id_buku = ?`,
        [data.id_buku],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else{
                db.query(
                    `delete from buku where id_buku = ?`,
                    [data.id_buku]);
                return callBack(null,results)
            }
        }
    )},


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


    serviceGetBukuById:(data,callBack)=>{
        db.query(
            `select * from buku where id_buku = ?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
}
