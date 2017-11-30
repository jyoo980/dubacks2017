import {User} from "../users/User";

var mysql = require('mysql');

export class DbUtil {

// possible to only pass in a function that consumes a connection?

    // yeah idk if this will work, haha.
    public static doWithConnection(execute : (connection : any) => any) {
        let connection : any = mysql.createConnection(
            {host : "172.17.0.2",
            user:"application",
            password: "dubbyfoods"});

        connection.connect(function (err : any) {
            if (err) throw err;
            execute(connection);
        })
    }

    // unsafe atm!!
    public static insertPerson(person : User, comments : string) {
        let sql : string = " INSERT INTO person " +
            " (name, seller, registration, comments) " +
            " VALUES (" + person.getName() + ", 1, NOW(), " + comments + ");";
        let executeSql = function(connection : any) {
            connection.query(sql, function (err: any, result: any) {
                if (err) throw err;
                console.log("Yay, no error! Database insert was fine.");
            })
        };
        DbUtil.doWithConnection(executeSql);
        console.log("Done doWithConnection");
    }

}