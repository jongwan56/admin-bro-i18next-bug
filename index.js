const i18next = require("i18next");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const express = require("express");

const ADMIN = {
  email: "test@example.com",
  password: "password",
};

i18next.init({
  lng: "ko",
  preload: ["ko"],
  resources: {
    ko: {
      translation: {
        "Hello, World!": "안녕, 세상!",
      },
    },
  },
});

const app = express();

const adminBro = new AdminBro({
  rootPath: "/admin",
});

const router = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    authenticate: async (email, password) => {
      if (ADMIN.email === email && ADMIN.password === password) {
        return ADMIN;
      }
      return null;
    },
    cookiePassword: "admin-bro",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

app.use(adminBro.options.rootPath, router);

app.get("/", (req, res) => {
  res.send(i18next.t("Hello, World!"));
});

app.listen(3000);
