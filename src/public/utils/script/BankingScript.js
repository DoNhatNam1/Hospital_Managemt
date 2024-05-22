
var array = [];
var array_length = 0;
var table_size = 10;
var start_index = 1;
var end_index = 0;
var current_index = 1;
var max_index = 0;

function preLoadCalculations() {

    fetch('http://localhost:3001/api/nganhang/getall')
        .then(response => response.json())
        .then(data => {
            array = data;
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

document.getElementById("table_size").addEventListener("change", function(){
    table_size = parseInt(this.value);
    current_index = 1;
    start_index = 1;
    preLoadCalculations();
});


// Main Script Runner
preLoadCalculations();
