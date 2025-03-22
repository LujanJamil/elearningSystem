// GO TO THE CERTIFICATE PAGE
// const loadCertificatePage = (() => {
  // // XHR OBJECT
  // const xhr = new XMLHttpRequest();
  // xhr.onload = (() => {
  //   if (xhr.status == 200) {

//   })
//   // OPEN
//   xhr.open('GET', './certificates.html', true);
//   // sending Request
//   xhr.send()
// })

// $('#certificate-btn-direct').click(() => {
//   loadCertificatePage()
// })



const textareaInput = (() => {
  const inputBox = document.querySelector('.message-input')
  inputBox.addEventListener('input', () => {
    if (inputBox.value !== '') {
      document.querySelector('.input-hide-btn').classList.add('toggle-styles')
      document.querySelector('.send-text-btn').classList.add('show-send-btn')
    } else {
      document.querySelector('.input-hide-btn').classList.remove('toggle-styles')
      document.querySelector('.send-text-btn').classList.remove('show-send-btn')
    }
  })
})

textareaInput();