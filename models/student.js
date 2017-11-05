module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
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
            Student.findAll({
              where: { email }
            }).then(student => {
              if (student.length > 0) {
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
    }
  });

  Student.prototype.getFullname = function () {
    return `${this.first_name} ${this.last_name}`;
  }

  Student.associate = (models) => {
    Student.hasMany(models.Subject);
    Student.hasMany(models.StudentSubjects);
    Student.belongsToMany(models.Subject, {
      through: StudentSubject
    });
  };

  return Student;
};
