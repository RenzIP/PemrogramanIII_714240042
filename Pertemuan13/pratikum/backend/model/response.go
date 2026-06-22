package model

type Response struct {
	Message string      `json:"message" example:"detail pesan"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty" example:"detail error"`
}

type MessageResponse struct {
	Message string `json:"message" example:"operasi berhasil"`
}

type UnauthorizedResponse struct {
	Message string `json:"message" example:"authorization header wajib diisi"`
}

type ForbiddenResponse struct {
	Message string `json:"message" example:"user tidak memiliki akses untuk fitur ini"`
}

type AuthRegisterSuccessResponse struct {
	Message string           `json:"message" example:"register berhasil"`
	Data    AuthUserResponse `json:"data"`
}

type AuthLoginSuccessResponse struct {
	Message string        `json:"message" example:"login berhasil"`
	Data    LoginResponse `json:"data"`
}

type MahasiswaListResponse struct {
	Message string      `json:"message" example:"Data berhasil diambil"`
	Data    []Mahasiswa `json:"data"`
}

type MahasiswaDetailResponse struct {
	Message string    `json:"message" example:"Data berhasil diambil"`
	Data    Mahasiswa `json:"data"`
}

type MahasiswaMutationResponse struct {
	Message string    `json:"message" example:"berhasil menambahkan data mahasiswa"`
	Data    Mahasiswa `json:"data"`
}
