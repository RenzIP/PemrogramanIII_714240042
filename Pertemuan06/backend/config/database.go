package config

import (
	"fmt"
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		err = godotenv.Load("../.env")
		if err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}
	dsn := os.Getenv("SUPABASE_URL")
	if dsn == "" {
		log.Fatal("SUPABASE_URL environment variable is not set")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	DB = db
	fmt.Println("Database connection established")
}

func GetDB() *gorm.DB {
	if DB == nil {
		log.Fatal("Database connection is not initialized")
	}
	return DB
}