"use strict";const e=require("log4js"),o=require("path");let r=!1;"production"===process.env.NODE_ENV?(e.configure(o.join(__dirname,"..","..","config","log4js.json")),r=e.getLogger("log")):r=e.getLogger(),module.exports=r;