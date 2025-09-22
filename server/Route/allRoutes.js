const express = require("express");
const authRoutes = require("./auth.route");
const bookRoutes = require("./book.route");
const reviewRoute = require("./review.route");
const searchRoute = require("./search.route");

const Router = express.Router();

Router.use("/auth", authRoutes);
Router.use("/books", bookRoutes);
Router.use("/reviews", reviewRoute);
Router.use("/search", searchRoute);

module.exports = Router;
