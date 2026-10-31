// Chuyển ký hiệu thành lời đọc, cùng bảng với slides/deck.js
var SAY = [
  [/\bSref\b/g, 'ét tham chiếu'], [/\bSlim\b/g, 'ét giới hạn'], [/\bSDtare\b/g, 'độ lệch chuẩn bì'], [/\bSpi\b/g, 'ét pê tích luỹ'],
  [/\bM0\b/g, 'em không'], [/\bMi\b/g, 'em tích luỹ'], [/\bSp\b/g, 'ét pê'], [/\bSm\b/g, 'ét em'], [/\bTU1\b/g, 'tê u một'], [/\bTU2\b/g, 'tê u hai'],
  [/\bTO1\b/g, 'tê ô một'], [/\bTNE\b/g, 'tê en e'], [/\bPT1\b/g, 'pê tê một'], [/\bPE\b/g, 'pê e'], [/\bUn\b/g, 'u en'], [/\bUa\b/g, 'u a'], [/\bCP(\d)/g, 'điểm kiểm soát $1'],
  [/\bCL\b/g, 'giới hạn kiểm soát'], [/\bWL\b/g, 'giới hạn cảnh báo'], [/\bUCL\b/g, 'giới hạn trên'], [/\bSPC\b/g, 'ét pê xê'], [/\bMoD\b/g, 'phương pháp sai khác'],
  [/\bOIML\b/g, 'ô i em eo'], [/\bNIST\b/g, 'ni xờ tờ'], [/\bWELMEC\b/g, 'quen méc'], [/\bBOM\b/g, 'định mức'], [/\bCW\b/g, 'xê vê'], [/\bSD\b/g, 'độ lệch chuẩn'], [/\bEU\b/g, 'ê u'], [/\bQMS\b/g, 'hệ thống chất lượng'],
  [/\bOCAP\b/g, 'ô cáp'], [/\bFTR\b/g, 'ép tê e rờ'], [/\bMES\b/g, 'em e ét'], [/\bDMAIC\b/g, 'đê mai xê'], [/\bATS\b/g, 'a tê ét'], [/√/g, ' căn bậc hai của '], [/χ²/g, 'khi bình phương'], [/−/g, ' trừ '], [/±/g, ' cộng trừ '],
  [/\bPPE\b/g, 'pi pi i'], [/\bSDS\b/g, 'ét đi ét'], [/\bGMP\b/g, 'gi em pi'], [/\bFEFO\b/g, 'phe phô'],
  [/\bFIFO\b/g, 'phai phô'], [/\bKPI\b/g, 'kê pi ai'], [/\bQA\b/g, 'kiu ây'], [/\bCAPA\b/g, 'ca pa'], [/\bATTP\b/g, 'an toàn thực phẩm'],
  [/\bISPM\b/g, 'i ét pê em'], [/\bVD:/g, 'Ví dụ:'], [/\b5S\b/g, 'năm ét'], [/\b3K\b/g, 'ba ca'],
      [/(\d)\s*°C/g, '$1 độ C'], [/(\d)\s*°/g, '$1 độ'], [/(\d)\s*m²/g, '$1 mét vuông'], [/(\d)\s*mm\b/g, '$1 mi li mét'],
  [/(\d)\s*cm\b/g, '$1 xen ti mét'], [/(\d)\s*km\b/g, '$1 ki lô mét'], [/(\d)\s*ml\b/g, '$1 mi li lít'],
  [/(\d)\s*g\b/g, '$1 gam'], [/(\d)\s*m\b/g, '$1 mét'], [/(\d)\s*h\b/g, '$1 giờ'], [/(\d)\s*nm\b/g, '$1 na nô mét'],
  [/\bRH\b/g, 'độ ẩm tương đối'], [/½/g, 'nửa'],
  [/(\d)\s*[–-]\s*(\d)/g, '$1 đến $2'], [/(\d),(\d)/g, '$1 phẩy $2'],
  [/≥/g, ' từ '], [/≤/g, ' không quá '], [/≠/g, ' khác '], [/×/g, ' nhân '], [/~/g, 'khoảng '],
  [/>/g, ' trên '], [/</g, ' dưới '], [/→/g, ', '], [/&/g, ' và '], [/=/g, ' bằng '],
  [/(\d)\s*\/\s*(\d)/g, '$1 trên $2'], [/(\d)\s*\/\s*(\p{L})/gu, '$1 mỗi $2'], [/\s\/\s(?=\d)/g, ' trên '],
  [/\s\/\s/g, ' hoặc '], [/(\p{L})\/(\d)/gu, '$1 trên $2'], [/(\p{L})\/(\p{L})/gu, '$1 mỗi $2'],
  [/[✗✓·•]/g, ', '], [/“|”|"/g, '']
];
function normalize(t) {
  SAY.forEach(function (p) { t = t.replace(p[0], p[1]); });
  return t.replace(/\s*,\s*,/g, ',').replace(/\s+/g, ' ').trim();
}
