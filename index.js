const express = require("express")
const path = require("path")
const app = express()
const port = process.env.port || 3011

const Bundler = require("parcel-bundler")

const file = ["app/index.js", "styles/index.scss"]
const options = {
  outDir: "./public",
  publicUrl: "/cdn",
  production: process.env.NODE_ENV === "production",
}
const bundler = new Bundler(file, options)

app.use(bundler.middleware())
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.get("/", async (req, res) => {
  res.render("pages/home")
})

app.get("/work", async (req, res) => {
  res.render("pages/work")
})

app.get("*", (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(
    `\x1b[32m Server listening at\x1b[0m`,
    `\x1b[4mhttp://localhost:${port}\x1b[0m`
  )
})

module.exports = app
