"use strict";

document.addEventListener('scroll', function () {});

window.onscroll = function () {
  if (window.scrollY > 0) {
    document.querySelector('.lesson-name').classList.add('min-height'); // document.querySelector('.lesson-action-wrapper').classList.add('min-height')
    // document.querySelector('#video-player-container').style.position = 'fixed';
  } else {
    document.querySelector('.lesson-name').classList.remove('min-height'); // document.querySelector('.lesson-action-wrapper').classList.remove('min-height')
    // document.querySelector('#video-player-container').style.position = 'unset';
  }
};

var lessonList = document.querySelector('.lesson-list');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = lessonList.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var lesson = _step.value;
    lesson.addEventListener('click', function () {
      document.querySelector('#video-player-container').style.display = 'flex';
      document.querySelector('.lesson-name').classList.remove('min-height');
    });
  }
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

document.querySelector('.back-btn').addEventListener('click', function () {
  document.querySelector('#video-player-container').style.display = 'unset';
});