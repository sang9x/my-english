# Use Case Overview (Tổng quan Use Cases)
## Dự án: Web App Học Từ Vựng và Sắp Xếp Câu Tiếng Anh (MyEnglish)

---

## 1. Biểu đồ Use Case tổng quát (Use Case Diagram)

```mermaid
usecaseDiagram
    actor User as "Người học (User)"
    
    rect "Hệ thống Web App MyEnglish"
        User --> (UC01: Chọn Chủ Đề Học)
        User --> (UC02: Học Từ Vựng qua Flashcard)
        User --> (UC03: Game Sắp Xếp Câu)
        User --> (UC04: Game Gõ Từ Tiếng Anh theo Nghĩa Tiếng Việt)
        User --> (UC05: Game Gõ Nghĩa Tiếng Việt theo Từ Tiếng Anh)
        User --> (UC06: Xem Lịch Sử & Tiến Trình Học)
    end
```

---

## 2. Danh sách các Use Cases

| Mã UC | Tên Use Case | Tác nhân (Actor) | Mô tả tóm tắt |
|---|---|---|---|
| **UC01** | Chọn Chủ Đề Học | User | Người dùng chọn một chủ đề từ vựng (ví dụ: Du lịch, Công việc, Gia đình) để bắt đầu học hoặc chơi game. |
| **UC02** | Học Từ Vựng qua Flashcard | User | Người dùng xem và tương tác với các thẻ từ vựng (mặt trước/mặt sau) trong chủ đề đã chọn để ghi nhớ. |
| **UC03** | Game Sắp Xếp Câu | User | Người dùng sắp xếp các từ xáo trộn thành câu tiếng Anh hoàn chỉnh theo nghĩa tiếng Việt gợi ý. |
| **UC04** | Game Gõ Từ Tiếng Anh | User | Người dùng gõ từ tiếng Anh tương ứng với nghĩa tiếng Việt cho trước. |
| **UC05** | Game Gõ Nghĩa Tiếng Việt | User | Người dùng gõ nghĩa tiếng Việt tương ứng với từ tiếng Anh cho trước. |
| **UC06** | Xem Lịch Sử & Tiến Trình | User | Người dùng xem thống kê số từ đã thuộc, điểm số các game, và chuỗi ngày học (streak). |
| **UC07** | Tạo & Quản lý Chủ Đề Tùy Chỉnh | User | Người dùng tạo chủ đề riêng, đặt tên, chọn emoji, quản lý danh sách từ (sửa, xóa, sắp xếp) và chia sẻ qua link. |
| **UC08** | Nhập Từ Vựng Thủ Công | User | Người dùng thêm từ vào chủ đề tùy chỉnh bằng form từng từ hoặc bulk import theo định dạng pipe-separated. |
| **UC09** | Auto-Import từ Cambridge Dictionary | User | Người dùng nhập danh sách từ tiếng Anh, hệ thống tự tra IPA + định nghĩa, người dùng bổ sung nghĩa tiếng Việt rồi lưu. |
| **UC10** | Xem & Clone Chủ Đề Chia Sẻ | User | Người dùng nhận link `/share/[code]`, xem preview chủ đề của người khác và clone về thư viện cá nhân. |
