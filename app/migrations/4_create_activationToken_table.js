module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ActivationTokens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            UserId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: "Users", key: "id" },
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ActivationTokens');
    }
};