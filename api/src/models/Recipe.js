const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{        
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER,
    
    },
    step:{  // pasos o analyzedInstructions
      type: DataTypes.ARRAY(DataTypes.STRING),
    
    },
    image:{
      type: DataTypes.STRING
    },
    createInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
    
  },{
    timestamps: false
  });
};
