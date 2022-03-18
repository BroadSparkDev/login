module.exports = (sequelize, DataTypes) => {
    const Signup = sequelize.define("signup", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          }
        }
      },
      status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
      random:{
        type: String
      }
    });
  
    return Signup;
  };