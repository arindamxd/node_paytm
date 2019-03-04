module.exports=(app,express)=>{

    var exphbs=require('express-handlebars')
    var path=require('path')
    var packageInfo=require('../../package.json')
    var config=require('../../config.json')
    var pc=require('../controllers/payment_controller.js')
    var router=express.Router()
    app.set('view_path',__dirname+config.view_path)
    var vp=app.get('view_path') 
 
    app.engine('hbs',exphbs({
        extname: 'hbs', 
        defaultLayout: vp+'/layouts/index.hbs'
    }))
    
    app.set('view engine', 'handlebars');
     
    app.use(express.static(path.join(__dirname, '../../public'))); 

    app.use('/'+config.path_prefix , router);
     
    router.all('/', function(req,res)
    {
        res.send({message:packageInfo.description,developer:packageInfo.author,version:packageInfo.version})

    });

    router.all('/home',pc.home)
    router.all('/init',pc.init)


 
}