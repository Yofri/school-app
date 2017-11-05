module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  });

  StudentSubject.associate = (models) => {
    StudentSubject.belongsTo(models.Subject);
    StudentSubject.belongsTo(models.Student);
  };

  return StudentSubject;
};
