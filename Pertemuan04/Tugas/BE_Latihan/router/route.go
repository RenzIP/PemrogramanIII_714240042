package router

import (
	"be_latihan/handler"
	"be_latihan/model"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(model.Response{
			Message: "Welcome to the Mahasiswa API",
		})
	})

	mahasiswa := app.Group("/api/mahasiswa")
	mahasiswa.Get("/", handler.GetAllMahasiswa)
	mahasiswa.Get("/search", handler.GetMahasiswaByNPM)
	mahasiswa.Get("/:npm", handler.GetMahasiswaByNPM)
}
