document.addEventListener('scroll',() => {
})

window.onscroll = ()=>{ 
    if(window.scrollY > 0){
        document.querySelector('.lesson-name').classList.add('min-height')
        // document.querySelector('.lesson-action-wrapper').classList.add('min-height')
        // document.querySelector('#video-player-container').style.position = 'fixed';
    }else{
        document.querySelector('.lesson-name').classList.remove('min-height')
        // document.querySelector('.lesson-action-wrapper').classList.remove('min-height')
        // document.querySelector('#video-player-container').style.position = 'unset';
    }
}


const lessonList = document.querySelector('.lesson-list');

for(const lesson of lessonList.children) {
    lesson.addEventListener('click', () => {
        document.querySelector('#video-player-container').style.display = 'flex';
        document.querySelector('.lesson-name').classList.remove('min-height')
    })
}

document.querySelector('.back-btn').addEventListener('click', () => {
    document.querySelector('#video-player-container').style.display = 'unset';
    
})