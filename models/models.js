const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Модель пользователя
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'), 
        allowNull: false,
        defaultValue: 'user' 
    }
});

// Модель рейса
const Flight = sequelize.define('flight', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    airportArrival: {
        type: DataTypes.STRING,
        allowNull: false
    },
    airportDeparture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aviacompany: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Модель избранных рейсов
const Favorite = sequelize.define('favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'flights',
            key: 'id'
        }
    }
});

// Определяем связь многие ко многим
User.belongsToMany(Flight, { through: Favorite, foreignKey: 'userId' });
Flight.belongsToMany(User, { through: Favorite, foreignKey: 'flightId' });

// Модель таблицы с номерами рейсов
const FlightNumber = sequelize.define('flight_number', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aviacompany: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'flights',
            key: 'id'
        }
    }
});

FlightNumber.belongsTo(Flight); 
Flight.hasMany(FlightNumber);

module.exports = {
    User,
    Flight,
    Favorite,
    FlightNumber
};
