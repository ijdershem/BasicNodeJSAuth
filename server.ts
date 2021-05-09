import express from 'express';
import db from './app/models';
import bodyParser from "body-parser";
import cors from "cors";
const Role = db.role;

const app = express();

db.mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@easyaccess.e1zo3.mongodb.net/EasyAccess?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// routes
// simple route
app.get("/", (req: any, res: any) => {
    res.json({ message: "Welcome to Easy Access application"})
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

function initial() {
    Role.estimatedDocumentCount((err: any, count: number) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save((err: any) => {
                if(err) {
                    console.log("error", err)
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save((err: any) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });
            
            new Role({
                name: "admin"
            }).save((err: any) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
