const sql = require("../config/database");

exports.GetMasterBranch = (req, res, next) => {
  sql.query("SELECT * FROM M_BRANCH", function (err, data, fields) {
    res.status(200).json({
      status: "success",
      statusCode: 200,
      data: data,
    });
  });
};

exports.GetMasterProduct = (req, res, next) => {
  sql.query("SELECT * FROM M_PRODUCT", function (err, data, fields) {
    res.status(200).json({
      status: "success",
      statusCode: 200,
      data: data,
    });
  });
};

exports.GetAllDataCust = (req, res, next) => {
  sql.query(
    "SELECT C.CUST_ID, C.FIRST_NAME, C.LAST_NAME, C.PHONE_NO, C.BRANCH_ID, C.PRODUCT_ID, C.TENOR_ID, B.BRANCH_NAME, P.PRODUCT_NAME FROM T_DATA_CUSTOMER AS C INNER JOIN M_BRANCH AS B ON B.BRANCH_ID = C.BRANCH_ID INNER JOIN M_PRODUCT AS P ON P.PRODUCT_ID = C.PRODUCT_ID",
    function (err, data, fields) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        data: data,
      });
    }
  );
};

exports.GetDataCustomer = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No data customer id found", 404));
  }
  sql.query(
    "SELECT * FROM T_DATA_CUSTOMER WHERE id = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        statusCode: 200,
        data: data,
      });
    }
  );
};

exports.SaveDataCust = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [
    req.body.firstname,
    req.body.lastName,
    req.body.phoneNumber,
    req.body.branch,
    req.body.product,
    req.body.tenor,
    req.body.avatar,
  ];
  sql.query(
    "INSERT INTO T_DATA_CUSTOMER (FIRST_NAME, LAST_NAME, PHONE_NO, BRANCH_ID, PRODUCT_ID, TENOR_ID, AVATAR) VALUES(?)",
    [values],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "Customer created!",
        statusCode: 200,
      });
    }
  );
};

exports.updateDataCust = (req, res, next) => {
  const formData = {
    FIRST_NAME: req.body.firstname,
    LAST_NAME: req.body.lastName,
    PHONE_NO: req.body.phoneNumber,
    BRANCH_ID: req.body.branch,
    PRODUCT_ID: req.body.product,
    TENOR_ID: req.body.tenor,
    AVATAR: req.body.avatar,
  };

  console.log(formData);

  sql.query(
    `UPDATE T_DATA_CUSTOMER SET ? WHERE CUST_ID=${req.params.id}`,
    [formData],
    function (err, data, fields) {
      console.log(err);
      // if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo updated!",
        statusCode: 200,
      });
    }
  );
};

exports.DeleteDataCust = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No customer id found", 404));
  }
  sql.query(
    `DELETE FROM T_DATA_CUSTOMER  WHERE CUST_ID=${req.params.id}`,
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "customer deleted!",
        statusCode: 200,
      });
    }
  );
};
