
const dateInput = document.getElementById('dateInput');

dateInput.addEventListener('input', function(event) {
    let input = event.target.value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
    let day = input.substring(0, 2);
    let month = input.substring(2, 4);
    let year = input.substring(4, 8);

    // Kiểm tra và hạn chế giá trị ngày, tháng, năm
    day = day.length === 2 ? day : day.replace(/^0+/, ''); // Loại bỏ số 0 ở đầu nếu có
    month = month.length === 2 ? month : month.replace(/^0+/, ''); // Loại bỏ số 0 ở đầu nếu có

    // Format lại giá trị nhập vào thành dạng "dd/mm/yyyy"
    if (input.length > 4) {
        event.target.value = `${day}/${month}/${year}`;
    } else if (input.length > 2) {
        event.target.value = `${day}/${month}`;
    } else {
        event.target.value = `${day}`;
    }

    // Kiểm tra nếu giá trị nhập vào rỗng, thì đặt lại placeholder và xóa số 0 không cần thiết
    if (event.target.value === '') {
        event.target.placeholder = 'dd/mm/yyyy';
    } else {
        event.target.placeholder = '';
    }
});

dateInput.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        event.preventDefault();
        let currentValue = dateInput.value;
        dateInput.value = currentValue.substring(0, currentValue.length - 1);
    }
});

 function submitData() {
    const fullName = document.getElementById('fullName').value; // Lấy giá trị Tên nhân viên từ trường input
    const dateValue = dateInput.value;


            // fetch('http://localhost:3001/api/nhanvien/create', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         name: fullName,
            //         NgaySinh: convertedDateTime 
            //     })
            // })
            // .then(data => {
            //     console.log(data);
            //     alert('Submit thành công!');
            // })
            // .catch((e) => {
            //     console.log(e)
            // });
            // });
            console.log('Dữ liệu ngày tháng: ', dateValue);
            alert('Submit thành công!');

        }



// Gọi hàm submitData khi người dùng thực hiện hành động cần submit dữ liệu
document.querySelector('button.bg-blue-800').addEventListener('click', function(event) {
    event.preventDefault();
    submitData();
});