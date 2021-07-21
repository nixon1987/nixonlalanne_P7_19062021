module.exports = (sequelize, Datatypes) => {
  User = sequelize.define("User", {
    nom: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    mot_de_passe: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    role: {
      type: Datatypes.STRING,
      allowNull: false,
      require: false
    },
  });
  return User;
};

