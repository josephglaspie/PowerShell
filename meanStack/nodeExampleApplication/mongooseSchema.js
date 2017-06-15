var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

var EmployeeSchema = new Schema({
    name: {
        first: {
            type: String,
            require: true
        },
        last: {
            type: String,
            required: true
        }
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    image: {
        type: String,
        default: 'images/users.png'
    },
    address: {
        lines: {
            type: [string]
        },
        postal: {
            type: String
        }
    }
});

mongoose.connect(dbUrl, function() {
    console.log('connected!');

    Team.create([{
        name: 'Product Developement'
    }, {
        name: 'Dev Ops'
    }, {
        name: 'Accounting'
    }], function(error, pd, devops, acct) {
        if (error) {
            console.log(error);
        } else {
            console.dir(pd);
            console.dir(devops);
            console.dir(acct);

            db.close();
            process.exit();
        }
    });
});