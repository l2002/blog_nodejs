const Course = require('../models/Course');
const { muntipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render('me/stored-courses', {
          deletedCount,
          courses: muntipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  // [GET] /me/trasg/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(courses =>
        res.render('me/trash-courses', {
          courses: muntipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
