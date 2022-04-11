module.exports = (sequelize, DataTypes) => {

  const trip = sequelize.define("trip", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    country: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.STRING,
    },
    end_date: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.DATE,
    },
  }, {
    // charset: "utf8", // 한국어 설정
    // collate: "utf8_general_ci", // 한국어 설정
    tableName: "trip", // 테이블 이름
    timestamps: true, // createAt & updateAt 활성화
  });

  trip.associate = models => {
    trip.hasMany(models.diary, {foreignKey : "trip_id", sourceKey : "id"});
  }; // trip : diary = 1 : N

  trip.associate = models => {
    trip.hasMany(models.account, {foreignKey : "trip_id", sourceKey : "id"});
  }; // trip : account = 1 : N

  trip.associate = models => {
    trip.belongsTo(models.user, {foreignKey : "user_id", sourceKey : "id"});
  }; // user : trip = 1 : N

  return trip;
};