module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor_Episode';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
    actor_id: dataTypes.BIGINT(10).UNSIGNED,
    episode_id: dataTypes.BIGINT(10)
    };
    let config = {
        tableName: 'actor_episode',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Actor_Episode = sequelize.define(alias, cols, config); 

    
        
    return Actor_Episode
};
