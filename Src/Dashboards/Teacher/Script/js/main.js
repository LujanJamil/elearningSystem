const $ = document;
window.onscroll = ()=>{ 
    let headerSection = document.querySelector('.teacher-quick-actions-wrapper');
    if(window.scrollY > 0){
        headerSection.classList.add('sticky');
    }else{
        headerSection.classList.remove('sticky');
    }
}

window.onscroll = ()=>{ 
    let headerSection = document.getElementById('chat-room-header');
    if(window.scrollY > 0){
        headerSection.classList.add('stacked');
    }else{
        headerSection.classList.remove('stacked');
    }
}

const chooseStudent = (() => {
    const chatList = $.querySelectorAll('.chat-list')
    chatList.forEach(chat => {
        chat.addEventListener('click',() => {
            $.querySelector('#contentId').classList.toggle('collapse')
        })
    })
})

chooseStudent()

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

  const changeProfileImageBtn = $.querySelector('.edit-btn');
  const profileInput = $.querySelector('.user-img');
  
const btn = $.querySelector('.manage-account-settings');

let SaveChangesBtn = $.querySelectorAll('.save-btn');
let cardWrap = $.querySelectorAll('.card-wrap');

const Allinputs = $.querySelectorAll('.form-control');
const checkChanges = (() => {
    Allinputs.forEach(input => {
        input.addEventListener('keydown', () => {
            SaveChangesBtn.forEach(btn => {
                    btn.classList.add('wait-changes')
            })
            })
    })
    SaveChangesBtn.forEach(btn => {
        btn.addEventListener('click', ()=> {
            btn.classList.remove('wait-changes')
        })
})
   
})
const cardWrappers = (() => {
    Allinputs.forEach(input => {
        input.addEventListener('keydown', () => {
            SaveChangesBtn.forEach(btn => {
                    btn.classList.add('wait-changes')
            })
            })
    })
    SaveChangesBtn.forEach(btn => {
        btn.addEventListener('click', ()=> {
            btn.classList.remove('wait-changes')
        })
})
   
})
checkChanges()

const checklang = (() => {
    let allRadioBtn = $.querySelectorAll('.form-check-input');
    allRadioBtn.forEach(radioBtn => {
        radioBtn.addEventListener("click", (() => {
            if (true) {
                $.querySelector('.save-lang').classList.remove('btn-secondary')
                $.querySelector('.save-lang').classList.add('btn-primary');
                $.querySelector('.save-lang').addEventListener('click', (()=> {
                $.querySelector('.lang-container').classList.toggle('collapse');
                    // lang-container
                }))
            } else {
                console.log('false')
            }
           
        }))
    })
  
})

checklang()