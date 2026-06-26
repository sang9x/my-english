---
name: feature_delivery
description: Quy trình 6 bước để phát triển tính năng mới bao gồm cập nhật SRS, thiết kế UC, viết mã nguồn, viết test case, chạy kiểm thử tự động, và deploy/push code lên Git.
---

# Quy Trình Phát Triển Tính Năng Mới (Feature Delivery Workflow)

Quy trình này hướng dẫn Agent tự động thực hiện đầy đủ các bước khi có yêu cầu thêm tính năng mới hoặc thay đổi lớn trong dự án MyEnglish.

---

## 6 Bước Quy Trình Bắt Buộc (Must-Follow Steps)

Khi nhận được yêu cầu phát triển tính năng hoặc chỉnh sửa nghiệp vụ:

### Bước 1: Cập nhật tài liệu SRS (Software Requirements Specification)
*   Mở và chỉnh sửa file [SRS.md](file:///d:/my-project/my-english/docs/SRS.md).
*   Bổ sung mã yêu cầu chức năng mới (ví dụ: `FR-NEWFEATURE`) và mô tả chi tiết của tính năng đó vào mục **3. Yêu cầu chi tiết hệ thống**.
*   Bổ sung các yêu cầu phi chức năng (nếu có) vào mục **4. Các yêu cầu phi chức năng**.

### Bước 2: Cập nhật hoặc viết mới Use Cases chi tiết (UC)
*   Mở và cập nhật file [UC_Detailed.md](file:///d:/my-project/my-english/docs/UC_Detailed.md) hoặc tạo file UC mới nếu là phân hệ độc lập lớn.
*   Thiết kế Use Case chuẩn hóa bao gồm:
    *   Tác nhân (Actor).
    *   Tiền điều kiện (Preconditions) và Hậu điều kiện (Postconditions).
    *   Luồng sự kiện chính (Basic Flow) chi tiết từng bước tương tác giữa người dùng và hệ thống.
    *   Luồng thay thế (Alternative Flow) như xử lý lỗi, nút bấm phụ, hoặc phím tắt.

### Bước 3: Phát triển mã nguồn (Implementation Code)
*   Tiến hành code giao diện (Frontend Next.js/React) hoặc logic xử lý (Backend API) tương ứng.
*   Đảm bảo tuân thủ thiết kế UX/UI premium, Responsive Design, và các tiêu chuẩn coding (TypeScript, Component tái sử dụng).

### Bước 4: Viết các bài kiểm thử tự động (Test Automation)
*   Viết Unit Test hoặc Integration Test cho component/API vừa tạo (ví dụ sử dụng Jest, React Testing Library, hoặc Vitest).
*   Đảm bảo kiểm thử ít nhất:
    *   Luồng chính thành công (Happy Path).
    *   Các luồng lỗi/ngoại lệ (Edge Cases & Error Handling).

### Bước 5: Chạy kiểm thử tự động (Execution & Verification)
*   Chạy lệnh test (ví dụ: `npm run test` hoặc `vitest run`).
*   Đọc logs kết quả chạy test. Nếu có lỗi (failed), phải tiến hành sửa code và chạy lại test cho đến khi 100% test pass.

### Bước 6: Commit, Push & Deploy
*   Tiến hành đóng gói các thay đổi bằng Git.
*   Sử dụng skill `push_and_merge` để push code từ nhánh tính năng hiện tại lên repository và thực hiện merge về nhánh chính (ví dụ `master`/`main`).
*   Theo dõi và xác nhận quá trình build/deploy tự động (trên Vercel, Netlify hoặc GitHub Actions) hoàn thành tốt đẹp không lỗi.
*   Tạo/cập nhật file [walkthrough.md](file:///C:/Users/sangt/.gemini/antigravity/brain/f631dcb3-4714-45a0-a5ee-0fe527bb3abb/walkthrough.md) để báo cáo kết quả bao gồm link live demo và kết thúc.

