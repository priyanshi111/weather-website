const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//defining path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs') //to set up handlebars
app.set('views',viewsPath)//setting up views location
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => { //setting up the route 
    res.render('index' ,{
        title :'weather',
        name : 'pri'
    }) //with render we can render our handlebar templates 
    //this will be home page index.hbs
})
app.get('/about',(req,res) => { //setting up the about route 
    res.render('about',{
        title : 'About me',
        name : 'pri'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title : 'Help',
        message : 'helpline available 24/7',
        name : 'Pri'
    })
})
app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide an address'
        })
    }
    res.send({
        address : req.query.address,
        forecast : 'It is snowing'
    })
})

//* is the wildcard charcater
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title : '404',
        msg : 'help article not found',
        name : 'pri'
    })
})

//this has to be written last bcoz if we write it above express will not be able to match the incoming req with the correct route handler written below this statement and will print 404 error
//express looks for a matching route handler from top to bottom
app.get('*',(req,res) =>{//when no above route handler are matched with the req
    res.render('404',{
        title : '404',
        msg : 'page not found',
        name : 'pri'
    })
})
app.listen(3000,() => {
    console.log('server is up on port 3000')
})