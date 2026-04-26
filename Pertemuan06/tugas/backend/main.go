package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/router"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     strings.Join(config.GetAllowedOrigins(), ","),
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Content-Type, Authorization",
		AllowCredentials: false,
	}))
	config.InitDB()
	if db := config.GetDB(); db != nil {
		db.AutoMigrate(&model.Mahasiswa{})
	}
	router.SetupRoutes(app)
	log.Fatal(app.Listen(":3000"))
}
