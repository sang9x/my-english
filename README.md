# MyEnglish - English Sentence Builder & Vocabulary Learning Web App

MyEnglish là một ứng dụng web học tập tương tác giúp người học cải thiện vốn từ vựng tiếng Anh theo chủ đề, rèn luyện phản xạ ngữ pháp qua game sắp xếp câu, và ôn luyện hai chiều (Anh-Việt, Việt-Anh) qua các game gõ từ trực quan.

## 🚀 Tính Năng Chính
1. **Chọn chủ đề học tập (Topic Selection)**: Lựa chọn các chủ đề phổ biến (Du lịch, TOEIC, Giao tiếp...).
2. **Học qua Flashcards**: Xem từ vựng kèm phát âm IPA, nghĩa tiếng Việt, ví dụ và âm thanh chuẩn.
3. **Game Sắp Xếp Câu (Sentence Builder)**: Kéo thả/click các từ bị xáo trộn để tạo câu đúng.
4. **Game Gõ từ tiếng Anh (English Typing)**: Gõ từ tiếng Anh dựa theo nghĩa tiếng Việt và các gợi ý.
5. **Game Gõ nghĩa tiếng Việt (Vietnamese Typing)**: Gõ nghĩa tiếng Việt tương ứng với từ tiếng Anh.
6. **Thống Kê Tiến Trình**: Theo dõi streak học tập và điểm số tích lũy.

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)
* **Frontend**: Next.js 15 (React 19), TypeScript, Tailwind CSS.
* **Component Library**: Shadcn/ui (Radix UI).
* **Game & Animation**: `@dnd-kit/core`, `Framer Motion`.
* **State Management**: `Zustand`.
* **Database & Auth**: `Supabase` (PostgreSQL & Go-auth).
* **Deployment**: `Vercel` (tích hợp CI/CD với GitHub).

## 📂 Cấu Trúc Thư Mục Dự Án
```text
├── .agents/              # Cấu hình AI Agent (Skills & Rules của dự án)
├── docs/                 # Tài liệu đặc tả nghiệp vụ (SRS, UC)
│   ├── SRS.md            # Đặc tả yêu cầu phần mềm
│   ├── UC_Overview.md    # Tổng quan Use Cases
│   └── UC_Detailed.md    # Đặc tả Use Cases chi tiết
├── src/
│   ├── app/              # Next.js App Router (Pages & APIs)
│   ├── components/       # Các UI Component dùng chung (Flashcard, Game, Layout...)
│   └── lib/              # Tiện ích, cấu hình database/auth/caching
```

## ⚙️ Hướng Dẫn Phát Triển Cho Cả Người & AI Agent

Dự án này tích hợp các quy tắc phát triển tự động cho AI Coding Agent thông qua thư mục `.agents/`. Khi bạn ra lệnh phát triển tính năng mới cho AI, hệ thống sẽ thực hiện theo quy trình 6 bước bắt buộc:
1. Cập nhật yêu cầu vào [SRS.md](file:///d:/my-project/my-english/docs/SRS.md).
2. Vẽ sơ đồ/viết kịch bản vào [UC_Detailed.md](file:///d:/my-project/my-english/docs/UC_Detailed.md).
3. Triển khai code trong `src/`.
4. Viết các test case tự động.
5. Chạy test và sửa lỗi bằng lệnh test local.
6. Commit, push lên GitHub và deploy lên Vercel.

### Chạy dự án ở local:
1. Cài đặt dependency:
   ```bash
   npm install
   ```
2. Chạy server phát triển:
   ```bash
   npm run dev
   ```
3. Chạy test:
   ```bash
   npm run test
   ```
