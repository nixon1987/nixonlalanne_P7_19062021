module.exports = (sequelize, Datatypes) => {
  Post = sequelize.define("Post", {
    titre: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    contenu: {
      type: Datatypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    userId: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
    likeCount: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
  });
  return Post;
};
