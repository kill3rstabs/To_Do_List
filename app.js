const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const port = 3000;
let items = ['Eat food', 'learn to code', 'Mop the floors'];
let workItems = [];
app.get('/', (req, res) => {
    const todo_type = req.params.type;
    if(todo_type=="about"){
        res.redirect('/about');
    }
    let day = date.getDay();
     // Corrected method name and locale format
    res.render("list", { listTitle: day, newListItems: items }); // Corrected variable name
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.post('/', (req, res) => {
    const todo_type = req.params.type;
    
    if (req.body.button == "Work List") {
        let item = req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        let newItem = req.body.newItem;
        items.push(newItem);
        res.redirect(`/${todo_type}`);
    }

});
app.get('/work', (req, res) => {

    res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
