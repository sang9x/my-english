# Software Requirements Specification (SRS)
## Dự án: Web App Học Từ Vựng và Sắp Xếp Câu Tiếng Anh (MyEnglish)

---

## 1. Giới thiệu (Introduction)

### 1.1. Mục đích (Purpose)
Tài liệu này đặc tả toàn bộ yêu cầu phần mềm cho dự án **MyEnglish** - một ứng dụng web tương tác giúp người dùng học từ vựng tiếng Anh theo chủ đề, luyện tập kỹ năng nhớ nghĩa từ qua game gõ từ, và rèn luyện phản xạ ngữ pháp qua game sắp xếp câu.

### 1.2. Phạm vi hệ thống (Scope)
Hệ thống là một ứng dụng Web (Next.js App Router, SSR + API Routes) cung cấp các chức năng học tập từ vựng, kiểm tra qua game gõ từ 2 chiều (Anh-Việt, Việt-Anh), sắp xếp câu và thống kê kết quả học tập cá nhân. Ngoài ra, hệ thống cho phép người dùng **tự quản lý kho từ vựng** bằng cách tạo chủ đề tùy chỉnh, nhập từ thủ công hoặc tự động tra cứu từ qua Cambridge Dictionary API, đồng thời chia sẻ chủ đề qua link cho người dùng khác. Dữ liệu chủ đề tùy chỉnh được lưu trữ trên server (SQLite thông qua Next.js API Routes).

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
7. **Quản lý Chủ đề Tùy chỉnh (Custom Topic Management)**: Cho phép người dùng tạo chủ đề mới, nhập từ vựng thủ công (từng từ hoặc bulk text), tự động tra cứu và nạp từ từ Cambridge Dictionary API, chỉnh sửa/xóa từ, và chia sẻ chủ đề qua link.

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

### 3.6. Phân hệ Quản lý Chủ đề Tùy chỉnh (Custom Topic Management)
- **Mã yêu cầu**: FR-TOPIC-CUSTOM
- **Mô tả tổng quan**: Cho phép người dùng tự quản lý kho từ vựng cá nhân bằng cách tạo mới, chỉnh sửa và chia sẻ các chủ đề tùy chỉnh.

#### FR-TOPIC-CUSTOM-01: Tạo chủ đề mới
- Người dùng nhập tên chủ đề, mô tả ngắn và chọn icon/emoji đại diện.
- Hệ thống tạo chủ đề mới với trạng thái rỗng (chưa có từ nào).
- Chủ đề được lưu trữ trên server qua Next.js API Routes và SQLite.
- Hệ thống sinh ra một `shareCode` duy nhất để chia sẻ.

#### FR-TOPIC-CUSTOM-02: Nhập từ vựng thủ công
- **Nhập từng từ**: Form điền đầy đủ thông tin: từ tiếng Anh, nghĩa tiếng Việt (nhiều nghĩa cách nhau bằng dấu phẩy), IPA, câu ví dụ tiếng Anh, nghĩa câu ví dụ tiếng Việt. Sau khi lưu, từ xuất hiện ngay trong danh sách từ của chủ đề.
- **Nhập bulk (hàng loạt)**: Người dùng dán văn bản vào textarea theo định dạng mỗi dòng một từ: `từ_tiếng_anh | nghĩa_tiếng_việt | ipa (tùy chọn)`. Hệ thống phân tích cú pháp và hiển thị preview trước khi xác nhận lưu.

#### FR-TOPIC-CUSTOM-03: Tra cứu và nạp từ tự động (Auto-Import)
- Người dùng nhập một hoặc nhiều từ tiếng Anh (cách nhau bằng dấu phẩy hoặc xuống dòng).
- Hệ thống gọi Next.js API Route (`/api/lookup`), API Route này gọi tiếp tới `https://api.dictionaryapi.dev/api/v2/entries/en/{word}` để lấy dữ liệu.
- Dữ liệu trả về bao gồm: phiên âm IPA, định nghĩa tiếng Anh, ví dụ câu (nếu có).
- Do API không trả về nghĩa tiếng Việt, hệ thống hiển thị định nghĩa tiếng Anh và yêu cầu người dùng điền thêm nghĩa tiếng Việt trước khi lưu (hoặc cho phép bỏ qua và để trống).
- Hệ thống hiển thị preview kết quả tra cứu để người dùng xem xét và xác nhận trước khi thêm vào chủ đề.
- Xử lý lỗi: Nếu từ không tìm thấy trên API, thông báo rõ ràng và cho phép nhập thủ công.

#### FR-TOPIC-CUSTOM-04: Quản lý từ trong chủ đề
- Danh sách từ vựng trong chủ đề hiển thị dạng bảng với các thao tác: Chỉnh sửa (sửa nghĩa, IPA, ví dụ), Xóa từ.
- Sắp xếp danh sách theo thứ tự thêm vào hoặc theo bảng chữ cái.

#### FR-TOPIC-CUSTOM-05: Chia sẻ chủ đề
- Mỗi chủ đề tùy chỉnh có một `shareCode` (ví dụ: `ABC123`).
- Người dùng khác truy cập link `/share/[shareCode]` để xem và sao chép (clone) chủ đề về tài khoản của mình.
- Chủ đề được clone là bản sao độc lập, người nhận có thể chỉnh sửa mà không ảnh hưởng bản gốc.

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

### 4.4. Tích hợp API ngoài (External API Integration)
- API Route `/api/lookup` đóng vai trò proxy để gọi `api.dictionaryapi.dev`, tránh lộ nguồn và xử lý CORS.
- Timeout tối đa cho mỗi lần gọi API ngoài là 5 giây; nếu quá thời gian, hiển thị thông báo lỗi rõ ràng.
- Dữ liệu trả về từ API ngoài không được lưu cache phía server quá 24 giờ (để đảm bảo cập nhật).

### 4.5. Lưu trữ dữ liệu (Data Persistence)
- Chủ đề tùy chỉnh và từ vựng do người dùng tạo được lưu trong SQLite thông qua Next.js API Routes (file `data/custom.db`).
- Tiến trình học tập (flashcard status, điểm game, streak) được lưu trong localStorage phía client.
- Khi clone chủ đề qua `shareCode`, dữ liệu được sao chép hoàn toàn và lưu như chủ đề mới độc lập.
