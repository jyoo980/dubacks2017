import {User} from "../users/User";

var mysql = require('mysql');

export class DbUtil {

// possible to only pass in a function that consumes a connection?

    private static executeSql = function(sql : string, connection : any) {
        connection.query(sql, function (err: any, result: any) {
            if (err) throw err;
            console.log("Yay, no error! Database insert was fine.");
        })
    };

    // yeah idk if this will work, haha.
    public static doWithConnection(execute : (connection : any) => any) {
        let connection : any = mysql.createConnection(
            {host : "172.17.0.2",
            user:"application",
            password: "dubbyfoods",
            database: "test"});

        connection.connect(function (err : any) {
            if (err) throw err;
            execute(connection);
        })
    }

    // unsafe atm!!
    // abstract further even
    // should probably also keep a user id in the profile...
    public static insertPerson(person : User, comments : string) {
        let sql : string = " INSERT INTO person " +
            " (name, seller, registration, comments) " +
            ' VALUES ("' + person.getName() + '", 1, NOW(), "' + comments + '");';

        DbUtil.doWithConnection((connection : any) => this.executeSql(sql, connection));
        console.log("Done doWithConnection");
    }

    public static updateProfile(person : User, field : string, newValue : string) {
        let sql : string = 'UPDATE person SET "' + field + '" = "' + newValue
        + '" WHERE person.name = "'+ person.getName() + '" ;'; // !!! change to unique key!
        DbUtil.doWithConnection((connection : any) => this.executeSql(sql, connection));
    }
}