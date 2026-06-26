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

---

## UC07: Tạo và Quản lý Chủ Đề Tùy Chỉnh (Create & Manage Custom Topic)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng tạo chủ đề từ vựng của riêng mình, đặt tên, chọn emoji đại diện và quản lý danh sách từ (xem, sửa, xóa).
* **Tiền điều kiện (Preconditions)**: Người dùng đang ở trang chủ hoặc trang quản lý chủ đề.
* **Hậu điều kiện (Postconditions)**: Chủ đề mới được lưu trên server (SQLite) và hiển thị cùng các chủ đề hệ thống. Một `shareCode` duy nhất được sinh ra.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng click nút **"+ Tạo chủ đề mới"** trên trang chủ.
  2. Hệ thống hiển thị form tạo chủ đề: Tên chủ đề (bắt buộc), Mô tả ngắn (tùy chọn), Emoji đại diện (picker).
  3. Người dùng điền thông tin và click **"Tạo"**.
  4. Hệ thống gọi `POST /api/topics` để lưu chủ đề mới vào SQLite, sinh `shareCode` ngẫu nhiên 6 ký tự (alphanumeric).
  5. Hệ thống điều hướng người dùng vào trang quản lý chủ đề: `/my-topics/[topicId]`.
  6. Trang quản lý hiển thị: danh sách từ vựng hiện có (dạng bảng), các nút "Thêm từ", "Nhập hàng loạt", "Auto-Import", nút chia sẻ.
  7. Người dùng có thể click nút **Sửa** (✏️) bên cạnh từng từ để chỉnh sửa inline.
  8. Người dùng có thể click nút **Xóa** (🗑️) bên cạnh từng từ, hệ thống hiển thị confirm dialog trước khi xóa.
* **Luồng thay thế (Alternative Flow)**:
  * *Xóa chủ đề*: Người dùng click nút "Xóa chủ đề" ở góc trang, hệ thống yêu cầu nhập lại tên chủ đề để xác nhận, sau đó gọi `DELETE /api/topics/[id]`.
  * *Sắp xếp danh sách*: Người dùng click tiêu đề cột "Từ tiếng Anh" hoặc "Ngày thêm" để đổi thứ tự sắp xếp.
  * *Chia sẻ chủ đề*: Người dùng click nút **"Chia sẻ"**, hệ thống hiển thị modal với link `https://app.com/share/[shareCode]` và nút Copy.

---

## UC08: Nhập Từ Vựng Thủ Công (Manual Vocabulary Import)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng thêm từ mới vào chủ đề tùy chỉnh theo 2 cách: nhập từng từ qua form chi tiết, hoặc nhập hàng loạt qua textarea.
* **Tiền điều kiện (Preconditions)**: Người dùng đang ở trang quản lý chủ đề tùy chỉnh (UC07 đã hoàn thành).
* **Hậu điều kiện (Postconditions)**: Các từ mới được lưu vào SQLite và hiển thị trong danh sách.
* **Luồng sự kiện chính — Cách 1: Nhập từng từ (Single Word Form)**:
  1. Người dùng click **"+ Thêm từ"**.
  2. Hệ thống hiển thị form với các trường: Từ tiếng Anh (*), Nghĩa tiếng Việt — nhiều nghĩa cách nhau dấu phẩy (*), Phiên âm IPA (tùy chọn), Câu ví dụ tiếng Anh (tùy chọn), Nghĩa câu ví dụ tiếng Việt (tùy chọn).
  3. Người dùng điền thông tin và click **"Lưu từ"**.
  4. Hệ thống gọi `POST /api/topics/[id]/words` để lưu từ.
  5. Hệ thống hiển thị thông báo thành công và form reset để nhập từ tiếp theo (nếu muốn).
* **Luồng sự kiện chính — Cách 2: Nhập hàng loạt (Bulk Import)**:
  1. Người dùng click **"Nhập hàng loạt"**.
  2. Hệ thống hiển thị textarea với hướng dẫn định dạng: `từ_tiếng_anh | nghĩa_tiếng_việt | ipa_tùy_chọn` (mỗi dòng một từ). Có ô ví dụ mẫu.
  3. Người dùng dán/gõ danh sách từ vào textarea.
  4. Người dùng click **"Xem trước"**. Hệ thống phân tích cú pháp và hiển thị bảng preview với cột: từ tiếng Anh, nghĩa tiếng Việt, IPA, trạng thái (hợp lệ ✅ / lỗi cú pháp ❌).
  5. Người dùng xem xét preview, có thể quay lại sửa nếu có dòng lỗi.
  6. Người dùng click **"Xác nhận nhập"**. Hệ thống lưu hàng loạt qua `POST /api/topics/[id]/words/bulk`.
  7. Hệ thống hiển thị kết quả: "Đã thêm X từ thành công".
* **Luồng thay thế (Alternative Flow)**:
  * *Trùng lặp từ*: Nếu từ tiếng Anh đã tồn tại trong chủ đề, hệ thống đánh dấu ⚠️ trong preview và hỏi người dùng có muốn ghi đè không.

---

## UC09: Tra Cứu và Nạp Từ Tự Động từ Cambridge Dictionary (Auto-Import)

* **Tác nhân (Actor)**: Người học (User).
* **Mô tả**: Người dùng nhập danh sách từ tiếng Anh, hệ thống tự động tra cứu thông tin (IPA, định nghĩa, ví dụ) qua Cambridge Dictionary API và cho phép người dùng bổ sung nghĩa tiếng Việt trước khi lưu.
* **Tiền điều kiện (Preconditions)**: Người dùng đang ở trang quản lý chủ đề tùy chỉnh. Có kết nối Internet.
* **Hậu điều kiện (Postconditions)**: Các từ được chọn (kèm nghĩa tiếng Việt đã bổ sung) được lưu vào chủ đề.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng click **"Auto-Import từ Dictionary"**.
  2. Hệ thống hiển thị textarea hướng dẫn nhập danh sách từ tiếng Anh (cách nhau bằng dấu phẩy hoặc xuống dòng). Ví dụ: `apple, beautiful, technology`.
  3. Người dùng nhập danh sách từ và click **"Tra cứu"**.
  4. Hệ thống hiển thị trạng thái loading ("Đang tra cứu X từ...") và lần lượt gọi `GET /api/lookup?word={word}` cho từng từ.
  5. `GET /api/lookup` đóng vai trò proxy: server gọi `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`, trích xuất IPA, định nghĩa tiếng Anh, câu ví dụ rồi trả về cho client.
  6. Sau khi tra cứu xong, hệ thống hiển thị bảng kết quả preview với các cột:
     - Từ tiếng Anh
     - IPA (tự động điền)
     - Định nghĩa tiếng Anh (tự động điền, có thể sửa)
     - **Nghĩa tiếng Việt** (ô input rỗng — người dùng tự điền, bắt buộc)
     - Câu ví dụ (tự động điền nếu có)
     - Trạng thái: ✅ Tìm thấy / ❌ Không tìm thấy
  7. Người dùng điền nghĩa tiếng Việt vào từng dòng, có thể bỏ tích (uncheck) các từ không muốn thêm.
  8. Người dùng click **"Thêm X từ đã chọn"**. Hệ thống gọi `POST /api/topics/[id]/words/bulk` với các từ được chọn.
  9. Hệ thống hiển thị thông báo thành công và cập nhật danh sách.
* **Luồng thay thế (Alternative Flow)**:
  * *Bước 5 — Từ không tìm thấy*: Nếu API trả về lỗi 404 cho một từ, dòng đó được đánh dấu ❌ "Không tìm thấy". Người dùng vẫn có thể nhập tay các thông tin còn thiếu và chọn để lưu.
  * *Bước 4 — Timeout*: Nếu request quá 5 giây, hiển thị thông báo lỗi và cho phép thử lại từng từ.
  * *Bước 6 — Bỏ qua nghĩa tiếng Việt*: Người dùng có thể để trống trường nghĩa tiếng Việt và vẫn lưu; hệ thống cảnh báo nhưng không chặn.

---

## UC10: Xem và Clone Chủ Đề Được Chia Sẻ (View & Clone Shared Topic)

* **Tác nhân (Actor)**: Người học (User) — người nhận link chia sẻ.
* **Mô tả**: Người dùng truy cập link chia sẻ của chủ đề từ vựng do người khác tạo, xem trước danh sách từ và có thể clone về thư viện cá nhân.
* **Tiền điều kiện (Preconditions)**: Người dùng có link dạng `/share/[shareCode]`.
* **Hậu điều kiện (Postconditions)**: Nếu người dùng clone, một bản sao chủ đề được tạo mới độc lập trong hệ thống.
* **Luồng sự kiện chính (Basic Flow)**:
  1. Người dùng truy cập URL `/share/[shareCode]`.
  2. Hệ thống gọi `GET /api/share/[shareCode]` để lấy thông tin chủ đề.
  3. Hệ thống hiển thị trang preview: tên chủ đề, emoji, mô tả, số lượng từ, danh sách từ (chỉ đọc — hiển thị từ tiếng Anh, IPA, nghĩa tiếng Việt).
  4. Người dùng click **"Clone chủ đề này về thư viện của tôi"**.
  5. Hệ thống gọi `POST /api/share/[shareCode]/clone`, tạo bản sao chủ đề với tất cả từ vựng, gán `shareCode` mới.
  6. Hệ thống điều hướng người dùng đến trang quản lý chủ đề vừa được clone (`/my-topics/[newTopicId]`).
* **Luồng thay thế (Alternative Flow)**:
  * *shareCode không tồn tại*: Hệ thống hiển thị trang lỗi 404 với thông báo "Chủ đề không tồn tại hoặc đã bị xóa".
  * *Sử dụng trực tiếp không clone*: Người dùng có thể bắt đầu học ngay từ trang preview mà không cần clone (dùng chủ đề ở chế độ read-only).
