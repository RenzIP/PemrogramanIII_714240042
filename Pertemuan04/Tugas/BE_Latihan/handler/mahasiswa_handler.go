package handler

import (
	"be_latihan/repository"
	"be_latihan/model"

	"github.com/gofiber/fiber/v2"
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