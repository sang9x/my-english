# Detailed Use Cases (Đặc tả chi tiết Use Cases)
## Dự án: Web App Học Từ Vựng và Sắp Xếp Câu Tiếng Anh (MyEnglish)

---

## UC01: Chọn Chủ Đề Học (Select Learning Topic)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng duyệt qua các chủ đề từ vựng có sẵn và chọn một chủ đề để hệ thống áp dụng cho các hoạt động tiếp theo (học flashcard hoặc chơi game).
* **Tiền điều kiện (Preconditions)**: Người dùng đã truy cập vào trang chủ hoặc trang chọn chủ đề của ứng dụng.
* **Hậu điều kiện (Postconditions)**: Chủ đề được chọn được lưu vào trạng thái phiên làm việc (session state) để lọc từ vựng tương ứng.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng bấm chọn mục "Chọn chủ đề" hoặc nút "Bắt đầu".
  2. Hệ thống hiển thị danh sách các chủ đề (Du lịch, Công việc, Gia đình, TOEIC, v.v.) kèm hình ảnh đại diện và số lượng từ trong mỗi chủ đề.
  3. Người dùng click chọn một chủ đề.
  4. Hệ thống ghi nhận chủ đề được chọn và điều hướng người dùng đến trang lựa chọn chế độ học/chơi (Flashcard, Sắp xếp câu, Gõ từ Anh-Việt, Gõ từ Việt-Anh).
* **Luồng thay thế (Alternative Flow)**:
  * Không có.

---

## UC02: Học Từ Vựng qua Flashcard (Learn Vocabulary via Flashcard)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng học nghĩa, phát âm và ví dụ của từng từ trong chủ đề đã chọn bằng Flashcard tương tác.
* **Tiền điều kiện (Preconditions)**: Người dùng đã thực hiện chọn một chủ đề (UC01).
* **Hậu điều kiện (Postconditions)**: Tiến trình học của các từ đã học được cập nhật.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng chọn chế độ "Học qua Flashcard".
  2. Hệ thống tải danh sách từ vựng thuộc chủ đề đã chọn.
  3. Hệ thống hiển thị Flashcard thứ nhất ở mặt trước: Từ tiếng Anh, phiên âm IPA, nút loa phát âm.
  4. Người dùng bấm vào Flashcard để lật mặt sau: Nghĩa tiếng Việt, ví dụ tiếng Anh kèm nghĩa tiếng Việt, hình ảnh minh họa (nếu có).
  5. Người dùng bấm nút "Phát âm" để nghe phát âm audio chuẩn.
  6. Người dùng chọn một trong hai nút:
     - "Đã thuộc" (Ký hiệu tick xanh): Hệ thống đánh dấu từ này đã thuộc.
     - "Chưa thuộc/Xem lại" (Ký hiệu màu vàng): Hệ thống sẽ hiển thị lại từ này sau.
  7. Hệ thống chuyển sang Flashcard tiếp theo.
  8. Sau khi kết thúc tất cả các từ, hệ thống hiển thị màn hình chúc mừng và lưu tiến độ học tập của người dùng.
* **Luồng thay thế (Alternative Flow)**:
  * *Bước 3-6*: Người dùng có thể bấm phím mũi tên Trái/Phải hoặc phím Space trên bàn phím để lật thẻ và chuyển thẻ (giúp học nhanh trên máy tính).

---

## UC03: Game Sắp Xếp Câu (Sentence Builder Game)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng sắp xếp các từ tiếng Anh bị trộn lẫn thành một câu hoàn chỉnh dựa trên nghĩa tiếng Việt được cung cấp.
* **Tiền điều kiện (Preconditions)**: Đã chọn chủ đề học tập (UC01).
* **Hậu điều kiện (Postconditions)**: Ghi nhận điểm số và lịch sử làm bài vào hệ thống.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng chọn chế độ chơi "Sắp xếp câu".
  2. Hệ thống hiển thị nghĩa tiếng Việt của câu cần dịch và các từ tiếng Anh đơn lẻ nằm xáo trộn ngẫu nhiên dưới dạng các hộp (buttons).
  3. Người dùng lần lượt click (hoặc kéo thả) các từ tiếng Anh lên khu vực kết quả theo đúng thứ tự.
  4. Người dùng click nút "Kiểm tra" (Check).
  5. Hệ thống so sánh chuỗi từ người dùng xếp với câu đáp án chính xác:
     - **Nếu đúng**: Đổi màu nền khu vực kết quả thành xanh lá, phát âm toàn bộ câu và hiện nút "Tiếp theo" (Next). Cộng điểm tích lũy.
     - **Nếu sai**: Đổi màu nền khu vực kết quả thành đỏ, hiển thị câu trả lời đúng và nút "Tiếp theo".
  6. Lặp lại cho đến câu cuối cùng của lượt chơi (thường là 5 hoặc 10 câu).
  7. Hệ thống hiển thị tổng số câu trả lời đúng/sai và điểm nhận được.
* **Luồng thay thế (Alternative Flow)**:
  * *Hủy chọn từ*: Trong khi xếp câu, nếu muốn bỏ một từ đã chọn ở khu vực kết quả, người dùng click vào từ đó. Từ đó sẽ quay trở lại vùng lựa chọn.
  * *Sử dụng trợ giúp*: Người dùng click nút "Gợi ý" (Hint). Hệ thống sẽ tự động điền từ đúng tiếp theo vào câu (người dùng bị trừ 50% điểm câu đó).

---

## UC04: Game Gõ Từ Tiếng Anh theo Nghĩa Tiếng Việt (English Typing Game)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng gõ từ tiếng Anh tương ứng với nghĩa tiếng Việt cho sẵn để kiểm tra trí nhớ từ vựng.
* **Tiền điều kiện (Preconditions)**: Đã chọn chủ đề học tập (UC01).
* **Hậu điều kiện (Postconditions)**: Ghi nhận điểm số của người dùng.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng chọn chế độ chơi "Gõ từ tiếng Anh".
  2. Hệ thống hiển thị nghĩa tiếng Việt của từ (Ví dụ: *"Quả táo"*).
  3. Hệ thống hiển thị ô nhập liệu (Text Input) cùng gợi ý độ dài từ dưới dạng các dấu gạch ngang (Ví dụ: `_ _ _ _ _`).
  4. Người dùng gõ từ tiếng Anh vào ô nhập liệu (Ví dụ: *"apple"*).
  5. Người dùng bấm phím Enter hoặc click nút "Gửi" (Submit).
  6. Hệ thống kiểm tra:
     - **Nếu đúng**: Hiển thị màu xanh lá, phát âm audio của từ đó và tự động chuyển sang từ tiếp theo sau 1 giây.
     - **Nếu sai**: Hiển thị màu đỏ và đáp án đúng, yêu cầu người dùng gõ lại cho đúng trước khi qua từ tiếp theo (hoặc bấm nút "Bỏ qua" để đi tiếp).
  7. Kết thúc vòng chơi, hệ thống hiển thị bảng thống kê kết quả.
* **Luồng thay thế (Alternative Flow)**:
  * *Gợi ý chữ cái đầu*: Người dùng có thể click nút "Xem chữ cái đầu", hệ thống hiển thị chữ cái đầu tiên (Ví dụ: `a _ _ _ _`).

---

## UC05: Game Gõ Nghĩa Tiếng Việt theo Từ Tiếng Anh (Vietnamese Typing Game)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng gõ nghĩa tiếng Việt tương ứng với từ tiếng Anh hiển thị trên màn hình.
* **Tiền điều kiện (Preconditions)**: Đã chọn chủ đề học tập (UC01).
* **Hậu điều kiện (Postconditions)**: Ghi nhận kết quả của người dùng.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng chọn chế độ chơi "Gõ nghĩa tiếng Việt".
  2. Hệ thống hiển thị từ tiếng Anh cùng phát âm âm thanh tự động (Ví dụ hiển thị: *"Beautiful"*).
  3. Người dùng gõ nghĩa tiếng Việt vào ô nhập liệu (Ví dụ gõ: *"đẹp"* hoặc *"xinh đẹp"*).
  4. Người dùng bấm phím Enter hoặc nút "Gửi".
  5. Hệ thống so sánh với danh sách các nghĩa tiếng Việt được chấp nhận trong CSDL:
     - **Nếu trùng khớp**: Báo đúng (màu xanh), cộng điểm.
     - **Nếu không trùng**: Báo sai (màu đỏ) và hiển thị các nghĩa tiếng Việt đúng.
  6. Lặp lại cho đến từ cuối cùng.
  7. Hiển thị báo cáo kết quả.
