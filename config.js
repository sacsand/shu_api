//Database And Server Configuration
/*
For the Local Run uncomment following line
'database': 'mongodb://localhost:27017/police'

For the Globaly Run use Heroku server. //APK FILE using this server .
//'database': 'mongodb://sacsand:sac1234@ds023495.mlab.com:23495/heroku_tdf52rkr'
*/
module.exports = {

    'secret': 'shu2k12839',
    'database': 'mongodb://localhost:27017/police'                                             /*local */
    //'database': 'mongodb://sacsand:sac1234@ds023495.mlab.com:23495/heroku_tdf52rkr'         /*Global Run--heroku server,production */  

};
