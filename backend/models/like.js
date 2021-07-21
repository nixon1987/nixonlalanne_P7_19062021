module.exports = (sequelize, Datatypes) => {
  like = sequelize.define("like", {
    userId: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
    like: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
    idPost: { type: Datatypes.INTEGER, allowNull: true },
  });
  return like;
};
