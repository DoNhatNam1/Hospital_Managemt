
var array = [];
var array_length = 0;
var table_size = 10;
var start_index = 1;
var end_index = 0;
var current_index = 1;
var max_index = 0;
var tabFilterClicked = false;
var subTabFilterClicked = false;

// function fetchDataWhenBackEndIsBad() {
//     fetch('http://localhost:3001/api/nganhang/getall')
//         .then(response => response.json())
//         .then(data => {
//             updateUIWhenBackEndIsBad(data);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }
// function updateUIWhenBackEndIsBad(data) {
//     array = data;
//     array_length = array.length;
//     max_index = parseInt(array_length / table_size);

//     if ((array_length % table_size) > 0) {                
//         max_index++;
//     }

//     displayIndexButtons();
// }


function updateUI() {
    // Update the array with new data
    array_length = array.length;
    max_index = parseInt(array_length / table_size);

    if ((array_length % table_size) > 0) {                
        max_index++;
    }

    displayIndexButtons();
}

function preLoadCalculations() {
    fetch('http://localhost:3001/api/nganhang/getall')
        .then(response => response.json())
        .then(data => {
            // Lọc dữ liệu dựa trên trường tab_filter_input khi nhấp vào nút tab_filter_btn
            if(!tabFilterClicked && !subTabFilterClicked){
                array = data;
            }
            if (tabFilterClicked) {
                var tab_filter_input = $("#tab_filter_input").val();
                var temp_array = data.filter(function(object){
                    return object.TenNganHang.toUpperCase().includes(tab_filter_input.toUpperCase())
                        || object.id.toUpperCase().includes(tab_filter_input.toUpperCase());
                });
                array = temp_array;
            }
            // Lọc dữ liệu dựa trên các trường sub_tab_filter_input_id, tab_filter_input_name, tab_filter_select khi nhấp vào nút sub_tab_filter_btn
            else if (subTabFilterClicked) {
                var tab_filter_input_id = $("#tab_filter_input_id").val();
                var tab_filter_input_name = $("#tab_filter_input_name").val();
                var tab_filter_select = $("#tab_filter_select").val();

                var temp_array = data.filter(function(object){
                    return object.TenNganHang.toUpperCase().includes(tab_filter_input_name.toUpperCase())
                        && object.id.toUpperCase().includes(tab_filter_input_id.toUpperCase())
                        && object.Status === tab_filter_select;
                });
                array = temp_array;
            }

            array_length = array.length;
            max_index = parseInt(array_length / table_size);

            if ((array_length % table_size) > 0) {                
                max_index++;
            }

            displayIndexButtons();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayIndexButtons() {
    $(".index_buttons button").remove();
    $(".index_buttons").append('<button onclick="prev();" class="btn btn-outline-secondary rounded-right-0">Trước</button>');

    for (var i = 1; i <= max_index; i++) {
        $(".index_buttons").append(`<button onclick="indexPagination(${i})" class="btn btn-outline-primary rounded-x-0" index="${i}">${i}</button>`);
    }
    $(".index_buttons").append('<button onclick="next();" class="btn btn-outline-secondary rounded-left-0">Sau</button>');
    highLightIndexButton();
}

function highLightIndexButton() {
    start_index = ((current_index - 1) * table_size) + 1;
    end_index = (start_index + table_size) - 1;
    if (end_index > array_length) {
        end_index = array_length;
    }

    $(".footer_span").text(`Hiện đang hiển thị ${start_index} - ${end_index} trong ${array_length}`);
    $(".index_buttons button").removeClass("active");
    $(`.index_buttons button[index='${current_index}']`).addClass('active');

    displayTableRow();
}

function displayTableRow() {
    $(".tbodycl tr").remove();
    var tab_start = start_index - 1;
    var tab_end = end_index;
    for (var i = tab_start; i < tab_end; i++) {
        var nganhang = array[i];
        var tr = '<tr>' +
                 '<td>' + nganhang['TenNganHang'] + '</td>' +
                 '<td>' + nganhang['id'] + '</td>' +
                 '<td><div class="d-flex gap-2 justify-content-center"><button class="btn btn-primary">Sửa</button><button class="btn btn-danger">Xoá</button></div></td>' +
                 '</tr>';

        $(".tbodycl").append(tr);
    }
}

function next() {
    if (current_index < max_index) {
        current_index++;
        highLightIndexButton();
    }
}

function prev() {
    if (current_index > 1) {
        current_index--;
        highLightIndexButton();
    }
}

function indexPagination(index) {
    current_index = index;
    highLightIndexButton();
}

$("#table_size").on("change", function(){
    table_size = parseInt($(this).val());
    current_index = 1;
    start_index = 1;
    preLoadCalculations();
});

$("#tab_filter_btn").on("click", function(){
    tabFilterClicked = true;
    subTabFilterClicked = false;
    current_index = 1;
    start_index = 1;
    preLoadCalculations();
});

// Thêm sự kiện click cho nút "Tìm kiếm" sub_tab_filter_btn
$("#sub_tab_filter_btn").on("click", function(){
    tabFilterClicked = false;
    subTabFilterClicked = true;
    current_index = 1;
    start_index = 1;
    preLoadCalculations();

    $(".dropdown-menu").removeClass("show");
});

// Thêm sự kiện click cho nút "Lưu" trong modal
$("#btn_submit_model").on("click", function(){
    var input_submit_id = $("#input_submit_id");
    var input_submit_name = $("#input_submit_name");

    // Kiểm tra xem cả hai input đã được nhập đủ hay không
    if (input_submit_id.val().trim() === '' || input_submit_name.val().trim() === '') {
        $("#error_message").text("Vui lòng nhập đủ thông tin Mã ngân hàng và Tên ngân hàng.");
        return;
    }

    fetch('http://localhost:3001/api/nganhang/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            id: input_submit_id.val(), 
            TenNganHang: input_submit_name.val() 
        }),
    })
    .then(async response => {
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        return response.json();
    })
    .then((data) => {
        alert("Dữ liệu đã được thêm thành công!");
        $("#exampleModal").modal("hide");
        input_submit_id.val('');
        input_submit_name.val('');

        // Trường hợp xử lý dữ liệu đầu vào api của backend tốt ta sẽ xử lý như sau:
        let insertIndex = array.findIndex(item => item.id > data.id);
        if (insertIndex === -1) {
            array.push({ id: data.id, TenNganHang: data.TenNganHang });
        } else {
            array.splice(insertIndex, 0, { id: data.id, TenNganHang: data.TenNganHang });
        }
        updateUI();

        // Trường hợp xử lý dữ liệu đầu vào api của backend xấu ta sẽ xử lý như sau:
        // fetchDataWhenBackEndIsBad();
    })
    .catch(error => {
        alert(error.message);
        input_submit_id.val('');
        input_submit_name.val('');
    });
});


// Main Script Runner
preLoadCalculations();

document.addEventListener('DOMContentLoaded', function() {
    function adjustModalBody() {
        var modalBody = document.querySelector('#exampleModal .modal-body');
        var modalDialog = document.querySelector('#exampleModal .modal-dialog');

        if (window.innerWidth < 720) {
            modalBody.classList.add('flex-column');
            modalDialog.style.maxWidth = '';
        } else {
            modalBody.classList.remove('flex-column');
            modalDialog.style.maxWidth = '700px';
        }
    }

    // Run on initial load
    adjustModalBody();

    // Run on window resize
    window.addEventListener('resize', function() {
        adjustModalBody();
    });
});
