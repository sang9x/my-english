# Project Rules: MyEnglish

Tài liệu này định nghĩa các quy tắc hoạt động bắt buộc cho tất cả các AI coding agents khi làm việc trên dự án MyEnglish.

---

## 1. Quy Trình Phát Triển Tính Năng Bắt Buộc

Mọi yêu cầu thêm mới tính năng, cập nhật chức năng, hoặc thay đổi nghiệp vụ hệ thống từ phía người dùng đều phải kích hoạt và tuân thủ nghiêm ngặt **Quy Trình Phát Triển Tính Năng Mới** định nghĩa tại [feature_delivery SKILL.md](file:///d:/my-project/my-english/.agents/skills/feature_delivery/SKILL.md).

**Tuyệt đối không bỏ qua các bước sau:**
1. Cập nhật đặc tả yêu cầu trong [SRS.md](file:///d:/my-project/my-english/docs/SRS.md).
2. Viết chi tiết luồng tương tác và kịch bản trong [UC_Detailed.md](file:///d:/my-project/my-english/docs/UC_Detailed.md).
3. Triển khai mã nguồn hoàn chỉnh (Production-ready).
4. Viết các bộ kiểm thử tự động (Unit Test / Integration Test).
5. Thực thi kiểm thử bằng lệnh terminal và sửa toàn bộ lỗi (nếu có) trước khi hoàn thành công việc.
6. Thực hiện commit, push code lên Git và theo dõi quá trình deploy tự động hoàn tất.

---

## 2. Tiêu Chuẩn Chất Lượng Mã Nguồn & Testing

* **Kiểm thử tự động**: 100% các API mới và các logic game cốt lõi phải được bao phủ bởi các bài test tự động.
* **Responsive & UI Premium**: Code giao diện phải tuân thủ hướng dẫn Web Application Development, không sử dụng giao diện mặc định sơ sài, tối thiểu kích thước click target 44x44px trên Mobile.
* **Nguyên tắc Documentation**: Giữ nguyên mọi comment và docstrings không liên quan đến thay đổi. Cập nhật sơ đồ kiến trúc nếu có thay đổi về database schema hay luồng dữ liệu chính.
