"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Global VARIABLES
var $ = document;
var that = void 0; // TOGGLE FULL SCRREN FOR THE ENTIRE WINDOW

var toggleFullScreen = function toggleFullScreen() {
  // Already in full screen mode
  if (!$.fullscreenElement) {
    // Get the document in full screen
    $.documentElement.requestFullscreen()["catch"](function (error) {
      console.log("Error requesting full screen mode:,".concat(error)); // Exit Mode

      $.exitFullscreen()["catch"](function (error) {
        console.log("Error requesting full screen mode:,".concat(error));
      });
    });
  }
}; // LISTENER ON THE MODE BUTTON WHEN CLICKED


$.addEventListener('DOMContentLoaded', function () {
  var ModeBtn = $.querySelector('#ViewFullScreen');
  ModeBtn.addEventListener('click', toggleFullScreen);
}); // calender

var DaysContainer = $.querySelector('.days-container');
var monthName = $.querySelector('.month-name');
var prevBtn = $.querySelector('.prev-btn');
var nextBtn = $.querySelector('.next-btn'); // current Date 

var currentDate = new Date(); // render the Calender

var renderCalender = function renderCalender() {
  // clear defaults 
  DaysContainer.innerHTML = ''; // first day of the month

  var firstDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // last day of the month

  var lastDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), +1, 0); // first day week 

  var firstDayWeek = firstDayMonth.getDay(); // render days 

  var dayBox = $.createElement('div');

  for (var i = 0; i < firstDayWeek; i++) {
    dayBox.classList.add('day', 'empty');
    DaysContainer.appendChild(dayBox);
  } // render days


  for (var _i = 1; _i <= lastDayMonth.getDate(); _i++) {
    var dayElement = $.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = _i; // check today

    if (_i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date.getFullYear()) {
      dayBox.classList.add('active', 'today');
    }

    DaysContainer.appendChild(dayBox);
  }
};

var updateMonth = function updateMonth() {
  monthName.textContent = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });
}; // events
// prevBtn.addEventListener('click', ()=> {
//     currentDate.setMonth(currentDate.getMonth() -1)
//     updateMonth()
//     renderCalender()
// })
// nextBtn.addEventListener('click', ()=> {
//     currentDate.setMonth(currentDate.getMonth() +1)
//     updateMonth()
//     renderCalender()
// })
// updateMonth()
// renderCalender()
// close bar


var closeSidebarNav = $.querySelector('#closeSidebarNav');
var asideBarMenu = $.querySelector('aside');
var mainBar = $.querySelector('main');
var cardBox = $.querySelectorAll('.card-box');
closeSidebarNav.addEventListener('click', function (e) {
  e.preventDefault();
  asideBarMenu.classList.toggle('shrinkAside');
  mainBar.classList.toggle('expand-main');
  cardBox.forEach(function (card) {
    card.classList.toggle('card-box-resize');
  });
}); // event on card in course management

var quickChoices = $.querySelector('.quick-choices');
var cards = quickChoices.children;
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var card = _step.value;

    if (card.classList.contains('create_course')) {
      card.addEventListener('click', function () {
        $.querySelector('.createCourseContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.back-button').addEventListener('click', function () {
          var createCourseContainer = $.querySelector('.createCourseContainer');

          if (createCourseContainer.classList.contains('show_create_cousre')) {
            $.querySelector('.createCourseContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          }
        });
      });
    } else if (card.classList.contains('manage_courses')) {
      card.addEventListener('click', function () {
        $.querySelector('.manageCourseContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('#backButton').addEventListener('click', function () {
          var manageCourseContainer = $.querySelector('.manageCourseContainer');

          if (manageCourseContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.manageCourseContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('delete_courses')) {
      card.addEventListener('click', function () {
        $.querySelector('.DeleteCourseContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('#backBtn').addEventListener('click', function () {
          var DeleteCourseContainer = $.querySelector('.DeleteCourseContainer');

          if (DeleteCourseContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.DeleteCourseContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre'); // view_students-progress
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('manage_students')) {
      card.addEventListener('click', function () {
        $.querySelector('.ManageStudentContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.backButton').addEventListener('click', function () {
          var ManageStudentContainer = $.querySelector('.ManageStudentContainer');

          if (ManageStudentContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.ManageStudentContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('all_students')) {
      // AddStudentContainer
      card.addEventListener('click', function () {
        $.querySelector('.AllStudentContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.back').addEventListener('click', function () {
          var AllStudentContainer = $.querySelector('.AllStudentContainer');

          if (AllStudentContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.AllStudentContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('add_student')) {
      card.addEventListener('click', function () {
        $.querySelector('.AddStudentContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.ButtonBack').addEventListener('click', function () {
          var AddStudentContainer = $.querySelector('.AddStudentContainer');

          if (AddStudentContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.AddStudentContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('explore_students')) {
      card.addEventListener('click', function () {
        $.querySelector('.ExploreStudentContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.Back-BTN').addEventListener('click', function () {
          var ExploreStudentContainer = $.querySelector('.ExploreStudentContainer');

          if (ExploreStudentContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.ExploreStudentContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('manage_teachers')) {
      card.addEventListener('click', function () {
        $.querySelector('.ManageTeachersContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.backteacherbtn').addEventListener('click', function () {
          var ManageTeachersContainer = $.querySelector('.ManageTeachersContainer');

          if (ManageTeachersContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.ManageTeachersContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('add_teacher')) {
      card.addEventListener('click', function () {
        $.querySelector('.AddTeacherContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('#backBtn').addEventListener('click', function () {
          var AddTeacherContainer = $.querySelector('.AddTeacherContainer');

          if (AddTeacherContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.AddTeacherContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('student_attendance')) {
      card.addEventListener('click', function () {
        $.querySelector('.TeachersAttendanceContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('.backattendacebtn').addEventListener('click', function () {
          var TeachersAttendanceContainer = $.querySelector('.TeachersAttendanceContainer');

          if (TeachersAttendanceContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.TeachersAttendanceContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    } else if (card.classList.contains('teacher_attendance')) {
      card.addEventListener('click', function () {
        $.querySelector('.studentsAttendanceContainer').classList.add('show_create_cousre');
        $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
        $.querySelector('#backattendace').addEventListener('click', function () {
          var studentsAttendanceContainer = $.querySelector('.studentsAttendanceContainer');

          if (studentsAttendanceContainer.classList.contains('show_create_cousre')) {
            console.log(true);
            $.querySelector('.studentsAttendanceContainer').classList.remove('show_create_cousre');
            $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre');
          } else {
            console.log(false);
          }
        });
      });
    }
  } // DeleteCourseContainer
  // CONFIRM DELETION 
  // const confirmBtn = $.querySelector('#confirmDeletion');
  // confirmBtn.addEventListener('click', () => {
  //     $.querySelector('.password-container').classList.add('show-password-container')
  //     $.querySelector('.confirm-password').classList.add('show-password-container')
  // })
  // const cancelDeletion = $.querySelector('#cancelDeletion');
  // cancelDeletion.addEventListener('click', () => {
  //     $.querySelector('.password-container').classList.remove('show-password-container')
  //     $.querySelector('.confirm-password').classList.remove('show-password-container')
  // })
  //edit info 

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var editInfoBtn = $.querySelectorAll('#editInfobtn');
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  var _loop = function _loop() {
    var btn = _step2.value;
    btn.addEventListener('click', function () {
      btn.textContent = 'Save Changes';
      var infoInputContainer = $.querySelectorAll('.info');
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = infoInputContainer[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var infoInputbox = _step5.value;
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = infoInputbox.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var inputs = _step6.value;
              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = inputs.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var input = _step7.value;

                  if (input.hasAttribute('disabled')) {
                    input.removeAttribute('disabled');
                    input.classList.add('editing');
                  } else if (!input.hasAttribute('disabled')) {}
                }
              } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                    _iterator7["return"]();
                  }
                } finally {
                  if (_didIteratorError7) {
                    throw _iteratorError7;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    });
  };

  for (var _iterator2 = editInfoBtn[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    _loop();
  } // view student info
  // const studentList = $.querySelector('.student-list');
  // const studentCards = studentList.children;
  // for (const card of studentCards) {
  //     if (card.classList.contains('student-card')) {
  //         card.addEventListener('click', () => {
  //             $.querySelector('.studentContainerContent').classList.add('show_create_cousre');
  //             $.querySelector('.student-list').classList.add('collapse_create_cousre');
  //             $.querySelector('.BackButton').addEventListener('click', () => {
  //                 $.querySelector('.studentContainerContent').classList.remove('show_create_cousre');
  //                 $.querySelector('.student-list').classList.remove('collapse_create_cousre');
  //             })
  //         })
  //     }
  // }
  // const summaryData = $.querySelector('.summary-data');
  // for (const tr of summaryData.children) {
  //     tr.addEventListener('mouseover', (e) => {
  //         $.querySelector('.explore-studentmore-details').classList.toggle('card-hover-tr')
  //     })
  // }
  // dashboard-menu li

} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var dashboardMenu = $.querySelector('.dashboard-menu'); // for (const listTab of dashboardMenu.children) {
//     listTab.addEventListener('click', () => {
//     const dashboardSection = $.querySelector('.dashboard-section');
//     for (const dashboard of dashboardSections) {
//     }
//     console.log(dashboardSection)
//     // dashboardSection.innerHTML = ''
//     })
// }
// upload-lesson 

var uploadLessonBtn = $.querySelector('.card-upload-lesson');
uploadLessonBtn.addEventListener('click', function () {
  $.querySelector('.uploadLessonsContainer').classList.add('show_create_cousre');
  $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre');
  var createCourseContainer = $.querySelector('.createCourseContainer');

  if (createCourseContainer.classList.contains('show_create_cousre')) {
    createCourseContainer.classList.remove('show_create_cousre');
    createCourseContainer.classList.add('collapse_create_cousre');
  }

  $.querySelector('.back-lessons-btn').addEventListener('click', function () {
    var uploadLessonsContainer = $.querySelector('.uploadLessonsContainer');

    if (uploadLessonsContainer.classList.contains('show_create_cousre')) {
      createCourseContainer.classList.add('show_create_cousre');
      uploadLessonsContainer.classList.remove('show_create_cousre');
    } else {}
  });
}); // create course number inputs & ......

var createCourse =
/*#__PURE__*/
function () {
  function createCourse() {
    var _this = this;

    _classCallCheck(this, createCourse);

    that.classInput = $.querySelector('.class-input-name');
    that.ClassNameInputArray = $.querySelector('#classNameInputsArray');
    that.subjectInput = $.querySelector('.subject-name-input');
    that.subjectInputArray = $.querySelector('#subjectNameInputsArray');
    that.topicInput = $.querySelector('.topic-name-input');
    that.topicInputArray = $.querySelector('#topicsArray');
    that.lessonInput = $.querySelector('.lesson-input');
    that.lessonInputArray = $.querySelector('#lessonsInputsArray');
    that.courseSelectInput = $.querySelector('.course-select-input');
    that.subjectBox = $.querySelector('.subject-box'); // initialize Event

    that.courseSelectInput.addEventListener('input', function () {
      return _this.getSelectedCourse();
    });
  }

  _createClass(createCourse, [{
    key: "createClassNumber",
    value: function createClassNumber() {
      // User class Number Input
      function getNumber() {
        classInput.addEventListener('input', function (e) {
          var enteredValue = Number(e.target.value);

          if (enteredValue !== Number(enteredValue)) {
            ClassNameInputArray.replaceChildren('');
            classInput.value = '';
            classInput.setAttribute('placeholder', 'Please enter number');
            classInput.classList.add('error');
          } else if (enteredValue > 15) {
            ClassNameInputArray.replaceChildren('');
            classInput.value = '';
            classInput.setAttribute('placeholder', 'Classes must be 15 or less');
            classInput.classList.add('error');
          } else {
            if (enteredValue > 0 && enteredValue > !15) {
              for (var classNumber = 0; classNumber < enteredValue; classNumber++) {
                // create class name input element
                var classNameInputElement = $.createElement('input');
                classNameInputElement.classList.add('form-control');
                classNameInputElement.setAttribute('placeholder', "Class name ".concat(classNumber));
                ClassNameInputArray.appendChild(classNameInputElement);
              }
            } else if (enteredValue == '') {
              ClassNameInputArray.replaceChildren('');
            }
          }
        });
      }

      getNumber();
    } // create subject

  }, {
    key: "createSubjectNumber",
    value: function createSubjectNumber() {
      // User class Number Input
      function getNumber() {
        subjectInput.addEventListener('input', function (e) {
          var enteredValue = Number(e.target.value);

          if (enteredValue !== Number(enteredValue)) {
            subjectInputArray.replaceChildren('');
            subjectInput.value = '';
            subjectInput.setAttribute('placeholder', 'Numbers only');
            subjectInput.classList.add('error');
          } else if (enteredValue > 20) {
            subjectInputArray.replaceChildren('');
            subjectInput.value = '';
            subjectInput.setAttribute('placeholder', 'Subjects must be 20 or less');
            subjectInput.classList.add('error');
          } else {
            if (enteredValue > 0 && enteredValue > !20) {
              for (var classNumber = 0; classNumber < enteredValue; classNumber++) {
                // create class name input element
                var subjectInputElement = $.createElement('input');
                subjectInputElement.classList.add('form-control');
                subjectInputElement.setAttribute('placeholder', "subject name ".concat(classNumber));
                subjectInputArray.appendChild(subjectInputElement);
              }
            } else if (enteredValue == '') {
              subjectInputArray.replaceChildren('');
            }
          }
        });
      }

      getNumber();
    } // create topics

  }, {
    key: "createTopicNumber",
    value: function createTopicNumber() {
      // User class Number Input
      function getNumber() {
        topicInput.addEventListener('input', function (e) {
          var enteredValue = Number(e.target.value);

          if (enteredValue !== Number(enteredValue)) {
            topicInputArray.replaceChildren('');
            topicInput.value = '';
            topicInput.setAttribute('placeholder', 'Numbers only');
            topicInput.classList.add('error');
          } else if (enteredValue > 20) {
            topicInputArray.replaceChildren('');
            topicInput.value = '';
            topicInput.setAttribute('placeholder', 'Topics must be 100 or less');
            topicInput.classList.add('error');
          } else {
            if (enteredValue > 0 && enteredValue > !20) {
              for (var topicNumber = 0; topicNumber < enteredValue; topicNumber++) {
                var topicInputElement = $.createElement('input');
                topicInputElement.classList.add('form-control');
                topicInputElement.setAttribute('placeholder', "Topic name ".concat(topicNumber));
                topicInputArray.appendChild(topicInputElement);
              }
            } else if (enteredValue == '') {
              topicInputArray.replaceChildren('');
            }
          }
        });
      }

      getNumber();
    } // create lessons

  }, {
    key: "createLessonsNumber",
    value: function createLessonsNumber() {
      // User class Number Input
      function getNumber() {
        lessonInput.addEventListener('input', function (e) {
          var enteredValue = Number(e.target.value);

          if (enteredValue !== Number(enteredValue)) {
            lessonInputArray.replaceChildren('');
            lessonInput.value = '';
            lessonInput.setAttribute('placeholder', 'Numbers only');
            lessonInput.classList.add('error');
          } else if (enteredValue > 200) {
            lessonInputArray.replaceChildren('');
            lessonInput.value = '';
            lessonInput.setAttribute('placeholder', 'Lessons must be 200 or less');
            lessonInput.classList.add('error');
          } else {
            if (enteredValue > 0 && enteredValue > !200) {
              for (var lessonNumber = 0; lessonNumber < enteredValue; lessonNumber++) {
                var _lessonInputElement = $.createElement('input');

                _lessonInputElement.classList.add('form-control');

                _lessonInputElement.setAttribute('placeholder', "Lesson Title ".concat(lessonNumber));

                lessonInputArray.appendChild(_lessonInputElement);
              }
            } else if (enteredValue == '') {
              lessonInputArray.replaceChildren('');
            }
          }
        });
      }

      getNumber();
    } // get subjects

  }, {
    key: "getAllRequiredSubjects",
    value: function getAllRequiredSubjects() {} // COURSE SELECTION

  }, {
    key: "getSelectedCourse",
    value: function getSelectedCourse() {
      var selectedCourse = courseSelectInput.value;

      switch (selectedCourse) {
        case 'Yasaruna':
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = subjectBox.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var element = _step3.value;
              var subjectBoxHeader = element.children;
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = subjectBoxHeader[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var headerText = _step4.value;
                  console.log(headerText.firstElementChild);

                  if (headerText === 'Subject Details') {// subjectBoxHeader[0].textContent = 'Course Levels'
                  }
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          break;

        default:
          console.log('Not working');
          break;
      }
    }
  }]);

  return createCourse;
}();

var createdCourse = new createCourse();
createdCourse.createClassNumber();
createdCourse.createSubjectNumber();
createdCourse.createTopicNumber();
createdCourse.createLessonsNumber(); // EDIT LESSON TITLE

var EditLessonTitle =
/*#__PURE__*/
function () {
  function EditLessonTitle() {
    var _this2 = this;

    _classCallCheck(this, EditLessonTitle);

    that.lessonInputElement = $.querySelector('#titleInput');
    that.editLessonBtn = $.querySelector('#editLessonTitleBtn'); // that.statusMessageBox = $.querySelector('#statusMessage');

    that.isEditing = true; // Initialize event listeners

    that.editLessonBtn.addEventListener('click', function () {
      return _this2.toggleEditSave();
    });
  }

  _createClass(EditLessonTitle, [{
    key: "toggleEditSave",
    value: function toggleEditSave() {
      try {
        if (isEditing) {
          this.enableEditting();
        } else {
          this.saveTitle();
          console.log('Saved');
        }
      } catch (error) {// this.displayMessage(`Error: ${error.message}, error`);
      }
    } // Enable the input field for Editting

  }, {
    key: "enableEditting",
    value: function enableEditting() {
      // Check if user can edit
      if (lessonInputElement.hasAttribute('readonly')) {
        lessonInputElement.removeAttribute('readonly');
        lessonInputElement.focus();
        lessonInputElement.classList.add('editting-title'); // Change button text and icon to save or done

        that.editLessonBtn.innerHTML = "\n            <i class=\"fa fa-save icons text-info\"></i>\n             <span style=\"font-size: x-small;\" class=\"text-warning\">Done</span>\n            "; // Disable Editting

        this.isEditting = true; // Default changes or Save the changes
      } else {
        // Validation (Input not empty)
        var titleValue = lessonInputElement.value.trim();

        if (titleValue == '') {
          lessonInputElement.setAttribute('placeholder', 'Title cannot be empty.....');
          lessonInputElement.classList.add('error-editting'); // Save changes
        } else {
          lessonInputElement.setAttribute('placeholder', 'Title For this Lesson');
          lessonInputElement.classList.remove('error-editting');
          this.saveTitle();
        }
      }
    }
  }, {
    key: "saveTitle",
    value: function saveTitle() {
      // Apply changes: make the input non-editable
      lessonInputElement.setAttribute('readonly', '');
      lessonInputElement.classList.remove('editting-title'); // Change button text and icon back to Edit

      that.editLessonBtn.innerHTML = "\n       <i class=\"fa fa-pencil-square icons\"></i>\n       <span style=\"font-size: x-small;\">Edit</span>\n       "; // Disable Editting    

      this.isEditting = false; // this.displayMessage('Your changes have been saved.', 'success');
    }
  }]);

  return EditLessonTitle;
}(); // Initialize the CLASS


var editLesson = new EditLessonTitle(); // DELETE LESSON 

var DeleteLesson =
/*#__PURE__*/
function () {
  function DeleteLesson() {
    var _this3 = this;

    _classCallCheck(this, DeleteLesson);

    that.selecteLessonBtn = $.querySelector('#selectLesson');
    that.deleteCheckBoxBtn = $.querySelector('.delete-lesson-btn');
    that.checkbox = $.querySelector('.delete-check-box');
    that.deletebtn = $.querySelector('.delete-Btn');
    that.warning_msg = $.querySelector('.warning-msg-container');
    that.cancelDeleteBtn = $.querySelector('#cancelDeleteBtn'); // Initialize event listeners

    that.selecteLessonBtn.addEventListener('click', function () {
      return _this3.onSelected();
    });
    that.cancelDeleteBtn.addEventListener('click', function () {
      return _this3.cancelDeletion();
    });
  } // Seleted btn


  _createClass(DeleteLesson, [{
    key: "onSelected",
    value: function onSelected() {
      // Display the delete check box button
      deleteCheckBoxBtn.style.display = 'flex'; // Change select content to cancel

      that.selecteLessonBtn.innerHTML = "\n        <span>Cancel</span>\n        <i class=\"fa fa-times text-warning\" aria-hidden=\"true\"></i>\n         ";
      that.selecteLessonBtn.style.background = '#004631'; //  get the delete checkBox active

      checkbox.addEventListener('click', function (e) {
        if (checkbox.checked === true) {
          deletebtn.style.display = 'unset !important';
          deletebtn.addEventListener('click', function () {
            warning_msg.classList.add('display-Warning');
            warning_msg.classList.remove('collapse');
          });
        } else {}
      });
    }
  }, {
    key: "cancelDeletion",
    value: function cancelDeletion() {
      warning_msg.classList.remove('display-Warning');
      warning_msg.classList.add('collapse');
    }
  }]);

  return DeleteLesson;
}();

var deleteLesson = new DeleteLesson();