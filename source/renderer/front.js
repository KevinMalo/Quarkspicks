import url from 'url'
import path from 'path'
import applyFilter from './filters'
import { setIpc, openDirectory } from './ipcRendererEvents'

window.addEventListener('load', () => {
   
    setIpc()
    addImagesEvents()
    searchImagesEvent()
    selectEvent()
    buttonEvent('open-directory', openDirectory)

})

function buttonEvent (id, func) {
    const openDirectory = document.getElementById(id)
    openDirectory.addEventListener('click', func)
}

function addImagesEvents () {
    const thumbs = document.querySelectorAll('li.list-group-item')

    for (let index = 0; index < thumbs.length; index++) {
        
        thumbs[index].addEventListener('click', 
        
        function () {
            changeImage(this)
        })
    }
}

function selectEvent() {
    const select = document.getElementById('filters')
    select.addEventListener('change', function(){
        applyFilter(this.value, document.getElementById('image-displayed'))
    })
}

function changeImage (node) {
    if (node) {
        document.querySelector('li.selected').classList.remove('selected')
        node.classList.add('selected')
        document.getElementById('image-displayed').src = node.querySelector('img').src    
    }
    else{
        document.getElementById('image-displayed').src = ''
    }
}

function searchImagesEvent () {

    const searchBox = document.getElementById('search-box')

    searchBox.addEventListener('keyup', function () {

        const regex = new RegExp( this.value.toLowerCase() , 'gi' ) 
       
        if (this.value.length > 0 ){
            
            const thumbs = document.querySelectorAll('li.list-group-item img') 
            
            for (let index = 0; index < thumbs.length; index++) {
                
                const fileUrl = url.parse(thumbs[index].src)

                const fileName = path.basename(fileUrl.pathname)

                if (fileName.match(regex)){
                    thumbs[index].parentNode.classList.remove('hidden')
                }

                else{
                    thumbs[index].parentNode.classList.add('hidden')
                }
                
                selectFirsImage()
            }

        }

        else{
            const hidden = document.querySelectorAll('li.hidden')
            hidden.forEach(element => {
                element.classList.remove('hidden')
            });
        }

    })

}

function selectFirsImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)')
    changeImage(image)
}