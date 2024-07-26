const {Sequelize} = require('sequelize');
const rawatInap = require('./rawatInap');
const sequelize = new Sequelize('uasDpsiNandiYa', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//define models
const Akun = require('./akun')(sequelize, Sequelize.DataTypes);
const Dokter = require('./dokter')(sequelize, Sequelize.DataTypes);
const Kamar = require('./kamar')(sequelize, Sequelize.DataTypes);
const Pasien = require('./pasien')(sequelize, Sequelize.DataTypes);
const Periksa = require('./periksa')(sequelize, Sequelize.DataTypes);
const Petugas = require('./petugas')(sequelize, Sequelize.DataTypes);
const RawatInap = require('./rawatInap')(sequelize, Sequelize.DataTypes);


//database relation
Akun.hasOne(Dokter, { foreignKey: "ID_Akun" });
Dokter.belongsTo(Akun, { foreignKey: "ID_Akun" });

Akun.hasOne(Pasien, { foreignKey: "ID_Akun" });
Pasien.belongsTo(Akun, { foreignKey: "ID_Akun" });

Akun.hasOne(Petugas, { foreignKey: "ID_Akun" });
Petugas.belongsTo(Akun, { foreignKey: "ID_Akun" });

Dokter.hasMany(Periksa, { foreignKey: "ID_Dokter" });
Periksa.belongsTo(Dokter, { foreignKey: "ID_Dokter" });

RawatInap.hasMany(Periksa, { foreignKey: "ID_RawatInap" });
Periksa.belongsTo(RawatInap, { foreignKey: "ID_RawatInap" });

Pasien.hasMany(RawatInap, { foreignKey: "ID_Pasien" });
RawatInap.belongsTo(Pasien, { foreignKey: "ID_Pasien" });

Kamar.hasMany(RawatInap, { foreignKey: "ID_Kamar" });
RawatInap.belongsTo(Kamar, { foreignKey: "ID_Kamar" });

sequelize.sync().then(() => {
    console.log("Koneksi Berhasil, berjalan di port "+ process.env.port);
}).catch(err => {
    console.log("Koneksi ke database gagal : ", err);
});

module.exports = {sequelize, Akun, Dokter, Kamar, Pasien, Periksa, Petugas, RawatInap};