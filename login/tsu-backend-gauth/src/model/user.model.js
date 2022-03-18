module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          }
        }
      },
      password: {
        type: DataTypes.STRING
      },
      
       useruuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.STRING
      },
      country:{
        type: DataTypes.STRING
      },
    },
    
    { timestamps: false });
  
    return User;
  };
  
        // firt name last name,,address, country, mobile, date of birth