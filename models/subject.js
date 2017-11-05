module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = (models) => {
    Subject.hasMany(models.Teacher);
    Subject.hasMany(models.StudentSubject);
    Subject.belongsToMany(models.Student, {
      through: StudentSubject
    });
  };

  return Subject;
};
