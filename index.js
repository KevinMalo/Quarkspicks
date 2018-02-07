'use strict'

// instanciando los objetos app y BrowserWindows (anhade una ventana)
const { app, BrowserWindow } = require('electron')

//Imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
    console.log('saliendo');
})

//Ejecutando ordenes cuando la aplicacion esta lista
app.on('ready', () => {

    //creando una ventana
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hola mundo',
        center: true,
        show: false
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('move', () => {
        const position = win.getPosition()
        console.log(`la posicion de la ventana es ${position}`);
        
    })

    //detectando el cierre de la ventana
    win.on('closed', () => {
        win = null
        app.quit()
    })

    win.loadURL('https://kevinbueno.me/')
})