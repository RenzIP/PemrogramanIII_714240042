package router

import (
	"be_latihan/model"
	"be_latihan/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", func (c *fiber.Ctx) error {
		return c.JSON(model.Response{
			Message: "Welcome to the Mahasiswa API",
		})
	})

	mahasiswa := app.Group("/api/mahasiswa")
	mahasiswa.Get("/", handler.GetAllMahasiswa)
}

