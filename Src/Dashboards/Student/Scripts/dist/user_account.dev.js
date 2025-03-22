"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var changeProfileImage =
/*#__PURE__*/
function () {
  function changeProfileImage(_Image_input_btn, _Image_holder) {
    var _this = this;

    _classCallCheck(this, changeProfileImage);

    this._Image_input_btn = document.getElementById("ChangeprofileBtn"); // Upload File

    this._Image_input_btn.addEventListener("click", function () {
      return _this.UploadProfile();
    });
  }

  _createClass(changeProfileImage, [{
    key: "UploadProfile",
    value: function UploadProfile() {}
  }]);

  return changeProfileImage;
}();

new changeProfileImage();