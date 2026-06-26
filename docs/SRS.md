# Software Requirements Specification (SRS)
## Dự án: Web App Học Từ Vựng và Sắp Xếp Câu Tiếng Anh (MyEnglish)

---

## 1. Giới thiệu (Introduction)

### 1.1. Mục đích (Purpose)
Tài liệu này đặc tả toàn bộ yêu cầu phần mềm cho dự án **MyEnglish** - một ứng dụng web tương tác giúp người dùng học từ vựng tiếng Anh theo chủ đề, luyện tập kỹ năng nhớ nghĩa từ qua game gõ từ, và rèn luyện phản xạ ngữ pháp qua game sắp xếp câu.

### 1.2. Phạm vi hệ thống (Scope)
Hệ thống là một ứng dụng Web (Single Page Application hoặc Server-Side Rendered tùy thuộc công nghệ triển khai) cung cấp các chức năng học tập từ vựng, kiểm tra qua game gõ từ 2 chiều (Anh-Việt, Việt-Anh), sắp xếp câu và thống kê kết quả học tập cá nhân.

---

## 2. Mô tả tổng quan (Overall Description)

### 2.1. Các tính năng chính của hệ thống
Hệ thống bao gồm các phân hệ chức năng sau:
1. **Quản lý & Chọn chủ đề (Topic Selection)**: Cho phép người dùng duyệt và chọn chủ đề học tập (Giao tiếp, Du lịch, Công nghệ, TOEIC, v.v.).
2. **Học từ vựng qua Flashcard**: Hiển thị từ vựng kèm hình ảnh, âm thanh phát âm (IPA) và câu ví dụ.
3. **Trò chơi sắp xếp câu (Sentence Builder Game)**: Xếp các từ tiếng Anh bị trộn lẫn thành câu hoàn chỉnh dựa trên nghĩa tiếng Việt.
4. **Trò chơi gõ từ tiếng Anh theo nghĩa tiếng Việt (English Typing Game)**: Hiển thị nghĩa tiếng Việt, yêu cầu người dùng nhập đúng từ tiếng Anh.
5. **Trò chơi gõ nghĩa tiếng Việt theo từ tiếng Anh (Vietnamese Typing Game)**: Hiển thị từ tiếng Anh, yêu cầu người dùng nhập đúng nghĩa tiếng Việt tương ứng.
6. **Báo cáo tiến trình học tập (Progress Tracking)**: Thống kê số từ đã thuộc, điểm số các game và chuỗi ngày học liên tục (Streak).

### 2.2. Đối tượng người dùng (User Classes and Characteristics)
- **Học viên tự do (Students/Learners)**: Những người muốn tăng vốn từ vựng và cải thiện cấu trúc câu một cách trực quan, vui nhộn. Yêu cầu giao diện thân thiện, dễ tương tác trên cả máy tính và điện thoại di động (Responsive Design).

---

## 3. Yêu cầu chi tiết hệ thống (System Features)

### 3.1. Phân hệ Quản lý Chủ đề (Topic Selection)
- **Mã yêu cầu**: FR-TOPIC
- **Mô tả**: Người dùng có thể xem danh sách chủ đề học tập có sẵn trong hệ thống và chọn chủ đề mong muốn để áp dụng cho các bài học và trò chơi tiếp theo.

### 3.2. Phân hệ Học Từ Vựng qua Flashcard (Flashcard Study)
- **Mã yêu cầu**: FR-VOCAB
- **Mô tả**: Hiển thị flashcard hai mặt, hỗ trợ phát âm chuẩn từ tiếng Anh, hiển thị ví dụ ngữ cảnh để người dùng tiếp thu từ vựng tự nhiên.

### 3.3. Phân hệ Game Sắp Xếp Câu (Sentence Builder Game)
- **Mã yêu cầu**: FR-GAME-SENTENCE
- **Mô tả**: Cung cấp giao diện tương tác (kéo/thả hoặc click chọn) để sắp xếp các từ đơn lẻ thành một câu tiếng Anh đúng ngữ pháp.

### 3.4. Phân hệ Game Gõ Từ Tiếng Anh theo Nghĩa Tiếng Việt (English Typing Game)
- **Mã yêu cầu**: FR-GAME-TYPING-EN
- **Mô tả**: Cho nghĩa tiếng Việt, người dùng gõ từ tiếng Anh tương ứng. Hệ thống hỗ trợ hiển thị gợi ý ký tự ẩn để người dùng dễ tư duy.

### 3.5. Phân hệ Game Gõ Nghĩa Tiếng Việt theo Từ Tiếng Anh (Vietnamese Typing Game)
- **Mã yêu cầu**: FR-GAME-TYPING-VI
- **Mô tả**: Cho từ tiếng Anh (và âm thanh phát âm), người dùng gõ nghĩa tiếng Việt tương ứng.

---

## 4. Các yêu cầu phi chức năng (Non-Functional Requirements)

### 4.1. Hiệu năng (Performance)
- Thời gian tải trang ban đầu dưới 2 giây trên kết nối mạng thông thường.
- Thời gian phản hồi kiểm tra đáp án game gần như tức thì (< 200ms).

### 4.2. Tính dễ sử dụng (Usability)
- Giao diện đáp ứng (Responsive Layout) hoạt động mượt mà trên Mobile, Tablet và Desktop.
- Thao tác kéo thả và bấm nút trực quan, các nút tương tác trên mobile có kích thước tối thiểu 44x44px.

### 4.3. Độ tin cậy & Bảo mật (Reliability & Security)
- Dữ liệu tiến trình học tập của người dùng được tự động lưu trữ định kỳ.
- Sử dụng HTTPS cho mọi giao tiếp mạng.
