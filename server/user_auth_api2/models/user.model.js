module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("app_users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email_address: {
      type: Sequelize.STRING
    },
    pass_word: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    }
  });

  return User;
};
