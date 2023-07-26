const express = require('express');
const router = express.Router();
var noteCtrl = require('../controller/noteController');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/notes', noteCtrl.getAllNotes)
router.post('/notes/save', noteCtrl.saveNote)
router.put('/notes/update', noteCtrl.updateNote)
router.delete('/notes/delete/:noteId', noteCtrl.deleteNote)
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

module.exports = router