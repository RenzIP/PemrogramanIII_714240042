package repository_test

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"fmt"
	"testing"
	"time"
)

func setupTest(t *testing.T) {
	t.Helper()
	config.InitDB()
	if !config.HasDB() || config.GetDB() == nil {
		t.Skip("database test tidak tersedia")
	}
	err := config.GetDB().AutoMigrate(&model.Mahasiswa{})
	if err != nil {
		t.Fatalf("Failed to migrate database: %v", err)
	}
}

func createTestMahasiswa(t *testing.T) int64 {
	t.Helper()
	npm := time.Now().UnixNano()
	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "Test User",
		Prodi:  "Teknik Informatika",
		Alamat: "Jl. Test No. 123",
		Email:  "baagas7474@gmail.com",
		NoHP:   "085179935117",
		Hobi:   []string{"Coding", "Gaming"},
	}
	_, err := repository.InsertMahasiswa(&mhs)
	if err != nil {
		t.Fatalf("Failed to insert mahasiswa: %v", err)
	}
	t.Cleanup(func() {
		_ = repository.DeleteMahasiswa(npm)
	})
	return npm
}

func TestInsertMahasiswa(t *testing.T) {
	setupTest(t)
	npm := createTestMahasiswa(t)

	fmt.Printf("Berhasil. NPM Yang di tambahkan: %d\n", npm)
}

func TestGetAllMahasiswa(t *testing.T) {
	setupTest(t)
	data, err := repository.GetAllMahasiswa()
	if err != nil {
		t.Fatalf("Failed to get all mahasiswa: %v", err)
	}

	if len(data) == 0 {
		t.Fatal("Expected to find at least one mahasiswa, but found none")
	}
	fmt.Printf("Berhasil. Jumlah data yang ditemukan: %+v\n", data)
}

func TestGetMahasiswaByNPM(t *testing.T) {
	setupTest(t)
	npm := createTestMahasiswa(t)

	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		t.Fatalf("Failed to get mahasiswa by NPM: %v", err)
	}

	if mhs.NPM != npm {
		t.Fatalf("Expected NPM %d, but got %d", npm, mhs.NPM)
	}
	fmt.Printf("Berhasil. Data mahasiswa yang ditemukan: %+v\n", mhs)
}

func TestUpdateMahasiswa(t *testing.T) {
	setupTest(t)

	npm := createTestMahasiswa(t)
	_, err := repository.UpdateMahasiswa(npm, &model.Mahasiswa{
		NPM:   npm,
		Nama:  "bagas",
		Prodi: "S1 Teknik Informatika",
		NoHP:  "085179935117",
	})

	if err != nil {
		t.Fatalf("Failed to update mahasiswa: %v", err)
	}
	fmt.Printf("Berhasil. NPM Yang di update: %d\n", npm)
}

func TestDeleteMahasiswa(t *testing.T) {
	setupTest(t)
	npm := createTestMahasiswa(t)
	err := repository.DeleteMahasiswa(npm)
	if err != nil {
		t.Fatalf("Failed to delete mahasiswa: %v", err)
	}
	fmt.Printf("Berhasil. NPM Yang di delete: %d\n", npm)
}
