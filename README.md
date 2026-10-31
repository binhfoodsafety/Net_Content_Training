# Net Content Training

Khoá học **Quản lý khối lượng tịnh (Net Content Management)** bằng tiếng Việt, dành cho nhà máy thực phẩm và đồ uống. Slide là HTML tĩnh, có **thuyết minh giọng đọc tiếng Việt** khi trình chiếu.

Xem trực tuyến: <https://binhfoodsafety.github.io/Net_Content_Training/>

## Nội dung

| # | Module | Slide |
|---|---|---|
| 1 | Tổng quan & 5 điểm kiểm soát | 11 |
| 2 | Yêu cầu pháp luật & lấy mẫu | 14 |
| 3 | Thiết lập khối lượng mục tiêu | 19 |
| 4 | Thiết bị cân | 15 |
| 5 | Quản lý bì | 13 |
| 6 | Giám sát chiết rót & SPC | 17 |
| 7 | Xuất xưởng lô | 16 |
| 8 | Hệ thống, vai trò & cải tiến | 14 |

Trang chủ `index.html` có droplist chọn module và khung xem slide. Mỗi module cũng mở được riêng: `slides/0x-....html`.

## Ôn tập

`on-tap.html` có flashcard và quiz tự luyện cho từng module, hoặc trộn tất cả. Mở thẳng một module bằng `on-tap.html#m3` (flashcard) hoặc `on-tap.html#m3-quiz` (quiz). Thẻ và câu hỏi nằm trong `study/data.js`. Tiến độ chỉ lưu trên trình duyệt của người học.

## Cài như ứng dụng

Trên iPhone: mở trang bằng Safari, Chia sẻ → Thêm vào MH chính. Android, máy tính: dùng lệnh cài của trình duyệt. `sw.js` lưu sẵn khoá học để dùng khi không có mạng; thêm file mới thì bổ sung vào danh sách `FILES` và tăng số phiên bản `CACHE`.

## Trình chiếu

- `←` `→` / nút Trước – Tiếp, `F` toàn màn hình, `P` phát/tạm dừng thuyết minh; vuốt trên điện thoại.
- Màn hình hẹp (< 640 px) tự chuyển sang dạng cuộn để đọc.
- Thuyết minh dùng Google Translate TTS, cần Internet; lời đọc được gửi tới Google.
- Lời đọc mặc định lấy từ chữ trên slide. Slide nào cần lời đọc riêng thì thêm `<div class="say">…</div>` trong `<section class="slide">`.

## Cấu trúc

```
index.html          trang chủ: droplist + khung xem
on-tap.html         flashcard và quiz
study/              dữ liệu, giao diện và mã của trang ôn tập
slides/deck.css     giao diện slide (16:9, sáng/tối, in, màu theo module)
slides/deck.js      điều hướng, tự co chữ, thuyết minh TTS
slides/art/*.svg    hình minh hoạ tự vẽ
slides/0x-*.html    8 module
```

## Xuất bản

GitHub → **Settings → Pages** → Deploy from a branch → `main` / `(root)`.

## Lưu ý

Nội dung mang tính đào tạo chung; số liệu trong ví dụ chỉ để minh hoạ. Khi áp dụng phải đối chiếu văn bản pháp luật đang có hiệu lực của từng thị trường bán hàng (tham khảo công khai: Chỉ thị 76/211/EEC, OIML R 87, OIML R 51, NIST Handbook 133, WELMEC 6.4).
