class changeProfileImage {
    constructor(_Image_input_btn, _Image_holder) {
        this._Image_input_btn = document.getElementById("ChangeprofileBtn");

        // Upload File
        this._Image_input_btn.addEventListener("click", () => this.UploadProfile())
    }

    UploadProfile() {
        
    }
}

new changeProfileImage()