function SinhVien(id, hoten, ngaysinh, gioitinh, lop) {
    this.id = id;
    this.hoten = hoten;
    this.ngaysinh = ngaysinh;
    this.gioitinh = gioitinh;
    this.lop = lop;
}

const danhsachsinhvien = [];
let indexSinhVienHienTai = undefined;
const sv = new SinhVien('001', 'Nguyễn Ngọc Bảo Hân', '2002-02-02', 'Nữ', 'C01');
danhsachsinhvien.push(sv);
danhsachsinhvien.push(new SinhVien('002', 'Nguyễn Thanh Tùng', '2002-03-02', 'Nam', 'C01'));
danhsachsinhvien.push(new SinhVien('003', 'Nguyễn Văn A', '2002-02-02', 'Nam', 'C01'));
danhsachsinhvien.push(new SinhVien('004', 'Nguyễn Văn B', '2002-02-02', 'Nam', 'C01'));
danhsachsinhvien.push(new SinhVien('005', 'Nguyễn Thị A', '2002-02-02', 'Nữ', 'C01'));
danhsachsinhvien.push(new SinhVien('006', 'Nguyễn Thị B', '2002-02-02', 'Nữ', 'C02'));
danhsachsinhvien.push(new SinhVien('007', 'Nguyễn Văn C', '2002-02-02', 'Nam', 'C02'));
danhsachsinhvien.push(new SinhVien('008', 'Nguyễn Văn D', '2002-02-02', 'LGBT', 'C02'));
danhsachsinhvien.push(new SinhVien('009', 'Nguyễn Văn E', '2002-02-02', 'LGBT', 'C03'));
danhsachsinhvien.push(new SinhVien('010', 'Nguyễn Văn F', '2002-02-02', 'Nam', 'C03'));
danhsachsinhvien.push(new SinhVien('011', 'Nguyễn Văn G', '2002-02-02', 'Nam', 'C04'));
danhsachsinhvien.push(new SinhVien('012', 'Nguyễn Văn H', '2002-02-02', 'LGBT', 'C05'));
danhsachsinhvien.push(new SinhVien('013', 'Nguyễn Văn Tân', '2002-02-02', 'Nam', 'C05'));


function hienThiSinhVien (danhsach = danhsachsinhvien) {
    const dulieu = document.getElementById('dulieu');
    dulieu.innerHTML = '';
    for (let i = 0; i < danhsach.length; i++) {
        dulieu.innerHTML += `<tr>
                            <td>${danhsach[i].id}</td>
                            <td>${danhsach[i].hoten}</td>
                            <td>${danhsach[i].ngaysinh}</td>
                            <td>${danhsach[i].gioitinh}</td>
                            <td>${danhsach[i].lop}</td>
                            <td>
                                <button onclick="suaSinhVien(${i})">Sửa</button>
                                <button onclick="xoaSinhVien(${i})">Xoá</button>
                            </td>
                            </tr>`
    }
}

function xoaSinhVien(index) {
    if(confirm("Bạn có chắc chắn muốn xoá sinh viên này")) {
        danhsachsinhvien.splice(index, 1);
        hienThiSinhVien();
    }
}

function suaSinhVien(index) {
        indexSinhVienHienTai = index;
        document.getElementById("ID").value = danhsachsinhvien[index].id;
        document.getElementById("hoTen").value = danhsachsinhvien[index].hoten;
        document.getElementById("ngaySinh").value = danhsachsinhvien[index].ngaysinh;
        document.getElementById("nam").checked = danhsachsinhvien[index].gioitinh === "Nam";
        document.getElementById("nu").checked = danhsachsinhvien[index].gioitinh === "Nữ";
        document.getElementById("LGBT").checked = danhsachsinhvien[index].gioitinh === "LGBT";
        document.getElementById("Lop").value = danhsachsinhvien[index].lop;
}

function luuSinhVien() {
    const id = document.getElementById("ID").value;
    const hoten = document.getElementById("hoTen").value;
    const ngaysinh = document.getElementById("ngaySinh").value;
    const lop = document.getElementById("Lop").value;

    // xac dinh gioi tinh
    let gioitinh = "";
    if (document.getElementById("nam").checked) {
        gioitinh = "Nam"
    } else if (document.getElementById("nu").checked) {
        gioitinh = "Nữ"
    } else if (document.getElementById("LGBT").checked) {
        gioitinh = "LGBT"
    }

    if (indexSinhVienHienTai !== undefined) {
        // logic cap nhat sua
        danhsachsinhvien[indexSinhVienHienTai].id = id;
        danhsachsinhvien[indexSinhVienHienTai].hoten = hoten;
        danhsachsinhvien[indexSinhVienHienTai].ngaysinh = ngaysinh;
        danhsachsinhvien[indexSinhVienHienTai].gioitinh = gioitinh;
        danhsachsinhvien[indexSinhVienHienTai].lop = lop;
        if(confirm("Bạn có chắc chắn muốn lưu thông tin đã sửa"))
        indexSinhVienHienTai = undefined; // reset trang thai
    } else {
        // logic them moi
        if(id === '' || hoten === '' || ngaysinh === '' || gioitinh === '' || lop === '') {
            alert("Vui lòng nhập đầy đủ thông tin!")
            return;
        }
        danhsachsinhvien.push(new SinhVien(id, hoten, ngaysinh, gioitinh, lop));
    }
    hienThiSinhVien();
}
function timKiemSinhVien() {
    const tuKhoa = document.getElementById('timKiem').value.toLowerCase();
    const dulieu = document.getElementById('dulieu');
    dulieu.innerHTML = '';

    for (let i = 0; i < danhsachsinhvien.length; i++) {
        if(danhsachsinhvien[i].id.toLowerCase().includes(tuKhoa) || danhsachsinhvien[i].hoten.toLowerCase().includes(tuKhoa)) {
            dulieu.innerHTML += `<tr>
                            <td>${danhsachsinhvien[i].id}</td>
                            <td>${danhsachsinhvien[i].hoten}</td>
                            <td>${danhsachsinhvien[i].ngaysinh}</td>
                            <td>${danhsachsinhvien[i].gioitinh}</td>
                            <td>${danhsachsinhvien[i].lop}</td>
                            <td>
                                <button onclick="suaSinhVien(${i})">Sửa</button>
                                <button onclick="xoaSinhVien(${i})">Xoá</button>
                            </td>
                            </tr>`
        }
    }
}

function locSinhVien() {
    const lopChon = document.getElementById('chonlop').value;
    const gioiTinhChon = document.getElementById('chongioitinh').value;

    const ketqua = danhsachsinhvien.filter(sv => {
        const hopLop = lopChon === 'all' || sv.lop === lopChon;
        const hopGioiTinh = gioiTinhChon === 'all' || sv.gioitinh === gioiTinhChon;
        // lopChon === 'all' || sv.lop === lopChon: Nếu chọn "Tất cả" thì không lọc theo lớp, nếu chọn lớp cụ thể thì chỉ lọc lớp đó.
        // gioiTinhChon === 'all' || sv.gioitinh === gioiTinhChon: Tương tự cho giới tính.
        return hopLop && hopGioiTinh;
    });
    hienThiSinhVien(ketqua);
}

hienThiSinhVien();