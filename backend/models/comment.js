module.exports = (sequelize, Datatypes) => {
  Comment = sequelize.define("Comment", {
    userId: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
    contenu: {
      type: Datatypes.TEXT,
      allowNull: true,
    },
  });
  return Comment;
};

