const {
    serviceAddAnggota,
    serviceUpdateAnggota,
    serviceDeleteAnggota,
    serviceGetAnggotaByEmail
} = require("./anggota.service")

const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken")

module.exports = {
    controllerAddAnggota: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceAddAnggota(body, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        })
    },


    controllerUpdateAnggota: (req, res)=>{
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        serviceUpdateAnggota(body, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Update failed"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "Update successfully"
                })
            }
        })
    },


    controllerDeleteAnggota: (req, res)=>{
        const data = req.body
        serviceDeleteAnggota(data, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "Anggota Berhasil Dihapus"
                })
            }
        })
    },


    controllerLogin: (req, res)=>{
        const body = req.body
        serviceGetAnggotaByEmail(body.email, (err, results)=>{
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password)

            if(result){
                results.password = undefined
                const jsonwebtoken = sign({result:results}, "secretkey",{
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "Login successfully, Your Account Already Use",
                    account: results,
                    token: jsonwebtoken
                })
            }else{
                return res.json({
                    success: 0,
                    message: "email or password invalid",
                })
            }
        })
    }
}
