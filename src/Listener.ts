export default class Listener {

    main() {

        const
            bodyParser = require('body-parser'),
            express = require('express'),
            app = express().use(bodyParser.json);

        app.listen(process.env.PORT || 5151, () => console.log('webhook is listening'));


        app.get("/", (req : any, res : any) => res.send("??? successful get request"));

        
    }



}