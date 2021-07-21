module.exports = (sequelize, Datatypes) => {
  Image = sequelize.define("Image", {
    userId: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: Datatypes.STRING,
      allowNull: true,
    },
  });
  return Image;
};
