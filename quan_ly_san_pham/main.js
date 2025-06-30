// b1. Tạo đối tượng sản phẩm
function SanPham(ma, ten, tien, loai, anh) {
    this.ma = ma;
    this.ten = ten;
    this.tien = tien;
    this.loai = loai;
    this.anh = anh;
}

// b2. Tạo danh sách sản phẩm
const danhsachsanpham = [];
let indexsanphamhientai = undefined;
let currentPage = 1;
const itemsPerPage = 5;
let danhSachDangHienThi = danhsachsanpham;

danhsachsanpham.push(new SanPham('001', 'Ghế sofa', '10,000,000', 'Phòng khách', 'img/ghe_sofa.jpg'));
danhsachsanpham.push(new SanPham('002', 'Bàn ăn', '5,000,000', 'Phòng ăn', 'img/ban_an.jpg'));
danhsachsanpham.push(new SanPham('003', 'Giường ngủ', '8,000,000', 'Phòng ngủ', 'img/giuong_ngu.jpg'));
danhsachsanpham.push(new SanPham('004', 'Tủ quần áo', '11,000,000', 'Phòng ngủ', 'img/tu_do.jpg'));
danhsachsanpham.push(new SanPham('005', 'Ghế sofa chữ L', '20,000,000', 'Phòng khách', 'img/ghe_sofa_L.jpg'));
danhsachsanpham.push(new SanPham('006', 'Tủ kệ Tivi', '3,000,000', 'Phòng khách', 'img/ke_tivi.jpg'));
danhsachsanpham.push(new SanPham('007', 'Bàn ăn basic', '6,000,000', 'Phòng ăn', 'img/ban_an_basic.jpg'));

hienThiSanPham();

// b3. Hiển thị sản phẩm
function hienThiSanPham(danhsach = danhsachsanpham, page = 1) {
    danhSachDangHienThi = danhsach;

    const dulieu = document.getElementById('dulieu');
    dulieu.innerHTML = '';
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let trangSanPham = danhsach.slice(start, end);

    for (let i = 0; i < trangSanPham.length; i++) {
        dulieu.innerHTML += `<tr>
            <td>${trangSanPham[i].ma}</td>
            <td>${trangSanPham[i].ten}</td>
            <td>${trangSanPham[i].tien}</td>
            <td>${trangSanPham[i].loai}</td>
            <td style="text-align: center"><img src="${trangSanPham[i].anh}" style="width: 100px;"></td>
            <td style="text-align: center">
                <button onclick="suaSanPham(${(page - 1) * itemsPerPage + i})">Sửa</button>
                <button onclick="xoaSanPham(${(page - 1) * itemsPerPage + i})">Xóa</button>
            </td>
        </tr>`;
    }
    hienThiPhanTrang(danhsach);
}

// b4. Đọc file ảnh và xem trước
document.getElementById('hinhanh').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('anhxemtruoc').src = e.target.result;
            document.getElementById('anhxemtruoc').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
})

// b5. Xóa sản phẩm
function xoaSanPham(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        danhsachsanpham.splice(index, 1);
    }
    hienThiSanPham(danhSachDangHienThi, currentPage);
}

// b6. Sửa sản phẩm
function suaSanPham(index) {
    indexsanphamhientai = index;
    document.getElementById('masanpham').value = danhsachsanpham[index].ma;
    document.getElementById('tensanpham').value = danhsachsanpham[index].ten;
    document.getElementById('giatien').value = danhsachsanpham[index].tien;
    document.getElementById('loai').value = danhsachsanpham[index].loai;
    document.getElementById('anhxemtruoc').src = danhsachsanpham[index].anh;
    document.getElementById('anhxemtruoc').style.display = 'block';
}

// b7. Lưu sản phẩm
function luuSanPham() {
    const ma = document.getElementById('masanpham').value;
    const ten = document.getElementById('tensanpham').value;
    const tien = document.getElementById('giatien').value;
    const loai = document.getElementById('loai').value;
    const anh = document.getElementById('anhxemtruoc').src;

    if (ma === '' || ten === '' || tien === '' || loai === '') {
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
        return;
    }

    if (indexsanphamhientai !== undefined) {
        danhsachsanpham[indexsanphamhientai].ma = ma;
        danhsachsanpham[indexsanphamhientai].ten = ten;
        danhsachsanpham[indexsanphamhientai].tien = tien;
        danhsachsanpham[indexsanphamhientai].loai = loai;
        danhsachsanpham[indexsanphamhientai].anh = anh;

        if (confirm('Bạn có chắc chắn muốn lưu thông tin đã sửa?')) {
            indexsanphamhientai = undefined;
        }
    } else {
        danhsachsanpham.push(new SanPham(ma, ten, tien, loai, anh));
    }

    hienThiSanPham(danhSachDangHienThi, currentPage);
    resetForm();
}

// b8. Reset form
function resetForm() {
    document.getElementById('masanpham').value = '';
    document.getElementById('tensanpham').value = '';
    document.getElementById('giatien').value = '';
    document.getElementById('loai').value = '';
    document.getElementById('hinhanh').value = '';
    document.getElementById('anhxemtruoc').style.display = 'none';
    document.getElementById('anhxemtruoc').src = '';
    indexsanphamhientai = undefined;
}

// b9. Tìm kiếm sản phẩm
function timKiemSanPham() {
    const tukhoa = document.getElementById('timkiem').value.toLowerCase();
    const ketqua = danhsachsanpham.filter(sp => {
        return sp.ma.toLowerCase().includes(tukhoa) || sp.ten.toLowerCase().includes(tukhoa);
    });

    currentPage = 1;
    hienThiSanPham(ketqua, currentPage);
}

// b10. Lọc sản phẩm
function locSanPham() {
    const loaichon = document.getElementById('chonloai').value;
    const ketqua = danhsachsanpham.filter(sp => {
        return loaichon === 'all' || sp.loai === loaichon;
    });

    currentPage = 1;
    hienThiSanPham(ketqua, currentPage);
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

// b13. Slideshow tự động
let slideIndex = 0;
showSlidesAuto();

function showSlidesAuto() {
    let slides = document.getElementsByClassName('mySlides fade');
    let dots = document.getElementsByClassName('dot');

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[slideIndex - 1].style.display = 'block';
    if (dots.length > 0) {
        dots[slideIndex - 1].className += ' active';
    }

    setTimeout(showSlidesAuto, 3000);
}

// b14. Chuyển slide thủ công
function plusSlides(n) {
    slideIndex += n;
    let slides = document.getElementsByClassName('mySlides fade');
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }
    showSlidesManual(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlidesManual(slideIndex);
}

function showSlidesManual(n) {
    let slides = document.getElementsByClassName('mySlides fade');
    let dots = document.getElementsByClassName('dot');

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[n - 1].style.display = 'block';
    if (dots.length > 0) {
        dots[n - 1].className += ' active';
    }
}
