import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 8000;

app.set("port", port);
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res)=>{
  res.send('hello there');
})

app.listen(port, () => {
  console.info(`listening on ${port}`);
});
