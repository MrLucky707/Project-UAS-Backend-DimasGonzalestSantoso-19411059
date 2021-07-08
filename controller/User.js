const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const { requestResponse} = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.register = (data) =>
new Promise((resolve, reject) => {
    userModel.findOne({
        username: data.username
    }).then(user => {
        if (user) {
            resolve(requestResponse.gagal('Username Sudah Terdaftar'))
        }else{
            bcrypt.hash(data.password, 10, (err, hash) => {
                data.password = hash
                userModel.create(data)
                .then(() => resolve(requestResponse.sukses('Registrasi Berhasil')))
                .catch(() => reject(requestResponse.serverError))
            })
        }
    })
})

exports.login = (data) =>
new Promise((resolve, reject) =>{
    userModel.findOne({
        username: data.username
    }).then((user) => {
        if (user) {
            if(bcrypt.compareSync(data.password, user.password)) {
               resolve(requestResponse.suksesLogin(user))
        }else {
            reject(requestResponse.gagal('Password Salah'))
        }
        } else {
            reject(requestResponse.gagal('Username Tidak Terdaftar silahkan Registrasi'))
        }
    })
})

exports.insertUser = (data) =>
  new Promise((resolve, reject) => {
    userModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input User')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel.find({})
     .then(user => resolve(requestResponse.suksesWithData(user)))
     .catch(error => reject(requestResponse.serverError))
  })

 exports.getById = (id) =>
   new Promise((resolve, reject) => {
     userModel.find({
       _id: objectId(id)
     }).then(user => {resolve(requestResponse.suksesWithData(user))})
     .catch(error => reject(requestResponse.serverError))
   })

  exports.getAllUser = () =>
  new Promise((resolve, reject) =>  {
      userModel.find({
          level: 2
      }).then(user => {
        resolve(requestResponse.suksesWithData(user))
      }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    userModel.deleteOne({
          _id: objectId(id)
      }).then(() => resolve({
          status: true,
          pesan: 'Berhasil Menghapus Data'
      })).catch(() => reject({
          status: false,
          pesan: 'Gagal Menghapus Data'
      }))
  })

exports.edit = (data, id) =>
  new Promise((resolve, reject) => {
    userModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        resolve(requestResponse.sukses('Berhasil Edit Data'))
      }).catch(() => reject(requestResponse.serverError))
  })
  