package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/router"


	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	config.InitDB()
	config.GetDB().AutoMigrate(&model.Mahasiswa{})
	router.SetupRoutes(app)
	app.Listen(":3000")
}
