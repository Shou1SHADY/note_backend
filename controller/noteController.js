var generator = require('../util/generator')
var memStorage = require('../util/memoryStorage')
var model = require('../model/node.model')


exports.getAllNotes = (req, res) => {


    // var new_id_1 = generator.generate();
    // memStorage.store.setItem(new_id_1, "1st_key");

    // var new_id_2 = generator.generate();
    // memStorage.store.setItem(new_id_2, "2nd_key");

    var keys = memStorage.getKeys(memStorage.store)
    var values = memStorage.getValues(memStorage.store)
    // console.log("Value .. " + JSON.stringify(values))
    // var Note = model.Note;
    // var noteObj = new Note(new_id_1, "ccc", "ssss", "ddd", new Date());
    res.status(200).send(JSON.stringify(values));
}
exports.saveNote = (req, res) => {
    var new_id_1 = generator.generate();
    var createdBy = "Admin";
    var createdOn = new Date();
    var title = req.body.title;
    var content = req.body.content;
    console.log(title + "  " + content);
    if (!title || !content) {
        return res.status(500).send({ error: 'title and content empty!' });
    }
    var Note = model.Note;
    var noteObj = new Note(new_id_1, title, content, createdBy, createdOn);
    memStorage.store.setItem(new_id_1, noteObj);
    return res.status(201).send('save all notes home page')
}
exports.updateNote = (req, res) => {
    var createdBy = "Admin";
    var createdOn = new Date();
    var noteId = req.body.noteId;
    var title = req.body.title;
    var content = req.body.content;
    console.log(title + "  " + content);
    if (!noteId) {
        return res.status(500).send({ error: 'noteId  empty!' });
    }
    if (!title || !content) {
        return res.status(500).send({ error: 'title and content empty!' });
    }
    var noteItem = memStorage.store.getItem(noteId);
    if (!noteItem) {

        return res.status(500).send({ error: 'noteId  does not exist!' });
    }
    var Note = model.Note;
    var noteObj = new Note(noteId, title, content, createdBy, createdOn);
    memStorage.store.setItem(noteId, noteObj);
    return res.status(201).send('updated  note home page')
    // res.send('update all notes home page')
}
exports.deleteNote = (req, res) => {
    var noteId = req.params.noteId;
    if (!noteId) {
        return res.status(500).send({ error: 'cannot delete note' });
    }
    //
    var noteItem = memStorage.store.getItem(noteId);
    if (!noteItem) {

        return res.status(500).send({ error: 'noteId  does not exist!' });
    }
    //
    memStorage.store.removeItem(noteId);
    return res.status(200).send('delete note home page')
}
//separation of concern