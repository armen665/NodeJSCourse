const dotenv = require('dotenv').config();
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

const migs = sequelize.define('migs', {
    mig_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'migs',
    timestamps: true,
    createdAt: false
});

const db_versions = sequelize.define('db_versions', {
    version: DataTypes.INTEGER,
    allowNull: false
}, {
    timestamps: false,
    tableName: 'db_versions'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const mig = await migs.create({name: 'initial'});

        // const mig1File = fs.readFileSync('./sql/mig/migration.1.sql').toString();
        // await sequelize.query(mig1File);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


