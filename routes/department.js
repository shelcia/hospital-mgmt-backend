//DEPARTMENT ROUTER
const router = require("express").Router();
const fs = require("fs");

let departments = require("./department.json");
const fileName = "./routes/department.json";

const save = () => {
  console.log({ departments });
  const stringifyData = JSON.stringify(departments);
  fs.writeFileSync(fileName, stringifyData);
};

router.get("/", (req, res) => {
  res.json(departments);
});

router.get("/:name", (req, res) => {
  const findDept = departments.filter(
    (dept) => dept.hospitalname === req.params.name
  );
  if (!findDept) {
    res.status(404).send("Hospital with name was not found");
  } else {
    res.json(findDept);
  }
});

router.post("/", (req, res) => {
  departments.push(req.body);
  save();
  res.json({
    status: "success",
    deptInfo: req.body,
  });
});

router.put("/:name", (req, res) => {
  const findExist = departments.find(
    (dept) => dept.departmentname === req.params.name
  );
  if (!findExist) {
    return res
      .status(409)
      .send({ error: true, msg: "Department with name was not found" });
  }

  const updateDept = departments.filter(
    (dept) => dept.departmentname !== req.params.name
  );
  updateDept.push(req.body);

  departments = updateDept;

  save();

  res.json({
    status: "success",
    deptInfo: req.body,
  });
});

router.delete("/:name", (req, res) => {
  departments = departments.filter(
    (dept) => dept.departmentname !== req.params.name
  );
  save();
  res.json({
    status: "success",
    removed: req.params.name,
    newLength: departments.length,
  });
});
module.exports = router;
