const sql = require("../config/database");

// constructor
const Branch = function (branch) {
  this.BRANCH_NAME = branch.BRANCH_NAME;
};

Branch.getAll = () => {
  let query = "SELECT * FROM M_BRANCH";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};
