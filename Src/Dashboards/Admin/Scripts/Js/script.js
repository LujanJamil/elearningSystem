
// Global VARIABLES
const $ = document;
const that = this;
// TOGGLE FULL SCRREN FOR THE ENTIRE WINDOW

const toggleFullScreen = () => {
    // Already in full screen mode
    if (!$.fullscreenElement) {
        // Get the document in full screen
        $.documentElement.requestFullscreen().catch(error => {
            console.log(`Error requesting full screen mode:,${error}`)
            // Exit Mode
            $.exitFullscreen().catch(error => {
                console.log(`Error requesting full screen mode:,${error}`)
            })
        })
    }

}


// LISTENER ON THE MODE BUTTON WHEN CLICKED

$.addEventListener('DOMContentLoaded', () => {
    const ModeBtn = $.querySelector('#ViewFullScreen');
    ModeBtn.addEventListener('click', toggleFullScreen)
})

// calender

const DaysContainer = $.querySelector('.days-container');
const monthName = $.querySelector('.month-name');
const prevBtn = $.querySelector('.prev-btn');
const nextBtn = $.querySelector('.next-btn');

// current Date 
let currentDate = new Date();

// render the Calender

const renderCalender = () => {
    // clear defaults 
    DaysContainer.innerHTML = '';
    // first day of the month
    const firstDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    // last day of the month
    const lastDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), + 1, 0);
    // first day week 
    const firstDayWeek = firstDayMonth.getDay();
    // render days 
    const dayBox = $.createElement('div');
    for (let i = 0; i < firstDayWeek; i++) {
        dayBox.classList.add('day', 'empty');
        DaysContainer.appendChild(dayBox);
    }
    // render days
    for (let i = 1; i <= lastDayMonth.getDate(); i++) {
        const dayElement = $.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i
        // check today
        if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date.getFullYear()) {
            dayBox.classList.add('active', 'today');
        }
        DaysContainer.appendChild(dayBox)
    }

}

const updateMonth = () => {
    monthName.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
}

// events

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
const closeSidebarNav = $.querySelector('#closeSidebarNav');
const asideBarMenu = $.querySelector('aside');
const mainBar = $.querySelector('main');
const cardBox = $.querySelectorAll('.card-box');


closeSidebarNav.addEventListener('click', (e) => {
    e.preventDefault()
    asideBarMenu.classList.toggle('shrinkAside')
    mainBar.classList.toggle('expand-main')
    cardBox.forEach(card => {
        card.classList.toggle('card-box-resize')
    })
})


// event on card in course management

const quickChoices = $.querySelector('.quick-choices');
const cards = quickChoices.children;

for (const card of cards) {
    if (card.classList.contains('create_course')) {
        card.addEventListener('click', () => {
            $.querySelector('.createCourseContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.back-button').addEventListener('click', () => {
                let createCourseContainer = $.querySelector('.createCourseContainer')
                if (createCourseContainer.classList.contains('show_create_cousre')) {
                    $.querySelector('.createCourseContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')

                }
            })
        })

    } else if (card.classList.contains('manage_courses')) {
        card.addEventListener('click', () => {
            $.querySelector('.manageCourseContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('#backButton').addEventListener('click', () => {
                let manageCourseContainer = $.querySelector('.manageCourseContainer')
                if (manageCourseContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.manageCourseContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')

                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('delete_courses')) {
        card.addEventListener('click', () => {
            $.querySelector('.DeleteCourseContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('#backBtn').addEventListener('click', () => {
                let DeleteCourseContainer = $.querySelector('.DeleteCourseContainer')
                if (DeleteCourseContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.DeleteCourseContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                    // view_students-progress
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('manage_students')) {
        card.addEventListener('click', () => {
            $.querySelector('.ManageStudentContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.backButton').addEventListener('click', () => {
                let ManageStudentContainer = $.querySelector('.ManageStudentContainer')
                if (ManageStudentContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.ManageStudentContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('all_students')) {
        // AddStudentContainer
        card.addEventListener('click', () => {
            $.querySelector('.AllStudentContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.back').addEventListener('click', () => {
                let AllStudentContainer = $.querySelector('.AllStudentContainer')
                if (AllStudentContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.AllStudentContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('add_student')) {
        card.addEventListener('click', () => {
            $.querySelector('.AddStudentContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.ButtonBack').addEventListener('click', () => {
                let AddStudentContainer = $.querySelector('.AddStudentContainer')
                if (AddStudentContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.AddStudentContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('explore_students')) {
        card.addEventListener('click', () => {
            $.querySelector('.ExploreStudentContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.Back-BTN').addEventListener('click', () => {
                let ExploreStudentContainer = $.querySelector('.ExploreStudentContainer')
                if (ExploreStudentContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.ExploreStudentContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('manage_teachers')) {
        card.addEventListener('click', () => {
            $.querySelector('.ManageTeachersContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.backteacherbtn').addEventListener('click', () => {
                let ManageTeachersContainer = $.querySelector('.ManageTeachersContainer')
                if (ManageTeachersContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.ManageTeachersContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('add_teacher')) {
        card.addEventListener('click', () => {
            $.querySelector('.AddTeacherContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('#backBtn').addEventListener('click', () => {
                let AddTeacherContainer = $.querySelector('.AddTeacherContainer')
                if (AddTeacherContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.AddTeacherContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('student_attendance')) {
        card.addEventListener('click', () => {
            $.querySelector('.TeachersAttendanceContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('.backattendacebtn').addEventListener('click', () => {
                let TeachersAttendanceContainer = $.querySelector('.TeachersAttendanceContainer')
                if (TeachersAttendanceContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.TeachersAttendanceContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    } else if (card.classList.contains('teacher_attendance')) {
        card.addEventListener('click', () => {
            $.querySelector('.studentsAttendanceContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            $.querySelector('#backattendace').addEventListener('click', () => {
                let studentsAttendanceContainer = $.querySelector('.studentsAttendanceContainer')
                if (studentsAttendanceContainer.classList.contains('show_create_cousre')) {
                    console.log(true)
                    $.querySelector('.studentsAttendanceContainer').classList.remove('show_create_cousre')
                    $.querySelector('.block-page-info-choices').classList.remove('collapse_create_cousre')
                } else {
                    console.log(false)
                }
            })
        })
    }
}

// DeleteCourseContainer

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
const editInfoBtn = $.querySelectorAll('#editInfobtn');
for (const btn of editInfoBtn) {
    btn.addEventListener('click', () => {
        btn.textContent = 'Save Changes'
        const infoInputContainer = $.querySelectorAll('.info');
        for (const infoInputbox of infoInputContainer) {
            for (const inputs of infoInputbox.children) {
                for (const input of inputs.children) {
                    if (input.hasAttribute('disabled')) {
                        input.removeAttribute('disabled');
                        input.classList.add('editing')
                    } else if (!input.hasAttribute('disabled')) {
                    }
                }
            }
        }
    })

}


// view student info

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
const dashboardMenu = $.querySelector('.dashboard-menu');

// for (const listTab of dashboardMenu.children) {
//     listTab.addEventListener('click', () => {
//     const dashboardSection = $.querySelector('.dashboard-section');
//     for (const dashboard of dashboardSections) {

//     }
//     console.log(dashboardSection)
//     // dashboardSection.innerHTML = ''

//     })
// }


// upload-lesson 
    const uploadLessonBtn = $.querySelector('.card-upload-lesson');
        uploadLessonBtn.addEventListener('click', () => {
            $.querySelector('.uploadLessonsContainer').classList.add('show_create_cousre')
            $.querySelector('.block-page-info-choices').classList.add('collapse_create_cousre')
            let createCourseContainer = $.querySelector('.createCourseContainer');
            if(createCourseContainer.classList.contains('show_create_cousre')) {
                createCourseContainer.classList.remove('show_create_cousre')
                createCourseContainer.classList.add('collapse_create_cousre')
            } 
            $.querySelector('.back-lessons-btn').addEventListener('click', () => {
                let uploadLessonsContainer = $.querySelector('.uploadLessonsContainer')
                if (uploadLessonsContainer.classList.contains('show_create_cousre')) {
                    createCourseContainer.classList.add('show_create_cousre')
                    uploadLessonsContainer.classList.remove('show_create_cousre')
                    
                } else {
                    
                }
            })
        })

// create course number inputs & ......

class createCourse {
    constructor() {
        that.classInput =  $.querySelector('.class-input-name')
        that.ClassNameInputArray =  $.querySelector('#classNameInputsArray')
        that.subjectInput =  $.querySelector('.subject-name-input')
        that.subjectInputArray =  $.querySelector('#subjectNameInputsArray')
        that.topicInput =  $.querySelector('.topic-name-input')
        that.topicInputArray =  $.querySelector('#topicsArray')
        that.lessonInput =  $.querySelector('.lesson-input')
        that.lessonInputArray =  $.querySelector('#lessonsInputsArray')
        that.courseSelectInput = $.querySelector('.course-select-input')
        that.subjectBox = $.querySelector('.subject-box')

        // initialize Event
        that.courseSelectInput.addEventListener('input', () => this.getSelectedCourse());
    }
    createClassNumber() {
        // User class Number Input
        function getNumber() {
            classInput.addEventListener('input', (e) => {
                const enteredValue = Number(e.target.value); 
                if(enteredValue !== Number(enteredValue)) {
                    ClassNameInputArray.replaceChildren('');
                    classInput.value = '';
                    classInput.setAttribute('placeholder', 'Please enter number')
                    classInput.classList.add('error')
                } else if(enteredValue > 15){
                    ClassNameInputArray.replaceChildren('');
                    classInput.value = '';
                    classInput.setAttribute('placeholder', 'Classes must be 15 or less')
                    classInput.classList.add('error')
                } else {
                    if (enteredValue > 0 && enteredValue >! 15) {
                        for (let classNumber = 0; classNumber < enteredValue; classNumber++) {
                          // create class name input element
                             let classNameInputElement = $.createElement('input');
                             classNameInputElement.classList.add('form-control');
                             classNameInputElement.setAttribute('placeholder', `Class name ${classNumber}`)
                             ClassNameInputArray.appendChild(classNameInputElement);  
                        }
                      } else if(enteredValue == '') {
                        ClassNameInputArray.replaceChildren('')
                      }
                }
            })
        }
        getNumber()
    }

    // create subject
    createSubjectNumber() {
        // User class Number Input
        function getNumber() {
            subjectInput.addEventListener('input', (e) => {
                const enteredValue = Number(e.target.value); 
                if(enteredValue !== Number(enteredValue)) {
                    subjectInputArray.replaceChildren('');
                    subjectInput.value = '';
                    subjectInput.setAttribute('placeholder', 'Numbers only')
                    subjectInput.classList.add('error')
                } else if(enteredValue > 20){
                    subjectInputArray.replaceChildren('');
                    subjectInput.value = '';
                    subjectInput.setAttribute('placeholder', 'Subjects must be 20 or less')
                    subjectInput.classList.add('error')
                } else {
                    if (enteredValue > 0 && enteredValue >! 20) {
                        for (let classNumber = 0; classNumber < enteredValue; classNumber++) {
                          // create class name input element
                             let subjectInputElement = $.createElement('input');
                             subjectInputElement.classList.add('form-control');
                             subjectInputElement.setAttribute('placeholder', `subject name ${classNumber}`)
                             subjectInputArray.appendChild(subjectInputElement);  
                        }
                      } else if(enteredValue == '') {
                        subjectInputArray.replaceChildren('')
                      }
                }
            })
        }
        getNumber()
    }

     // create topics
     createTopicNumber() {
        // User class Number Input
        function getNumber() {
            topicInput.addEventListener('input', (e) => {
                const enteredValue = Number(e.target.value); 
                if(enteredValue !== Number(enteredValue)) {
                    topicInputArray.replaceChildren('');
                    topicInput.value = '';
                    topicInput.setAttribute('placeholder', 'Numbers only')
                    topicInput.classList.add('error')
                } else if(enteredValue > 20){
                    topicInputArray.replaceChildren('');
                    topicInput.value = '';
                    topicInput.setAttribute('placeholder', 'Topics must be 100 or less')
                    topicInput.classList.add('error')
                } else {
                    if (enteredValue > 0 && enteredValue >! 20) {
                        for (let topicNumber = 0; topicNumber < enteredValue; topicNumber++) {
                             let topicInputElement = $.createElement('input');
                             topicInputElement.classList.add('form-control');
                             topicInputElement.setAttribute('placeholder', `Topic name ${topicNumber}`)
                             topicInputArray.appendChild(topicInputElement);  
                        }
                      } else if(enteredValue == '') {
                        topicInputArray.replaceChildren('')
                      }
                }
            })
        }
        getNumber()
    }

      // create lessons
      createLessonsNumber() {
        // User class Number Input
        function getNumber() {
            lessonInput.addEventListener('input', (e) => {
                const enteredValue = Number(e.target.value); 
                if(enteredValue !== Number(enteredValue)) {
                    lessonInputArray.replaceChildren('');
                    lessonInput.value = '';
                    lessonInput.setAttribute('placeholder', 'Numbers only')
                    lessonInput.classList.add('error')
                } else if(enteredValue > 200){
                    lessonInputArray.replaceChildren('');
                    lessonInput.value = '';
                    lessonInput.setAttribute('placeholder', 'Lessons must be 200 or less')
                    lessonInput.classList.add('error')
                } else {
                    if (enteredValue > 0 && enteredValue >! 200) {
                        for (let lessonNumber = 0; lessonNumber < enteredValue; lessonNumber++) {
                             let lessonInputElement = $.createElement('input');
                             lessonInputElement.classList.add('form-control');
                             lessonInputElement.setAttribute('placeholder', `Lesson Title ${lessonNumber}`)
                             lessonInputArray.appendChild(lessonInputElement);  
                        }
                      } else if(enteredValue == '') {
                        lessonInputArray.replaceChildren('')
                      }
                }
            })
        }
        getNumber()
    }

    // get subjects
    getAllRequiredSubjects() {

    }

    // COURSE SELECTION
    getSelectedCourse() {
        const selectedCourse = courseSelectInput.value
        switch (selectedCourse) {
            case 'Yasaruna':
                for (const element of subjectBox.children) {
                    let subjectBoxHeader = element.children
                        for (const headerText of subjectBoxHeader) {
                            console.log(headerText.firstElementChild)
                            if (headerText === 'Subject Details') {
                                // subjectBoxHeader[0].textContent = 'Course Levels'
                        }          
                    }
                }
                break;
        
            default:
                console.log('Not working')
                break;
        }
    }
}

const createdCourse = new createCourse();

createdCourse.createClassNumber();
createdCourse.createSubjectNumber();
createdCourse.createTopicNumber();
createdCourse.createLessonsNumber();




// EDIT LESSON TITLE
class EditLessonTitle {
    constructor() {
        that.lessonInputElement = $.querySelector('#titleInput');
        that.editLessonBtn = $.querySelector('#editLessonTitleBtn');
        // that.statusMessageBox = $.querySelector('#statusMessage');
        that.isEditing = true;

        // Initialize event listeners
        that.editLessonBtn.addEventListener('click',() => this.toggleEditSave())
    }

    toggleEditSave() {
        try {
            if(isEditing) {
                this.enableEditting()
            } else {
                this.saveTitle()
                console.log('Saved')
            }
        } catch (error) {
            // this.displayMessage(`Error: ${error.message}, error`);
        }
    }

    // Enable the input field for Editting
    enableEditting () {

        // Check if user can edit
        if (lessonInputElement.hasAttribute('readonly')) {
            lessonInputElement.removeAttribute('readonly');
            lessonInputElement.focus();
            lessonInputElement.classList.add('editting-title');

            // Change button text and icon to save or done
            that.editLessonBtn.innerHTML =
             `
            <i class="fa fa-save icons text-info"></i>
             <span style="font-size: x-small;" class="text-warning">Done</span>
            ` ;

            // Disable Editting
            this.isEditting = true;
            
            // Default changes or Save the changes
        } else {

              // Validation (Input not empty)
            const titleValue = lessonInputElement.value.trim();
            if(titleValue == '') {
                lessonInputElement.setAttribute('placeholder', 'Title cannot be empty.....')
                lessonInputElement.classList.add('error-editting');

                // Save changes
            } else {
                lessonInputElement.setAttribute('placeholder', 'Title For this Lesson')
                lessonInputElement.classList.remove('error-editting');
                this.saveTitle()
            }
        }
    }

    saveTitle() {

        // Apply changes: make the input non-editable
        lessonInputElement.setAttribute('readonly', '');
        lessonInputElement.classList.remove('editting-title');

        // Change button text and icon back to Edit
        that.editLessonBtn.innerHTML =
        `
       <i class="fa fa-pencil-square icons"></i>
       <span style="font-size: x-small;">Edit</span>
       ` ;
        
        // Disable Editting    
        this.isEditting = false;
       // this.displayMessage('Your changes have been saved.', 'success');
       
    }
}

// Initialize the CLASS
const editLesson = new EditLessonTitle();


// DELETE LESSON 

class DeleteLesson {
    constructor() {
        that.selecteLessonBtn = $.querySelector('#selectLesson');
        that.deleteCheckBoxBtn = $.querySelector('.delete-lesson-btn');
        that.checkbox =  $.querySelector('.delete-check-box');
        that.deletebtn =  $.querySelector('.delete-Btn');
        that.warning_msg =  $.querySelector('.warning-msg-container');
        that.cancelDeleteBtn =  $.querySelector('#cancelDeleteBtn');
        
        // Initialize event listeners
        that.selecteLessonBtn.addEventListener('click', () => this.onSelected());
        that.cancelDeleteBtn.addEventListener('click', () => this.cancelDeletion());
    }

    // Seleted btn
    onSelected() {

        // Display the delete check box button
        deleteCheckBoxBtn.style.display = 'flex'

        // Change select content to cancel
        that.selecteLessonBtn.innerHTML = 
        `
        <span>Cancel</span>
        <i class="fa fa-times text-warning" aria-hidden="true"></i>
         `;
         that.selecteLessonBtn.style.background = '#004631'

        //  get the delete checkBox active
         checkbox.addEventListener('click', (e) => {
            if(checkbox.checked === true) {
                deletebtn.style.display = 'unset !important'
                deletebtn.addEventListener('click', () => {
                    warning_msg.classList.add('display-Warning');
                    warning_msg.classList.remove('collapse')
                })
            } else {

            }
         })
    }

    cancelDeletion() {
       warning_msg.classList.remove('display-Warning');
        warning_msg.classList.add('collapse')
    }

}

const deleteLesson = new DeleteLesson();




































