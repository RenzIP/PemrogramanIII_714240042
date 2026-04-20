package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	// Inisialisasi cors middleware
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "http://localhost:8080") // Ganti dengan origin frontend Anda
		c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Method() == "OPTIONS" {
			return c.SendStatus(fiber.StatusNoContent)
		}
		return c.Next()
	})
	config.InitDB()
	config.GetDB().AutoMigrate(&model.Mahasiswa{})
	router.SetupRoutes(app)
	app.Listen(":3000")
}
