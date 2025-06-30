
// khoi tao va bat dau slide tu dong
let slideIndex = 0; // slideIndex = 0: Bắt đầu từ slide đầu tiên (tạm thời 0, vì trong hàm sẽ tăng lên 1 ngay).
showSlidesAuto(); // Gọi hàm để hiển thị slideshow tự động ngay khi trang tải.

function showSlidesAuto() { //Hàm chạy slideshow tự động
    let slides = document.getElementsByClassName('mySlides fade'); // Lấy danh sách tất cả các slide và dot trong trang.
    let dots = document.getElementsByClassName('dot'); // Lấy danh sách tất cả các slide và dot trong trang.

    if (slides.length === 0) return; // Nếu không có slide nào, thoát ra luôn để tránh lỗi.
    for (let i = 0; i < slides.length; i++) {  //Ẩn tất cả các slide.
        slides[i].style.display = 'none';
    }
    slideIndex++; //Tăng slide hiện tại lên 1.
    if (slideIndex > slides.length) { slideIndex = 1; } // Nếu đang ở slide cuối cùng thì quay về slide đầu tiên (vòng lặp).

    for (let i = 0; i < dots.length; i++) { // Xóa class active của tất cả các dot.
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block'; //Hiển thị slide hiện tại.
    if (dots.length > 0) { // Thêm class active vào dot tương ứng với slide đang hiển thị.
        dots[slideIndex - 1].className += ' active';
    }
    setTimeout(showSlidesAuto, 3000); // Tự động chuyển slide sau 3 giây
}

// Chuyển slide thủ công bằng nút (next/prev)
function plusSlides(n) {
    slideIndex += n; //Khi bấm nút, slide hiện tại sẽ tăng hoặc giảm tùy theo n (next: n = 1, prev: n = -1).
    if (slideIndex > document.getElementsByClassName('mySlides fade').length) { //Nếu vượt slide cuối thì quay về slide đầu.
        slideIndex = 1;
    }
    if (slideIndex < 1) { // Nếu lùi quá slide đầu thì nhảy về slide cuối.
        slideIndex = document.getElementsByClassName('mySlides fade').length;
    }
    showSlidesManual(slideIndex); // Gọi hàm showSlidesManual để hiển thị đúng slide theo yêu cầu.
}

//  Chuyển slide thủ công bằng chấm tròn
function currentSlide(n) {
    slideIndex = n; // Khi bấm vào một dot, chuyển slide trực tiếp tới slide số n.
    showSlidesManual(slideIndex); //Gọi hàm showSlidesManual để hiển thị slide đã chọn.
}

// Hiển thị slide khi chuyển thủ công
function showSlidesManual(n) {
    let slides = document.getElementsByClassName('mySlides fade'); //Lấy danh sách các slide và dot.
    let dots = document.getElementsByClassName('dot');
    if (slides.length === 0) return; // Nếu không có slide thì thoát ra luôn.
    for (let i = 0; i < slides.length; i++) {//Ẩn tất cả slide.
        slides[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) { //Xóa class active của tất cả các dot.
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[n - 1].style.display = 'block'; // Hiển thị đúng slide thủ công vừa chọn.
    if (dots.length > 0) { // Thêm class active vào dot tương ứng.
        dots[n - 1].className += ' active';
    }
}

// b11. Hiển thị phân trang
function hienThiPhanTrang(danhsach) {
    const phanTrang = document.getElementById('phantrang');
    phanTrang.innerHTML = '';

    let totalPages = Math.ceil(danhsach.length / itemsPerPage);

    if (totalPages <= 1) return;

    phanTrang.innerHTML += `<button onclick="chuyenTrang(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Lùi lại</button>`;

    for (let i = 1; i <= totalPages; i++) {
        phanTrang.innerHTML += `<button onclick="chuyenTrang(${i})" ${currentPage === i ? 'style="background-color: #4CAF50;"' : ''}>${i}</button>`;
    }

    phanTrang.innerHTML += `<button onclick="chuyenTrang(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Tiếp</button>`;
}

// b12. Chuyển trang
function chuyenTrang(trang) {
    const totalPages = Math.ceil(danhSachDangHienThi.length / itemsPerPage);

    if (trang < 1 || trang > totalPages) return;

    currentPage = trang;
    hienThiSanPham(danhSachDangHienThi, currentPage);
}