// Dữ liệu ôn tập theo module.
// cards: { q: mặt trước, a: mặt sau }
// quiz:  { q: câu hỏi, c: đáp án đúng, w: 3 đáp án sai, why: giải thích, s: số slide trong module }
var STUDY = [
  {
    cards: [
      { q: 'E', a: 'Lượng công bố trên nhãn (declared net content).' },
      { q: 'M', a: 'Khối lượng mục tiêu của lô (target net content).' },
      { q: 'M0', a: 'Trung bình thực tế của lô.' },
      { q: 'Sp', a: 'Độ lệch chuẩn thực tế của lô.' },
      { q: 'Sref', a: 'Độ lệch chuẩn tham chiếu dùng để tính M, lấy từ dữ liệu lịch sử.' },
      { q: 'Sm', a: 'Biến thiên của riêng máy với sản phẩm.' },
      { q: 'TNE', a: 'Sai số âm cho phép (Tolerable Negative Error).' },
      { q: 'TU1 và TU2', a: 'Giới hạn dưới mức 1 (E − TNE) và mức 2 (E − 2 × TNE).' },
      { q: 'Hai mục tiêu phải đạt cùng lúc', a: 'Tuân thủ đầy đủ và giảm thất thoát.' },
      { q: 'Rót dư có kế hoạch', a: 'Phần tối thiểu để bù biến thiên, đưa vào định mức. Giảm biến thiên thì giảm được.' },
      { q: 'Rót dư ngoài kế hoạch', a: 'Phần vượt mục tiêu, lẽ ra phải tiến về 0.' },
      { q: '5 điểm kiểm soát CP1 đến CP5', a: 'Khối lượng mục tiêu, thiết bị cân, bì, giám sát chiết rót, xuất xưởng lô.' }
    ],
    quiz: [
      { q: 'Khi hàng xuất khẩu, luật nào quyết định yêu cầu về lượng?', c: 'Luật của nước bán hàng', w: ['Luật của nước sản xuất', 'Quy định nội bộ của nhà máy', 'Yêu cầu của nhà cung cấp bao bì'], why: 'Tuân thủ không thể thương lượng, và luật áp dụng là luật của nước bán hàng.', s: 3 },
      { q: 'Vì sao rót dư "cho chắc" không phải là chiến lược tuân thủ?', c: 'Nó che giấu biến thiên của quy trình và tốn tiền', w: ['Nó luôn làm lô bị bác khi thanh tra', 'Luật cấm mọi đơn vị trên E', 'Nó làm tăng độ chụm của cân'], why: 'Rót dư để "cho chắc" che giấu biến thiên của quy trình và là chi phí không chất lượng.', s: 4 },
      { q: 'Tổng rót dư gồm những phần nào?', c: 'Có kế hoạch và ngoài kế hoạch', w: ['Bì và net', 'Rót dư và hàng loại', 'Trung bình và biến thiên'], why: 'Tổng rót dư = có kế hoạch + ngoài kế hoạch. Cả hai đều là chi phí không chất lượng.', s: 5 },
      { q: 'Yếu tố nào tạo ra rót dư NGOÀI kế hoạch?', c: 'Giám sát chuyền (SPC) và kiểm soát bì chưa tốt', w: ['Yêu cầu pháp luật', 'Biến thiên của bao bì', 'Biến thiên của sản phẩm'], why: 'Pháp luật và các biến thiên thuộc phần có kế hoạch; giám sát chuyền, kiểm soát cân, bì và vận hành thuộc phần ngoài kế hoạch.', s: 6 },
      { q: 'Có nên so sánh rót dư có kế hoạch giữa hai nhà máy khác luật không?', c: 'Không, chỉ so sánh được năng lực chiết rót', w: ['Có, đó là KPI chính', 'Có, nếu cùng cỡ bao gói', 'Không, vì rót dư có kế hoạch luôn bằng 0'], why: 'Luật khác nhau cho mục tiêu khác nhau, nên chỉ so sánh được năng lực chiết rót.', s: 6 },
      { q: 'Cùng E = 200 g, S = 5 g, thị trường A có M = 200,67 g, thị trường B có M = 209,3 g. Nguyên nhân chênh lệch?', c: 'Khác yêu cầu pháp luật về đơn vị dưới TU1', w: ['Khác máy chiết rót giữa hai thị trường', 'Khác hệ thống cân tại hai thị trường', 'Khác loại bao bì dùng cho hai thị trường'], why: 'Thị trường A chấp nhận một tỷ lệ nhỏ dưới TU1; thị trường B không chấp nhận đơn vị nào.', s: 7 },
      { q: 'Điểm kiểm soát CP3 là gì?', c: 'Bì', w: ['Khối lượng mục tiêu', 'Thiết bị cân', 'Xuất xưởng lô'], why: 'CP1 mục tiêu, CP2 cân, CP3 bì, CP4 giám sát chiết rót, CP5 xuất xưởng.', s: 8 },
      { q: 'Yêu cầu cốt lõi của CP5 là gì?', c: 'Quyết định dựa trên dữ liệu trong quá trình, gồm cả hồ sơ bì và kiểm tra cân', w: ['Mọi đơn vị phải trên E', 'Có M cho mọi tổ hợp sản phẩm, chuyền, luật', 'Thiết bị cân phải phù hợp và chính xác'], why: 'CP5 là xuất xưởng lô, dựa trên dữ liệu trong quá trình.', s: 8 },
      { q: 'Bù thêm bằng tay hoặc tái chế trên chuyền ảnh hưởng thế nào đến an toàn?', c: 'Tăng tiếp xúc với sản phẩm và rủi ro nhiễm', w: ['Giảm rủi ro nhiễm', 'Không ảnh hưởng gì', 'Chỉ ảnh hưởng đến nhãn'], why: 'Thao tác thêm trên chuyền làm tăng tiếp xúc với sản phẩm.', s: 3 },
      { q: 'Chi phí nào được tính vào chi phí chất lượng?', c: 'Nhân công cân, ghi chép, kiểm tra', w: ['Chỉ nguyên liệu rót dư', 'Chỉ hàng bị loại', 'Không có chi phí nào'], why: 'Rót dư và hàng loại là chi phí không chất lượng; nhân công cân, ghi chép, kiểm tra là chi phí chất lượng.', s: 3 },
      { q: 'Sau bước xuất xưởng trong chu trình quản lý là gì?', c: 'Rà soát và cải tiến: cập nhật M, giảm biến thiên', w: ['Tính lại TNE', 'Đổi bao bì', 'Thanh tra của cơ quan quản lý'], why: 'Chu trình: thiết lập mục tiêu, sản xuất và giám sát, xuất xưởng, rà soát và cải tiến.', s: 9 },
      { q: 'TU2 được tính thế nào?', c: 'E − 2 × TNE', w: ['E − TNE', 'E + 2 × TNE', 'M − 2 × Sref'], why: 'TU1 = E − TNE và TU2 = E − 2 × TNE.', s: 10 }
    ]
  },
  {
    cards: [
      { q: 'Bốn dạng yêu cầu chung của luật về lượng', a: 'Trung bình lô; tỷ lệ tối đa dưới giới hạn; không đơn vị nào dưới giới hạn tuyệt đối; tỷ lệ tối thiểu trên E.' },
      { q: 'Ba yêu cầu của khung EU', a: 'Trung bình không nhỏ hơn lượng danh nghĩa; tỷ lệ dưới TU1 đủ nhỏ; không đơn vị nào dưới TU2.' },
      { q: 'Công thức TU1, TU2', a: 'TU1 = E − TNE; TU2 = E − 2 × TNE.' },
      { q: 'TNE khi E = 100 g', a: '4,5 g, nên TU1 = 95,5 g và TU2 = 91 g.' },
      { q: 'TNE khi E = 500 g', a: '15 g, nên TU1 = 485 g và TU2 = 470 g.' },
      { q: 'Tên gọi của dung sai trong NIST HB 133', a: 'Maximum Allowable Variation (MAV).' },
      { q: 'Kế hoạch lấy mẫu một bước', a: 'Lấy n1 đơn vị, đếm đơn vị dưới TU1. Lỗi ≤ a1: chấp nhận; lớn hơn: bác lô.' },
      { q: 'Kế hoạch lấy mẫu hai bước', a: 'Lỗi ≤ a1: chấp nhận; lỗi ≥ r1: bác. Ở giữa thì lấy thêm n2; tổng lỗi ≤ a2: chấp nhận.' },
      { q: 'Rủi ro nhà sản xuất', a: 'Xác suất một lô thực ra đạt nhưng vẫn bị bác khi thanh tra. Khuyến nghị cố định ở 1%.' },
      { q: 'Hiệu chỉnh mẫu (sampling allowance)', a: 'M0 + k(n) × Sp ≥ E, với k(n) = T.INV(0,975; n) / √n.' },
      { q: 'Giới hạn trên TO1 dùng để làm gì?', a: 'Giới hạn tỷ lệ trên TO1, tránh gian lận về độ đầy hoặc liều dùng.' },
      { q: 'Khi không có luật riêng', a: 'Tham chiếu thực hành của cơ quan quản lý địa phương, rồi đến khung luật khu vực hoặc OIML R 87.' }
    ],
    quiz: [
      { q: 'Muốn tuân thủ một bộ luật về lượng, lô hàng phải đạt bao nhiêu yêu cầu?', c: 'Tất cả các yêu cầu cùng lúc', w: ['Chỉ yêu cầu về trung bình', 'Yêu cầu chặt nhất', 'Ít nhất một nửa số yêu cầu'], why: 'Mỗi bộ luật là tập hợp nhiều yêu cầu, phải đạt tất cả cùng lúc.', s: 2 },
      { q: 'Yêu cầu "dưới TU2" bảo vệ người tiêu dùng thế nào?', c: 'Không ai nhận gói thiếu quá nhiều', w: ['Tính trung bình người mua nhận đủ E', 'Không thường xuyên nhận gói thiếu', 'Không ai nhận gói thừa'], why: 'Trung bình bảo vệ theo trung bình; TU1 chống thường xuyên thiếu; TU2 chống thiếu quá nhiều.', s: 5 },
      { q: 'Với E = 250 g, TNE, TU1, TU2 là bao nhiêu?', c: 'TNE 9 g, TU1 241 g, TU2 232 g', w: ['TNE 11,25 g, TU1 238,75 g, TU2 227,5 g', 'TNE 9 g, TU1 232 g, TU2 241 g', 'TNE 4,5 g, TU1 245,5 g, TU2 241 g'], why: 'Dải 200 đến 300 g dùng TNE cố định 9 g.', s: 6 },
      { q: 'Với E = 30 g, TNE là bao nhiêu?', c: '9% = 2,7 g', w: ['4,5 g', '4,5% = 1,35 g', '3% = 0,9 g'], why: 'Dải 5 đến 50 g tính theo 9%. TU1 = 27,3 g, TU2 = 24,6 g.', s: 8 },
      { q: 'Với E = 65 g, TU1 và TU2 là bao nhiêu?', c: '60,5 g và 56 g', w: ['59,15 g và 53,3 g', '62,08 g và 59,15 g', '60,5 g và 58,25 g'], why: 'Dải 50 đến 100 g dùng 4,5 g cố định: 65 − 4,5 = 60,5; 65 − 9 = 56.', s: 8 },
      { q: 'Lô trên 3 200 đơn vị, mẫu đầu 80 có 5 đơn vị dưới TU1. Bước tiếp theo?', c: 'Lấy thêm 80 đơn vị', w: ['Chấp nhận lô', 'Bác lô ngay', 'Lấy lại 80 đơn vị khác và bỏ kết quả cũ'], why: 'Bước 1 chấp nhận khi ≤ 3, bác khi ≥ 7. Từ 4 đến 6 thì lấy thêm 80.', s: 10 },
      { q: 'Cũng lô đó, tổng hai bước (160 đơn vị) có 9 đơn vị dưới TU1. Kết luận?', c: 'Bác lô', w: ['Chấp nhận lô', 'Lấy thêm 80 đơn vị', 'Chấp nhận nếu trung bình đạt'], why: 'Tổng tích luỹ chấp nhận khi ≤ 8, bác khi ≥ 9.', s: 10 },
      { q: 'Rủi ro nhà sản xuất khuyến nghị là bao nhiêu?', c: '1%, tức xác suất qua kiểm tra ít nhất 99%', w: ['5%, tức xác suất qua kiểm tra 95%', '0,01%', '2,5%'], why: 'Thực hành khuyến nghị cố định ở 1%; luật địa phương chặt hơn thì áp dụng luật địa phương.', s: 11 },
      { q: 'Hàm Excel nào tính xác suất chấp nhận của kế hoạch một bước?', c: 'BINOM.DIST(a; n; p; TRUE)', w: ['NORM.S.INV(1 − p)', 'CHISQ.INV(0,05; N − k)', 'T.INV(0,975; n)'], why: 'p là tỷ lệ đơn vị dưới giới hạn; từ rủi ro 1% suy ngược ra p lớn nhất được phép.', s: 11 },
      { q: 'E = 100 g, M0 = 99,8 g, Sp = 1,2 g, n = 80, k = 0,223. Kết quả?', c: 'Có hiệu chỉnh: đạt. Không hiệu chỉnh: không đạt', w: ['Đạt trong cả hai trường hợp', 'Không đạt trong cả hai trường hợp', 'Có hiệu chỉnh: không đạt. Không hiệu chỉnh: đạt'], why: '99,8 + 0,223 × 1,2 = 100,07 g ≥ E, còn 99,8 < 100 nếu không hiệu chỉnh.', s: 12 },
      { q: 'Với hải sản đông lạnh mạ băng, cần kiểm soát khối lượng thế nào?', c: 'Sau khi đã trừ lớp băng', w: ['Tính cả lớp băng', 'Chỉ cân khi còn đông cứng, không trừ gì', 'Không cần kiểm soát khối lượng'], why: 'Đây là điều kiện đặc biệt phải ghi nhận trong đặc tính sản phẩm.', s: 13 },
      { q: 'Tỷ lệ giữa TU1 và TU2 chưa được quy định thì OIML R 87 dùng tối đa bao nhiêu?', c: '2,5%', w: ['0,5%', '1%', '5%'], why: 'Đây là mức OIML R 87 áp dụng khi luật chưa quy định.', s: 7 }
    ]
  },
  {
    cards: [
      { q: 'Công thức chung của M', a: 'M = Giới hạn L + u × Sref. u phụ thuộc yêu cầu pháp luật và rủi ro nhà sản xuất.' },
      { q: 'Quy trình 3 bước thiết lập M', a: 'Xác định E; xác định Sref; chọn luật theo nước bán.' },
      { q: 'M cuối cùng', a: 'Giá trị lớn nhất của các yêu cầu dưới; sau đó kiểm tra M ≤ Mtrên nếu luật có giới hạn trên.' },
      { q: 'Sref có ý nghĩa gì?', a: 'Giá trị Sp của một lô mới có 95% khả năng không vượt Sref.' },
      { q: 'Dữ liệu để tính Sref', a: 'Trung vị của ít nhất 10 giá trị Sp; tổng số đơn vị đã cân nên từ 300 trở lên.' },
      { q: 'Sref tạm khi chưa có dữ liệu', a: 'Sref = 1,4 × Sm, sau khoảng 10 lô thì tính lại.' },
      { q: 'Các lớp biến thiên', a: 'Máy với sản phẩm, con người và quy trình, hệ thống cân. Sp gộp tất cả.' },
      { q: 'Hệ số u từ tỷ lệ cho phép', a: 'Excel NORM.S.INV(1 − p). PT1 = 2% → u = 2,054; PE = 55% → u = 0,126.' },
      { q: 'Slim', a: 'Mức S mà từ đó bắt buộc phải rót dư. Vùng lý tưởng: Sref < Slim.' },
      { q: 'M khi yêu cầu tỷ lệ tối thiểu trên E', a: 'M = E + u(PE) × Sref.' },
      { q: 'Tần suất cập nhật M', a: 'Ít nhất mỗi năm, và khi biến thiên, luật, thị trường thay đổi hoặc nhiều lô liên tiếp không đạt.' },
      { q: 'Một lô bán cho nhiều nước', a: 'Chọn mục tiêu lớn nhất trong các thị trường; nếu chi phí đáng kể thì cân nhắc tách lô.' }
    ],
    quiz: [
      { q: 'Muốn giảm khối lượng mục tiêu, cách nào đúng?', c: 'Giảm biến thiên của quy trình', w: ['Đổi nhãn sang E lớn hơn', 'Tăng tần suất chỉnh máy', 'Bỏ kiểm tra bì'], why: 'Nếu biến thiên vượt mức luật cho phép thì buộc phải nâng trung bình.', s: 2 },
      { q: 'Sản phẩm mới, Sm = 2 g, chưa có lịch sử. Sref tạm là bao nhiêu?', c: '2,8 g', w: ['2,0 g', '2,4 g', '4,0 g'], why: 'Sref tạm = 1,4 × Sm = 2,8 g, sau khoảng 10 lô thì tính lại.', s: 5 },
      { q: 'Có nên cộng thêm hệ số an toàn vào Sref không?', c: 'Không, Sref đã có sẵn hệ số an toàn', w: ['Có, cộng thêm 10%', 'Có, nhân thêm 1,4', 'Có, khi lô dưới 3 200 đơn vị'], why: 'Sref là mức trần hợp lý của Sp cho các lô tương lai nên không cộng thêm nữa.', s: 4 },
      { q: 'Quy trình không ổn định thì làm gì trước khi tính Sref?', c: 'Tìm nguyên nhân trước', w: ['Loại các lô xấu rồi tính', 'Dùng 1,4 × Sm', 'Tăng cỡ mẫu lên 300'], why: 'Sref chỉ có nghĩa với quy trình tương đối ổn định.', s: 5 },
      { q: 'Khi N rất lớn, hệ số hiệu chỉnh trong công thức Sref thay đổi thế nào?', c: 'Tiến về 1', w: ['Tiến về 0', 'Tiến về 1,4', 'Tăng không giới hạn'], why: 'Ví dụ checkweigher: trung vị 10,75 g cho Sref 10,78 g.', s: 6 },
      { q: 'Công thức mục tiêu cho yêu cầu tỷ lệ tối đa dưới TU1?', c: 'M = TU1 + u(PT1) × Sref', w: ['M = E + u × Sref / √n', 'M = TU2 + u × Sref', 'M = E + u(PE) × Sref'], why: 'Mỗi yêu cầu có công thức riêng; M cuối là giá trị lớn nhất.', s: 7 },
      { q: 'Khung EU, E = 100 g, S = 2 g: M theo trung bình 100, TU1 99,37, TU2 98,32. M bằng bao nhiêu?', c: '100,00 g', w: ['98,32 g', '99,37 g', '99,23 g'], why: 'Lấy giá trị lớn nhất; yêu cầu quyết định là trung bình, không cần rót dư có kế hoạch.', s: 9 },
      { q: 'Khung EU, E = 100 g, S = 3 g (u TU1 = 1,934; u TU2 = 3,66). M bằng bao nhiêu?', c: '101,98 g', w: ['100,00 g', '101,30 g', '98,16 g'], why: 'TU1: 95,5 + 5,80 = 101,30; TU2: 91 + 10,98 = 101,98. Lấy giá trị lớn nhất.', s: 18 },
      { q: 'Với E = 100 g, u = 1,934, Slim xấp xỉ bao nhiêu?', c: '2,33 g', w: ['1,93 g', '4,50 g', '2,60 g'], why: 'Slim = 4,5 / 1,934 ≈ 2,33 g.', s: 10 },
      { q: 'M tính được lớn hơn Mtrên nghĩa là gì?', c: 'Quy trình không đủ năng lực, phải giảm biến thiên trước khi sản xuất', w: ['Lấy Mtrên làm mục tiêu và tiếp tục sản xuất như cũ', 'Bỏ qua giới hạn trên vì yêu cầu dưới quan trọng hơn', 'Tăng ngưỡng loại lên Mtrên để giữ được trung bình'], why: 'Không thể đồng thời đạt cả yêu cầu dưới và giới hạn trên.', s: 11 },
      { q: 'Sô-cô-la 50 g có M lần lượt 50,00; 50,67; 50,00 g cho ba nước. Một lô bán cả ba nước dùng M nào?', c: '50,67 g', w: ['50,00 g', '50,22 g', 'Tuỳ nước kiểm tra trước'], why: 'Cùng một lô phải lấy mục tiêu lớn nhất.', s: 12 },
      { q: 'Vì sao có checkweigher vẫn cần mục tiêu?', c: 'Máy loại hàng lỗi nhưng không làm giảm biến thiên và không đảm bảo trung bình', w: ['Vì checkweigher không cân được 100%', 'Vì luật cấm dùng checkweigher', 'Không cần, có checkweigher thì M = TU1'], why: 'Vẫn phải đảm bảo yêu cầu trung bình và tỷ lệ dưới TU1.', s: 13 },
      { q: 'Phương án M = 104,77 tổng 393 €/lô, M = 106,13 tổng 365 €/lô. Ví dụ này cho thấy điều gì?', c: 'Có lúc rót thêm rẻ hơn xử lý hàng loại', w: ['M thấp luôn rẻ hơn', 'Hàng loại không tốn chi phí', 'Rót dư không phải chi phí'], why: 'Với quy trình biến thiên lớn, chọn M để cân bằng rót dư và hàng loại.', s: 14 }
    ]
  },
  {
    cards: [
      { q: 'Độ chính xác gồm những gì?', a: 'Độ đúng (trueness) và độ chụm (precision).' },
      { q: 'Độ đúng (trueness)', a: 'Sai lệch so với giá trị thật; biểu hiện là sai số thiết lập.' },
      { q: 'Độ chụm (precision)', a: 'Độ lặp lại khi cân cùng một vật.' },
      { q: 'Un', a: 'Vùng không xác định danh định do nhà cung cấp công bố.' },
      { q: 'Ua', a: 'Vùng không xác định thực tế, tính tại nhà máy: Ua = 6 × SD(d).' },
      { q: 'Yêu cầu với Ua và Un', a: 'Ua ≤ Un ≤ mức tối đa theo luật.' },
      { q: 'Phương pháp sai khác (MoD)', a: 'So sánh cân động và tĩnh của các mẫu khác nhau khi chuyền chạy: d = D − S.' },
      { q: 'Phương pháp 25 lần cân', a: 'Cân tĩnh một mẫu, cho qua máy 25 lần đầu ca. Dùng sau sửa chữa hoặc khi cần xác nhận nhanh.' },
      { q: 'Giới hạn biểu đồ MoD', a: 'Kiểm soát ±Un/2; cảnh báo ±Un/3. Đường giữa là 0.' },
      { q: 'Ngưỡng loại', a: 'Ngưỡng loại = Giới hạn + Un/2.' },
      { q: 'Kiểm tra đầu ca với cân tĩnh', a: 'Dùng quả chuẩn sát E; sai lệch không vượt độ chia kiểm e.' },
      { q: 'Kiểm tra cơ cấu loại', a: 'Mẫu thử khối lượng cố định ở giới hạn, cho qua ít nhất 5 lần đầu ca hoặc theo tần suất cơ sở quy định.' }
    ],
    quiz: [
      { q: 'Quả chuẩn 500 g cân ra trung bình 498,06 g, SD 0,21 g. Nhận xét?', c: 'Chụm nhưng không đúng', w: ['Đúng nhưng không chụm', 'Đúng và chụm', 'Không đúng và không chụm'], why: 'SD nhỏ nên chụm, nhưng trung bình lệch gần 2 g.', s: 3 },
      { q: 'Quả chuẩn 500 g cân ra trung bình 500 g, SD 2,24 g. Dùng được không?', c: 'Không, trung bình đúng nhưng độ chụm kém', w: ['Có, vì trung bình đúng', 'Có, vì SD dưới 5 g', 'Không, vì sai số thiết lập lớn'], why: 'Nhìn trung bình không đủ: phải xét cả độ chụm.', s: 3 },
      { q: 'Tần suất kiểm định hoặc hiệu chuẩn thiết bị cân?', c: 'Khi lắp đặt, ít nhất mỗi năm, và sau bảo trì, sửa chữa nếu cần', w: ['Chỉ một lần khi lắp đặt, sau đó không cần lặp lại', 'Ba năm một lần, kể cả sau khi sửa chữa', 'Chỉ khi có đợt thanh tra của cơ quan quản lý'], why: 'Quả chuẩn thì theo luật, nếu không có thì ít nhất 3 năm một lần.', s: 4 },
      { q: 'Khi nào checkweigher đáng đầu tư?', c: 'Luật không cho đơn vị dưới TU1, tốc độ cao, biến thiên lớn hoặc có vòng phản hồi', w: ['Quy trình đơn giản, năng lực tốt, chỉ cần lấy mẫu định kỳ', 'Thường xuyên đổi cỡ, cần chuyển đổi nhanh giữa các sản phẩm', 'Muốn giảm chi phí đầu tư và tiết kiệm diện tích nhà xưởng'], why: 'Cân tĩnh hợp với quy trình đơn giản, năng lực tốt, đổi cỡ nhanh, chi phí thấp.', s: 5 },
      { q: 'Vì sao MoD được khuyến nghị để theo dõi hằng ngày?', c: 'Chuyền vẫn chạy và phản ánh điều kiện động thực', w: ['Phải dừng chuyền để đo chuẩn', 'Chỉ cần một mẫu duy nhất', 'Không cần cân tĩnh'], why: 'MoD xử lý được ngay, mẫu trải đều; 25 lần cân thì phải dừng chuyền.', s: 8 },
      { q: 'Mẫu có giá trị động D = 501,2 g, tĩnh S = 500,8 g. d bằng bao nhiêu?', c: '+0,4 g', w: ['−0,4 g', '1 002 g', '0,8 g'], why: 'd = D − S.', s: 9 },
      { q: 'Un = 6 g. Giới hạn kiểm soát và cảnh báo trên biểu đồ MoD?', c: '±3 g và ±2 g', w: ['±6 g và ±3 g', '±2 g và ±3 g', '±3 g và ±1,5 g'], why: 'Kiểm soát ±Un/2, cảnh báo ±Un/3.', s: 10 },
      { q: 'Các điểm MoD phân tán rộng về hai phía nghĩa là gì?', c: 'Ua quá lớn, cần kiểm tra băng tải, rung, luồng gió', w: ['Có sai số thiết lập, cần trừ vào kết quả', 'Cần chỉnh điểm 0 ngay rồi chạy tiếp', 'Máy hoạt động tốt, không cần làm gì'], why: 'Phân tán hai phía là vấn đề độ chụm; lệch về một phía mới là sai số thiết lập.', s: 11 },
      { q: '10 điểm MoD liên tiếp cùng một phía thì làm gì?', c: 'Chỉnh điểm 0', w: ['Bỏ qua', 'Thay băng tải', 'Tăng Un'], why: 'Đó là sai số thiết lập, do người có trách nhiệm kỹ thuật chỉnh.', s: 11 },
      { q: 'E = 500 g, TU2 = 470 g, Un = 6 g. Ngưỡng loại theo TU2 là bao nhiêu?', c: '473 g', w: ['470 g', '476 g', '467 g'], why: 'Ngưỡng = 470 + 6/2 = 473 g.', s: 12 },
      { q: 'Vì sao ngưỡng loại phải cộng Un/2?', c: 'Cân động có độ không đảm bảo, cần biên để đơn vị thiếu chắc chắn bị loại', w: ['Để giảm số đơn vị bị loại khỏi chuyền trong mỗi ca', 'Để bù phần bì chưa được trừ trong phép cân động', 'Vì luật yêu cầu mọi đơn vị phải thừa hơn lượng E'], why: 'Biên an toàn này đảm bảo đơn vị thiếu bị đẩy ra.', s: 12 },
      { q: 'Vì sao không dùng gói thật làm mẫu thử cơ cấu loại?', c: 'Gói thật bị hao mòn theo thời gian', w: ['Gói thật quá nặng', 'Gói thật làm hỏng máy', 'Luật cấm dùng gói thật'], why: 'Mẫu thử phải có khối lượng cố định ở giới hạn.', s: 14 },
      { q: 'Cơ cấu loại hỏng thì xử lý thế nào?', c: 'Sửa, kiểm tra lại lô từ lần kiểm đạt gần nhất, rồi xác nhận bằng 25 lần cân', w: ['Sửa rồi chạy tiếp, không cần xem lại sản phẩm đã qua máy', 'Chỉ giữ các đơn vị đang nằm trên băng tải lúc phát hiện', 'Đợi đến đầu ca sau rồi mới kiểm tra và sửa chữa'], why: 'Mọi sản phẩm từ lần kiểm đạt gần nhất đều có thể bị ảnh hưởng.', s: 14 }
    ]
  },
  {
    cards: [
      { q: 'Tịnh, tổng, bì', a: 'Tịnh = Tổng − Bì.' },
      { q: 'Khi nào phải quản lý bì?', a: 'Khi sản phẩm được cân sau khi đã rót hoặc bọc.' },
      { q: 'Quy tắc chọn bì trung bình', a: 'SDtare < TNE/5 thì dùng bì trung bình; ngược lại dùng bì riêng từng đơn vị.' },
      { q: 'Số mẫu tính SDtare', a: 'Ít nhất 100 mẫu từ nhiều lô bao bì.' },
      { q: 'Số mẫu lập bì danh nghĩa', a: 'Ít nhất 30 bao bì từ nhiều lô, lấy trung bình.' },
      { q: 'Kiểm tra bì mỗi ca', a: 'Cân ít nhất 9 bao bì, cả khi đổi lô bao bì nếu có chênh lệch.' },
      { q: 'Ngưỡng cập nhật bì', a: '|thực tế − danh nghĩa| ≤ 3 × SDtare / √n. Với n = 9, ngưỡng là SDtare.' },
      { q: 'SDtare bao bì nhiều thành phần', a: 'SDtare = √(SD₁² + SD₂² + SD₃²). Phương sai cộng được, độ lệch chuẩn thì không.' },
      { q: 'SDtare bao gói nhóm', a: 'SDtare = √(SDhộp² + số đơn vị × SDđơn vị²).' },
      { q: 'Lấy mẫu bao gói dạng dây', a: 'Tối thiểu 9 bao bì rỗng và tối thiểu 3 dây.' },
      { q: 'Bì danh nghĩa thấp hơn thực tế', a: 'Net đọc được cao hơn thực: nguy cơ thiếu lượng, không tuân thủ.' },
      { q: 'Bì danh nghĩa cao hơn thực tế', a: 'Net đọc được thấp hơn thực: máy bị chỉnh lên, rót dư.' }
    ],
    quiz: [
      { q: 'Sản phẩm nào KHÔNG cần quản lý bì?', c: 'Thanh ngũ cốc được cân trước khi bọc', w: ['Sữa bột cân sau khi rót vào lon', 'Nước sốt cân sau khi rót vào hũ', 'Bánh cân sau khi bọc màng'], why: 'Cân trước khi bọc thì không có bì trong phép cân.', s: 2 },
      { q: 'E = 100 g (TNE 4,5 g), SDtare = 0,6 g. Dùng loại bì nào?', c: 'Bì trung bình, vì 0,6 < 0,9', w: ['Bì riêng, vì 0,6 > 0,45', 'Bì riêng, vì SDtare khác 0', 'Không cần quản lý bì'], why: 'TNE/5 = 0,9 g, SDtare nhỏ hơn nên dùng bì trung bình.', s: 3 },
      { q: 'E = 500 g (TNE 15 g), SDtare = 4 g. Dùng loại bì nào?', c: 'Bì riêng từng đơn vị', w: ['Bì trung bình', 'Bì danh nghĩa của nhà cung cấp', 'Không cần quản lý bì'], why: 'TNE/5 = 3 g, SDtare lớn hơn nên phải dùng bì riêng.', s: 3 },
      { q: 'Vì sao không lấy SDtare từ đặc tính của nhà cung cấp?', c: 'Không phản ánh biến thiên thật tại nhà máy', w: ['Nhà cung cấp không được cân', 'Số đó luôn bằng 0', 'Luật cấm dùng số của nhà cung cấp'], why: 'Số liệu dùng để kiểm soát là số do nhà máy đo được, nghiên cứu do QA thực hiện.', s: 4 },
      { q: 'SD = 0,5 g với bì 200 g. Cùng vật liệu, bì 400 g có SD xấp xỉ?', c: '1,0 g', w: ['0,5 g', '0,25 g', '2,0 g'], why: 'SD tương đối 0,25%, nên 400 × 0,25% = 1,0 g. Cần xác nhận lại bằng dữ liệu theo dõi.', s: 5 },
      { q: 'Hộp SD 0,4 g, màng SD 0,3 g. SDtare tổng là bao nhiêu?', c: '0,5 g', w: ['0,7 g', '0,1 g', '0,25 g'], why: '√(0,16 + 0,09) = 0,5 g. Phương sai cộng được, độ lệch chuẩn thì không.', s: 6 },
      { q: 'Bao gói nhóm 100 thanh, SDhộp 0,6 g, SDđơn vị 0,2 g. SDtare?', c: '2,09 g', w: ['20,6 g', '0,63 g', '4,36 g'], why: '√(0,6² + 100 × 0,2²) = 2,09 g.', s: 7 },
      { q: 'Dây 5 gói, cần cân tối thiểu bao nhiêu dây rỗng?', c: '3 dây', w: ['1 dây', '2 dây', '9 dây'], why: '3 dây có 15 bao bì, đủ cả hai điều kiện: 9 bao bì và 3 dây.', s: 8 },
      { q: 'SDtare = 0,2 g, n = 9, danh nghĩa 10,6 g, thực tế 10,7 g. Làm gì?', c: 'Giữ nguyên', w: ['Cập nhật thành 10,7 g', 'Dừng chuyền', 'Đổi lô bao bì'], why: 'Chênh 0,1 g chưa vượt ngưỡng 0,2 g, tránh chỉnh theo nhiễu.', s: 10 },
      { q: 'SDtare = 0,2 g, n = 9, danh nghĩa 10,6 g, thực tế 10,9 g. Làm gì?', c: 'Cập nhật thành 10,9 g', w: ['Giữ nguyên', 'Cập nhật thành 10,75 g', 'Giữ lô'], why: 'Chênh 0,3 g vượt ngưỡng 0,2 g nên cập nhật theo thực tế.', s: 10 },
      { q: 'E = 500 g, bì danh nghĩa 6 g, bì thực 7 g, M0 ghi nhận 500 g. M0 thật?', c: '499 g', w: ['501 g', '500 g', '493 g'], why: 'M0 thật = 500 − (7 − 6) = 499 g: không được xuất xưởng.', s: 12 },
      { q: 'Bì danh nghĩa cao hơn thực tế dẫn đến hậu quả gì?', c: 'Máy bị chỉnh lên, rót dư', w: ['Thiếu lượng, không tuân thủ', 'Không ảnh hưởng', 'Cân bị hỏng'], why: 'Net đọc được thấp hơn thực nên người vận hành chỉnh tăng.', s: 12 }
    ]
  },
  {
    cards: [
      { q: 'Hiệu ứng Deming', a: 'Chỉnh theo từng điểm dữ liệu là phản ứng với nhiễu, làm biến thiên lớn hơn.' },
      { q: 'Biểu đồ X-bar', a: 'Mỗi điểm là trung bình của n đơn vị, đường giữa là M.' },
      { q: 'Giới hạn kiểm soát CL', a: 'CL = M ± 3 × Sm / √n.' },
      { q: 'Giới hạn cảnh báo WL', a: 'WL = M ± 2 × Sm / √n.' },
      { q: 'Biểu đồ R dùng để làm gì?', a: 'Phát hiện Sm tăng dù trung bình vẫn trong giới hạn, ví dụ đầu chiết lệch.' },
      { q: 'UCL của biểu đồ R', a: 'UCLR = Sm × D4 × d2.' },
      { q: 'Cỡ mẫu mỗi lần với cân tĩnh', a: '3 đến 8 đơn vị. Trên 8 đơn vị dùng S-chart thay R-chart.' },
      { q: 'Tổng số đơn vị mỗi lô', a: 'Sản xuất trên 2 giờ: ít nhất 90. Từ 2 giờ trở xuống: ít nhất 30.' },
      { q: '5 quy tắc đọc biểu đồ', a: 'Một điểm ngoài CL; hai điểm vùng cảnh báo cùng phía; hai điểm ở hai phía; 10 điểm cùng phía; 7 điểm tăng hoặc giảm.' },
      { q: 'Phép thử năng lực máy', a: 'Xác định Sm khi đầu chiết đã căn chỉnh: khi vận hành thử, sau sửa chữa, rà soát hằng năm.' },
      { q: 'Đích của run chart checkweigher', a: 'Trung bình tích luỹ Mi ≥ M khi kết thúc; Spi tích luỹ ≤ Sref.' },
      { q: 'OCAP', a: 'Kế hoạch hành động khi mất kiểm soát, xây dựng cho từng chuyền.' }
    ],
    quiz: [
      { q: 'Điều chỉnh máy theo từng điểm dữ liệu dẫn đến gì?', c: 'Biến thiên càng lớn', w: ['Biến thiên giảm dần', 'Trung bình chính xác hơn', 'Không ảnh hưởng'], why: 'Đó là phản ứng với nhiễu ngẫu nhiên; quy trình ổn định cần được để yên.', s: 3 },
      { q: 'Giới hạn biểu đồ X-bar được tính từ gì?', c: 'Sm, biến thiên ngắn hạn của máy với sản phẩm', w: ['Dung sai pháp luật TNE', 'Sref', 'Sp của lô trước'], why: 'Giới hạn nói về quy trình, không phải dung sai pháp luật.', s: 7 },
      { q: 'M = 250 g, Sm = 2 g, n = 4. CL và WL là bao nhiêu?', c: 'CL = 250 ± 3 g; WL = 250 ± 2 g', w: ['CL = 250 ± 6 g; WL = 250 ± 4 g', 'CL = 250 ± 2 g; WL = 250 ± 3 g', 'CL = 250 ± 1,5 g; WL = 250 ± 1 g'], why: '3 × 2 / √4 = 3 và 2 × 2 / √4 = 2.', s: 7 },
      { q: 'Lô sản xuất 90 phút, cân tĩnh, cần tối thiểu bao nhiêu đơn vị?', c: '30', w: ['90', '9', '300'], why: 'Từ 2 giờ trở xuống: ít nhất 30; trên 2 giờ: ít nhất 90. Áp dụng số lớn hơn nếu luật nước bán yêu cầu.', s: 8 },
      { q: 'Lấy mẫu 10 đơn vị mỗi lần thì dùng biểu đồ biến thiên nào?', c: 'S-chart', w: ['R-chart', 'Run chart', 'Biểu đồ MoD'], why: 'Trên 8 đơn vị thì dùng S-chart thay R-chart.', s: 8 },
      { q: 'Hai điểm liên tiếp trong vùng cảnh báo, CÙNG phía nghĩa là gì?', c: 'Dịch chuyển: chỉnh trung bình', w: ['Biến thiên tăng', 'Quy trình ổn định', 'Xu hướng trôi'], why: 'Hai phía đối diện mới là biến thiên tăng.', s: 10 },
      { q: 'Hai điểm trong vùng cảnh báo, HAI phía đối diện nghĩa là gì?', c: 'Biến thiên tăng: kiểm tra sản phẩm, đầu chiết', w: ['Dịch chuyển: chỉnh trung bình', 'Dịch chuyển nhỏ, bền', 'Không cần làm gì'], why: 'Trung bình không đổi hướng mà độ phân tán tăng.', s: 10 },
      { q: 'Có nhiều tín hiệu cùng lúc thì xử lý thế nào?', c: 'Xử lý tín hiệu mạnh trước, quy tắc 1 trước quy tắc 5', w: ['Quy tắc 5 trước quy tắc 1', 'Xử lý cái mới nhất', 'Bỏ qua, đợi lần lấy mẫu sau'], why: 'Trên biểu đồ R chỉ dùng quy tắc 1.', s: 10 },
      { q: 'Khi biến thiên tăng, kiểm tra theo thứ tự nào?', c: 'Thiết bị, thử đầu chiết, rồi tính chất sản phẩm', w: ['Tính chất sản phẩm, thiết bị, đầu chiết', 'Đổi M ngay', 'Chỉnh trung bình trước'], why: 'Thiết bị trước: van, ống nối, độ dính, hỏng hóc.', s: 11 },
      { q: '12 đầu chiết, Sm = 0,1 g, đo min 2,45, max 3,25, UCL 0,559 g. Kết luận?', c: 'R = 0,80 g vượt giới hạn, cần thử đầu chiết', w: ['R = 0,80 g trong giới hạn', 'Chỉnh trung bình giảm 0,8 g', 'Cân bị sai số'], why: 'Biểu đồ R phát hiện đầu chiết lệch dù trung bình vẫn ổn.', s: 12 },
      { q: 'Trung bình tích luỹ Mi trên run chart cho biết gì?', c: 'Tình trạng tuân thủ của lô', w: ['Khi nào chỉnh máy trong 15 phút tới', 'Sai số của cân', 'Tỷ lệ hàng loại'], why: 'Trung bình kỳ để chỉnh quy trình; Mi phải ≥ M khi kết thúc.', s: 14 },
      { q: 'Spi tích luỹ vượt Sref thì làm gì?', c: 'Thử đầu chiết', w: ['Tăng M', 'Đổi bì', 'Bỏ qua vì đã cân 100%'], why: 'Spi tích luỹ phải ≤ Sref.', s: 14 },
      { q: 'Trung bình và SD trên phiếu checkweigher được tính thế nào?', c: 'Trên mọi đơn vị đã cân, kể cả đơn vị bị loại', w: ['Chỉ đơn vị được chấp nhận', 'Chỉ đơn vị bị loại', 'Trên mẫu 90 đơn vị'], why: 'Nếu máy không nối hệ thống thì in phiếu cuối lô và lưu kèm hồ sơ.', s: 15 }
    ]
  },
  {
    cards: [
      { q: 'Tiêu chí Mức 1', a: 'M0 ≥ M và Sp ≤ Sref. Ca C chỉ xét M0 ≥ M.' },
      { q: 'Mức 2', a: 'Không đạt Mức 1: đánh giá theo E, TU1, TU2 trên đồ thị xuất xưởng.' },
      { q: 'Thứ tự trước khi quyết định', a: 'Thu thập dữ liệu, kiểm tra cân, bì, biểu đồ.' },
      { q: 'Ca A', a: 'Cân tĩnh, lấy mẫu: M0 ≥ M và Sp ≤ Sref.' },
      { q: 'Ca B', a: 'Checkweigher không loại, cơ cấu loại hỏng, hoặc không quản lý được tỷ lệ giữa TU1 và TU2.' },
      { q: 'Ca C', a: 'Checkweigher có loại; luật chỉ có một giới hạn hoặc máy quản lý được tỷ lệ giữa TU1 và TU2.' },
      { q: 'Đọc đồ thị xuất xưởng', a: 'Trục ngang S, trục dọc lượng. Điểm (Sp; M0) trên đường: đạt luật; dưới đường: không đạt.' },
      { q: 'Sai lệch tính lại được', a: 'Sai số thiết lập và bì.' },
      { q: 'Sai lệch không tính lại được', a: 'Sai số về độ chụm (Ua lớn hơn Un): giữ lô, lấy mẫu lại, sửa máy trước lô sau.' },
      { q: 'Xử lý lô không đạt', a: 'Giữ, điều tra nguyên nhân gốc, khắc phục tức thời, ngăn tái diễn (CAPA).' },
      { q: 'FTR', a: 'Đạt ngay lần đầu. Lô không đạt luật, phải lấy mẫu lại hoặc cần điều tra thêm thì không tính.' },
      { q: 'Lấy mẫu lại sau phân loại', a: 'Không gộp dữ liệu gốc của lô bị giữ với kết quả lấy mẫu lại.' }
    ],
    quiz: [
      { q: 'Vì sao đạt M và Sref thì đạt mọi yêu cầu luật?', c: 'Vì M được tính để điều đó xảy ra', w: ['Vì thanh tra không kiểm tra thêm', 'Vì Sref luôn nhỏ hơn TNE', 'Vì M luôn lớn hơn E'], why: 'M là mức thấp nhất đạt mọi yêu cầu với biến thiên Sref.', s: 3 },
      { q: 'Có nên dùng phép kiểm tra của cơ quan quản lý làm tiêu chí xuất xưởng không?', c: 'Không', w: ['Có, thay cho Mức 1', 'Có, với lô trên 3 200 đơn vị', 'Có, khi có checkweigher'], why: 'Tiêu chí xuất xưởng là Mức 1 và Mức 2.', s: 4 },
      { q: 'Checkweigher ngưỡng TU2 + Un/2, không kiểm soát được tỷ lệ dưới TU1. Thuộc ca nào?', c: 'Ca B', w: ['Ca A', 'Ca C', 'Không thuộc ca nào'], why: 'Ca B vẫn cần xét cả M0 và Sp.', s: 5 },
      { q: 'Tại nơi cho phép một tỷ lệ dưới TU1, đặt ngưỡng loại ở TU1 có tác hại gì?', c: 'Loại nhiều hàng đạt, tăng thất thoát', w: ['Lọt nhiều hàng thiếu ra thị trường', 'Vi phạm luật của nước bán hàng', 'Làm cân xuất hiện sai số thiết lập'], why: 'Ngưỡng quá chặt loại cả hàng đạt yêu cầu.', s: 5 },
      { q: 'E = 200 g, Sp = 5 g, M(5) = 200,67 g, M0 = 201 g. Quyết định?', c: 'Xuất xưởng', w: ['Giữ lô', 'Lấy mẫu lại', 'Phân loại toàn lô'], why: 'Điểm nằm trên đường yêu cầu.', s: 8 },
      { q: 'E = 200 g, Sp = 5 g, M(5) = 200,67 g, M0 = 200 g. Quyết định?', c: 'Giữ lô', w: ['Xuất xưởng vì M0 = E', 'Xuất xưởng vì Sp nhỏ', 'Hạ M xuống 200 g'], why: 'Điểm nằm dưới đường dù M0 bằng E.', s: 8 },
      { q: 'Lô dưới E có khoảng tin cậy chứa E. Cơ sở nên hiểu thế nào?', c: 'Đó là góc nhìn của thanh tra, không thay quy tắc xuất xưởng', w: ['Luôn được xuất xưởng', 'Luôn phải tiêu huỷ', 'Có thể bỏ qua các yêu cầu khác'], why: 'Nếu dùng thì phải văn bản hoá trong quy trình.', s: 9 },
      { q: 'E = 500 g, M = 500 g, M0 = 499 g, checkweigher có sai số −1 g. M0 đúng?', c: '500 g, xuất xưởng', w: ['498 g, giữ lô', '499 g, giữ lô', '501 g, xuất xưởng'], why: 'M0 đúng = 499 + 1 = 500 g.', s: 10 },
      { q: 'Ua lớn hơn Un thì xử lý lô thế nào?', c: 'Giữ lô, xem xét hồ sơ, lấy mẫu lại, sửa máy', w: ['Tính lại M0', 'Cộng thêm Un vào M0', 'Xuất xưởng nếu M0 ≥ M'], why: 'Sai số về độ chụm không thể tính lại.', s: 10 },
      { q: 'Giao gấp khi lô đang bị giữ thì làm thế nào?', c: 'Xuất phần đã chứng minh đạt, phần còn lại giữ đến khi xong', w: ['Xuất cả lô rồi xử lý sau', 'Gộp dữ liệu lấy mẫu lại để đạt', 'Hạ tiêu chí Mức 1'], why: 'Dùng biểu đồ để khoanh vùng pallet cần phân loại.', s: 12 },
      { q: 'Giữ những lô nào khi phát hiện không đạt?', c: 'Tất cả lô từ lần kiểm tra đạt gần nhất', w: ['Chỉ lô đang chạy', 'Chỉ pallet cuối', 'Tất cả lô trong năm'], why: 'Mọi lô từ lần kiểm đạt gần nhất đều có thể bị ảnh hưởng.', s: 12 },
      { q: 'E = 100 g, Sref = 2,4 g, M = 100,14 g, có hiệu chỉnh. Lô M0 = 100,1 g, Sp = 2 g. Quyết định?', c: 'Mức 1 không đạt, Mức 2 đạt: xuất xưởng', w: ['Mức 1 đạt: xuất xưởng', 'Giữ lô', 'Lấy mẫu lại'], why: 'M0 < M nhưng trên đường, vì M(2) = 100 g.', s: 14 },
      { q: 'E = 100 g, Sref = 2,38 g, M = 100,1 g. Lô M0 = 100,12 g, Sp = 2,6 g. Quyết định?', c: 'Giữ lô, vì M(2,6) ≈ 100,53 g > M0', w: ['Xuất xưởng, vì M0 > M', 'Xuất xưởng, vì M0 > E', 'Tính lại M0 theo bì'], why: 'M0 cao hơn M vẫn có thể không đạt khi biến thiên lớn.', s: 15 }
    ]
  },
  {
    cards: [
      { q: 'Chịu trách nhiệm cuối cùng', a: 'Giám đốc nhà máy; chỉ định người phụ trách khối lượng tịnh.' },
      { q: 'Người phụ trách khối lượng tịnh', a: 'Triển khai CP1 đến CP5, tính M, đào tạo, xử lý sai lệch.' },
      { q: 'Vai trò của QA', a: 'Nghiên cứu bì, quyết định xuất xưởng, tự đánh giá.' },
      { q: 'Vai trò của vận hành chiết rót', a: 'Theo dõi trung bình và biến thiên, chỉnh máy theo quy tắc, ghi nhận.' },
      { q: 'Vai trò của bảo trì', a: 'Hiệu chuẩn, bảo trì máy và cân, căn chỉnh đầu chiết.' },
      { q: 'Vai trò của pháp chế, đăng ký', a: 'Ghi nhãn đúng; thông báo thay đổi luật.' },
      { q: 'Tần suất kiểm tra khi có nhiều quy định', a: 'Lấy mức chặt nhất trong luật nước bán và quy định của cơ sở.' },
      { q: 'Xác nhận tuân thủ', a: 'Định kỳ chọn ngẫu nhiên ít nhất 2 lô kiểm tra theo thủ tục cơ quan quản lý, và tự đánh giá bằng bảng kiểm.' },
      { q: 'Hàng gia công', a: 'Đơn vị chịu trách nhiệm sản phẩm xác nhận tuân thủ; đưa yêu cầu và quyền kiểm tra vào hợp đồng.' },
      { q: 'Cơ sở báo cáo rót dư', a: 'Cơ sở 0: chênh giữa trung bình và E, không phải giữa trung bình và M.' },
      { q: 'Lộ trình giảm rót dư', a: 'Đo đúng, giữ quy trình, giảm biến thiên, hạ mục tiêu.' },
      { q: 'Hành động đầu tiên để giảm rót dư bền vững', a: 'Giảm biến thiên. Lắp checkweigher mà không giảm biến thiên chỉ chuyển vấn đề sang hàng loại.' }
    ],
    quiz: [
      { q: 'Điều quan trọng nhất về hồ sơ của lô là gì?', c: 'Mọi thông tin của lô đều sẵn có khi quyết định', w: ['Phải dùng một phần mềm cụ thể', 'Chỉ lưu bằng giấy', 'Chỉ QA được xem'], why: 'Điều quan trọng không phải là phần mềm nào.', s: 3 },
      { q: 'Hồ sơ liên quan xuất xưởng (E, M, Sref, TU1/TU2) phải nằm ở đâu?', c: 'Trong hệ thống chất lượng', w: ['Trong máy tính cá nhân', 'Trên biểu đồ tại chuyền', 'Trong hệ thống bảo trì'], why: 'Bì, hiệu năng cân có thể ở hệ thống phù hợp khác, còn hồ sơ xuất xưởng thì không.', s: 3 },
      { q: 'Điều gì KHÔNG phải tiêu chí để đặt tần suất kiểm tra?', c: 'Chi phí kiểm tra', w: ['Luật nước bán', 'Dữ liệu lịch sử', 'Khả năng kiểm soát hàng không phù hợp'], why: 'Tần suất dựa trên luật, quy định cơ sở và tiếp cận rủi ro.', s: 4 },
      { q: 'Rà soát Sm và mẫu biểu đồ hằng năm có bắt buộc thử lại không?', c: 'Không bắt buộc, rà xu hướng', w: ['Bắt buộc thử lại toàn bộ', 'Không cần rà soát', 'Thử lại mỗi tuần'], why: 'Rà soát tối thiểu hằng năm theo xu hướng.', s: 4 },
      { q: 'Ai quyết định xuất xưởng và thực hiện tự đánh giá?', c: 'QA', w: ['Vận hành chiết rót', 'Bảo trì', 'Pháp chế'], why: 'QA nghiên cứu bì, quyết định xuất xưởng, tự đánh giá.', s: 5 },
      { q: 'Ai căn chỉnh đầu chiết?', c: 'Bảo trì', w: ['QA', 'Pháp chế', 'Giám đốc nhà máy'], why: 'Bảo trì phụ trách hiệu chuẩn, bảo trì máy và cân, căn chỉnh đầu chiết.', s: 5 },
      { q: 'Xác nhận tuân thủ định kỳ chọn ít nhất bao nhiêu lô?', c: '2 lô ngẫu nhiên', w: ['1 lô đẹp nhất', '10 lô', 'Mọi lô'], why: 'Với hàng xuất khẩu thì áp dụng luật chặt nhất.', s: 7 },
      { q: 'Tự đánh giá có phải tiêu chí xuất xưởng từng lô không?', c: 'Không, nó xác nhận hệ thống', w: ['Có, với mọi lô', 'Có, khi lô dưới E', 'Có, khi hàng xuất khẩu'], why: 'Mục tiêu tự đánh giá là 100%, rà từng điểm CP1 đến CP5.', s: 7 },
      { q: 'Bên gia công có bắt buộc dùng cùng cách tính mục tiêu không?', c: 'Không, miễn chứng minh được tuân thủ', w: ['Có, bắt buộc', 'Có, nếu cùng nước', 'Không, và không cần chứng minh'], why: 'Đưa yêu cầu và quyền kiểm tra vào hợp đồng.', s: 9 },
      { q: 'E = 100 g, M = 100,5 g, trung bình 101 g. Rót dư báo cáo trên cơ sở 0 là bao nhiêu?', c: '1 g (1% trên E)', w: ['0,5 g', '0 g', '1,5 g'], why: 'Rót dư là chênh giữa trung bình và E, không phải giữa trung bình và M.', s: 10 },
      { q: 'Lỗi nào sau đây là "dùng giới hạn tuỳ tiện"?', c: 'Lấy TU1 làm mục tiêu', w: ['Tính M theo luật nước bán', 'Theo dõi cả trung bình và Sp', 'Cập nhật M khi thêm thị trường'], why: 'Lấy TU1 làm mục tiêu, hoặc chỉ theo trung bình mà bỏ Sp, đều là lỗi thường gặp.', s: 12 },
      { q: 'Thứ tự đúng của lộ trình giảm rót dư?', c: 'Đo đúng, giữ quy trình, giảm biến thiên, hạ mục tiêu', w: ['Hạ mục tiêu, đo đúng, giảm biến thiên, giữ quy trình', 'Lắp checkweigher, hạ mục tiêu, đo đúng, giữ quy trình', 'Giữ quy trình, hạ mục tiêu, đo đúng, giảm biến thiên'], why: 'Hạ mục tiêu là bước cuối, sau khi đã tính lại Sref, M.', s: 11 }
    ]
  }
];
