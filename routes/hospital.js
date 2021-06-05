//HOSPITAL ROUTER
const router = require("express").Router();
const fs = require("fs");

let hospitals = require("./hospital.json");
const fileName = "./routes/hospital.json";

const save = () => {
  console.log({ hospitals });
  const stringifyData = JSON.stringify(hospitals);
  fs.writeFileSync(fileName, stringifyData);
};

router.get("/", (req, res) => {
  res.json(hospitals);
});

router.get("/:name", (req, res) => {
  const findHosp = hospitals.find(
    (hosp) => hosp.hospitalname === req.params.name
  );
  if (!findHosp) {
    res.status(404).send("Hospital with name was not found");
  } else {
    res.json(findHosp);
  }
});

router.post("/", (req, res) => {
  hospitals.push(req.body);
  console.log(hospitals);
  save();
  res.json({
    status: "success",
    hospInfo: req.body,
  });
});

router.put("/:name", (req, res) => {
  const findExist = hospitals.find(
    (hosp) => hosp.hospitalname === req.params.name
  );
  if (!findExist) {
    return res
      .status(409)
      .send({ error: true, msg: "Hospital with name was not found" });
  }

  const updateHosp = hospitals.filter(
    (hosp) => hosp.hospitalname !== req.params.name
  );
  updateHosp.push(req.body);

  hospitals = updateHosp;

  save();

  res.json({
    status: "success",
    hospInfo: req.body,
  });
});

router.delete("/:name", (req, res) => {
  hospitals = hospitals.filter((hosp) => hosp.hospitalname !== req.params.name);
  save();
  res.json({
    status: "success",
    removed: req.params.name,
    newLength: hospitals.length,
  });
});
module.exports = router;
