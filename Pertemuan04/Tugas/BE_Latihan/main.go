package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	config.InitDB()
	config.GetDB().AutoMigrate(&model.Mahasiswa{})
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Get("/mahasiswa", func(c *fiber.Ctx) error {
		mahasiswa, err := repository.GetAllMahasiswa()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		return c.JSON(mahasiswa)
	})

	app.Post("/mahasiswa", func(c *fiber.Ctx) error {
		var payload model.Mahasiswa
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid request body"})
		}

		created, err := repository.InsertMahasiswa(&payload)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(201).JSON(created)
	})

	app.Get("/mahasiswa/:npm", func(c *fiber.Ctx) error {
		npm, err := strconv.ParseInt(c.Params("npm"), 10, 64)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "npm must be a valid integer"})
		}

		mahasiswa, err := repository.GetMahasiswaByNPM(npm)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": "mahasiswa not found"})
		}

		return c.JSON(mahasiswa)
	})

	app.Put("/mahasiswa/:npm", func(c *fiber.Ctx) error {
		npm, err := strconv.ParseInt(c.Params("npm"), 10, 64)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "npm must be a valid integer"})
		}

		var payload model.Mahasiswa
		if err := c.BodyParser(&payload); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid request body"})
		}

		updated, err := repository.UpdateMahasiswa(npm, &payload)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": "mahasiswa not found"})
		}

		return c.JSON(updated)
	})

	app.Delete("/mahasiswa/:npm", func(c *fiber.Ctx) error {
		npm, err := strconv.ParseInt(c.Params("npm"), 10, 64)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "npm must be a valid integer"})
		}

		if err := repository.DeleteMahasiswa(npm); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		return c.JSON(fiber.Map{"message": "mahasiswa deleted"})
	})

	app.Listen(":3000")
}
