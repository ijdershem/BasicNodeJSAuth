import db from '../../models';
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req: any, res: any, next: any) => {
  // Email
  User.findOne({
    email: req.body.email
  }).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Email is already in use" });
      return;
    }

    next();
  });
};

const checkRolesExisted = (req: any, res: any, next: any) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES?.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Role ${req.body.roles[i]} does not exist`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted
};

export default verifySignUp;