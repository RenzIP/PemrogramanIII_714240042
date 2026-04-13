package handler

import (
	"be_latihan/model"
	"be_latihan/repository"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetAllMahasiswa(c *fiber.Ctx) error {
	data, err := repository.GetAllMahasiswa()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "Failed to get all mahasiswa",
			Error:   err.Error(),
		})
	}
	return c.Status(200).JSON(model.Response{
		Message: "Data berhasil diambil",
		Data:    data,
	})
}

func GetMahasiswaByNPM(c *fiber.Ctx) error {
	npmQuery := c.Params("npm")
	if npmQuery == "" {
		npmQuery = c.Query("npm")
	}
	if npmQuery == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "NPM is required (path param or query: ?npm=)",
		})
	}
	npm, err := strconv.ParseInt(npmQuery, 10, 64)
	// npm, err := strconv.ParseInt(c.Params("npm"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "Invalid NPM",
			Error:   err.Error(),
		})
	}
	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.Response{
				Message: "Mahasiswa not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "Failed to get mahasiswa",
			Error:   err.Error(),
		})
	}
	return c.JSON(model.Response{
		Message: "Data berhasil diambil",
		Data:    mhs,
	})
}
