# Frontend
ใช้ React.js ร่วมกับ Vite
Library
-  Vite – สร้างโปรเจกต์ React
-  axios – สำหรับเรียก API
-  react-router-dom – การจัดการ routing
-  zustand – จัดการ state
-  Tailwind CSS – จัดการ CSS
-  Lucide-react – สำหรับใช้ไอคอน
-  react-data-table-component – ตารางข้อมูลแบบ interactive
-  react-toastify – การแจ้งเตือนแบบ toast
-  react-image-file-resizer – ย่อรูปภาพก่อนอัปโหลด
-  rc-slider – สำหรับสร้างแถบเลื่อน (slider)
-  lodash – ฟังก์ชันช่วยเหลือสำหรับการจัดการข้อมูล
-  numeral – จัดรูปแบบตัวเลข
-  moment – จัดการวันที่และเวลา
-  motion - จัดการอนิเมชั่นแสดงการ์ด
-  swiper - จัดการอนิเมชั่น slide
# Backend
ใช้ Node.js และ Express.js
Library
- Express.js – สร้าง RESTful API
- Morgan – สำหรับ log คำขอ HTTP
- CORS – จัดการการเชื่อมต่อข้ามโดเมน
- Nodemon – รันเซิร์ฟเวอร์ใหม่อัตโนมัติเมื่อมีการแก้ไขไฟล์
- Bcryptjs – เข้ารหัสรหัสผ่าน
- jsonwebtoken – จัดการ token สำหรับ auth
- Prisma – ORM สำหรับเชื่อมต่อกับฐานข้อมูล
- Cloudinary – สำหรับอัปโหลดและจัดการรูปภาพ
- Stripe – ระบบการชำระเงิน
----------------------------------------------------------------------------
# Tools
- Postman
- Visual Studio Code
- MySQL Workbench
- MAMP
----------------------------------------------------------------------------
# development [client and server]
- $ npm run dev
----------------------------------------------------------------------------
# Prisma
Use Prisma
- $ npx prisma migrate dev --name name

Update Prisma
- $ npx prisma migrate dev
----------------------------------------------------------------------------
# Frontend install
- $ npm create vite@latest
- $ npm install
- $ npm install tailwindcss @tailwindcss/vite
- $ npm install lucide-react
- $ npm install react-data-table-component
- $ npm i react-router-dom
- $ npm i axios
- $ npm i react-toastify
- $ npm i zustand
- $ npm i datatables
- $ npm i react-image-file-resizer
- $ npm i rc-slider
- $ npm i lodash
- $ npm i numeral
- $ npm i moment
- $ npm i motion
- $ npm i swiper
----------------------------------------------------------------------------
# Backend install
- $ npm init -y
- $ npm install express morgan cors nodemon bcryptjs jsonwebtoken
- $ npm install prisma
- $ npx prisma init
- $ npm install @prisma/client
- $ npm i cloudinary
- $ npm install --save stripe
