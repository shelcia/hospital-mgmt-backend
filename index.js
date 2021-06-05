const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4050;

//IMPORT ROUTES

const deptRoute = require("./routes/department");
const hospRoute = require("./routes/hospital");

//MIDDLEWARE
app.use(express.json(), cors());

//ROUTE MIDDLEWARE

app.use("/api/department", deptRoute);
app.use("/api/hospital", hospRoute);

app.get("/", (req, res) => {
  res.send(`<p>Hey it's working</p>`);
});
app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));
