package repository

import (
	"be_latihan/config"
	"be_latihan/model"
	"errors"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

var errDatabaseUnavailable = errors.New("database connection is not available")

var fallbackMahasiswa = []model.Mahasiswa{
	{
		NPM:    714240042,
		Nama:   "Renz Example",
		Prodi:  "Teknik Informatika",
		Alamat: "Bandung",
		Email:  "renz@example.com",
		NoHP:   "081234567890",
		Hobi:   pq.StringArray{"Ngoding", "Membaca"},
	},
	{
		NPM:    714240043,
		Nama:   "Salsa Pratama",
		Prodi:  "Sistem Informasi",
		Alamat: "Garut",
		Email:  "salsa@example.com",
		NoHP:   "081298765432",
		Hobi:   pq.StringArray{"Desain", "Musik"},
	},
	{
		NPM:    714240044,
		Nama:   "Bagas Ramadhan",
		Prodi:  "Teknik Komputer",
		Alamat: "Tasikmalaya",
		Email:  "bagas@example.com",
		NoHP:   "081277788899",
		Hobi:   pq.StringArray{"Futsal", "Game"},
	},
}

func GetAllMahasiswa() ([]model.Mahasiswa, error) {
	if !config.HasDB() {
		return append([]model.Mahasiswa(nil), fallbackMahasiswa...), nil
	}

	var mahasiswa []model.Mahasiswa
	result := config.GetDB().Find(&mahasiswa)
	return mahasiswa, result.Error
}

func InsertMahasiswa(m *model.Mahasiswa) (*model.Mahasiswa, error) {
	if !config.HasDB() {
		return nil, errDatabaseUnavailable
	}

	result := config.GetDB().Create(m)
	return m, result.Error
}

func GetMahasiswaByNPM(npm int64) (*model.Mahasiswa, error) {
	if !config.HasDB() {
		for _, mahasiswa := range fallbackMahasiswa {
			if mahasiswa.NPM == npm {
				data := mahasiswa
				return &data, nil
			}
		}

		return nil, gorm.ErrRecordNotFound
	}

	var mahasiswa model.Mahasiswa
	result := config.GetDB().First(&mahasiswa, "npm = ?", npm)
	return &mahasiswa, result.Error
}

func UpdateMahasiswa(npm int64, newData *model.Mahasiswa) (*model.Mahasiswa, error) {
	if !config.HasDB() {
		return nil, errDatabaseUnavailable
	}

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
	if !config.HasDB() {
		return errDatabaseUnavailable
	}

	var mahasiswa model.Mahasiswa
	result := config.GetDB().Where("npm = ?", npm).Delete(&mahasiswa)
	return result.Error
}
