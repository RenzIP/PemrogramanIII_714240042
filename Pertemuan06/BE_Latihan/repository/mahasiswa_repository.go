package repository

import (
	"be_latihan/config"
	"be_latihan/model"
)

func GetAllMahasiswa() ([]model.Mahasiswa, error) {
	var mahasiswa []model.Mahasiswa
	result := config.GetDB().Find(&mahasiswa)
	return mahasiswa, result.Error
}

func InsertMahasiswa(m *model.Mahasiswa) (*model.Mahasiswa, error) {
	result := config.GetDB().Create(m)
	return m, result.Error
}

func GetMahasiswaByNPM(npm int64) (*model.Mahasiswa, error) {
	var mahasiswa model.Mahasiswa
	result := config.GetDB().First(&mahasiswa, "npm = ?", npm)
	return &mahasiswa, result.Error
}

func UpdateMahasiswa(npm int64, newData *model.Mahasiswa) (*model.Mahasiswa, error) {
	var mahasiswa model.Mahasiswa

	db := config.GetDB()
	if err := db.First(&mahasiswa, "npm = ?", npm).Error; err != nil {
		return nil, err
	}

	if err := db.Model(&mahasiswa).Omit("npm").Updates(newData).Error; err != nil {
		return nil, err
	}

	if err := db.First(&mahasiswa, "npm = ?", npm).Error; err != nil {
		return nil, err
	}
	return &mahasiswa, nil
}

func DeleteMahasiswa(npm int64) error {
	var mahasiswa model.Mahasiswa
	result := config.GetDB().Where("npm = ?", npm).Delete(&mahasiswa)
	return result.Error
}
