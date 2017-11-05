'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last name required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email required'
        },
        isEmail: {
          msg: 'Email address must be valid email address'
        },
        isDuplicate(email, next) {
          console.log(this.id);
          if (this.id === null) {
            Teacher.findAll({
              where: { email }
            }).then(teacher => {
              if (teacher.length > 0) {
                return next('Email already in use');
              }
              next();
            }).catch(err => {
              return next(err);
            });
          } else {
            next();
          }
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  });

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.Subject);
  };

  return Teacher;
};