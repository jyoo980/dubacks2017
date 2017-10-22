export default class Listener {

    main() {

        const
            bodyParser = require('body-parser'),
            express = require('express'),
            app = express().use(bodyParser.json);

        app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

    }



}