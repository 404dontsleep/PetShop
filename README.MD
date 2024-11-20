# PetShop Project

## Cài đặt môi trường

### 1. Cài đặt Docker và Docker Compose
- [Docker Install](https://docs.docker.com/get-docker/)
- [Docker-Compose Install](https://docs.docker.com/compose/install/)
- Hoặc sử dụng [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 2. Clone Project
```bash
git clone https://github.com/404dontsleep/PetShop.git
cd PetShop
```
![Alt text](/readme/Screenshot%202024-11-19%20111710.png "Clone project")
### 3. Chạy Backend
- Đổi tên file `.env.example` thành `.env`
- Cấu hình giá trị `JWT_SECRET` và `SALT` trong file `.env`.
![Alt text](/readme/Screenshot%202024-11-19%20111849.png "Config")
- Khởi động backend bằng Docker Compose:
```bash
docker compose up -d
```

### 4. Chạy Project Expo
- Điều hướng đến thư mục dự án:
```bash
cd PetShop
```
- Mở CMD và nhập lệnh sau để kiểm tra địa chỉ IP cục bộ:
```bash
ipconfig
#ifconfig nếu dùng linux
```
- Lưu địa chỉ IP local lại ví dụ 192.168.1.11
- Cập nhật giá trị `BASE_URL` trong file `PetShop/api/AxiosInstance.ts`
```ts
const BASE_URL = "http://192.168.1.11:5000/api";
```
```bash
npm install
npm run start
```
![Alt text](/readme/Screenshot%202024-11-19%20114001.png "EXPO")