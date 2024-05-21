function displayResult(input) {
    let result = fetchDataFromApi[0]().then(data => {
        return data.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
    });

    result.then(filteredData => {
        let content = filteredData.map(data => {
            return `<li class="list-none rounded-sm py-4 cursor-pointer hover:bg-blue-50" onclick="selectItem('${data.name}')">${data.name}</li>`;
        });
        resultsBox.innerHTML = `<ul class="bg-gray-200 rounded-lg px-3">${content.join('')}</ul>`;
    });
}

const fetchDataFromApi = [
    () => {
        return fetch('http://localhost:3001/api/nhanvien/getall', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json());
    }
]

const resultsBox = document.getElementById('result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function(){
    let input = inputBox.value.toLowerCase();
    fetchDataFromApi[0]().then(data => {
        let result = data.filter(item => item.name.toLowerCase().includes(input));
        console.log(result);
        display(result);
    });
}

function display(result) {
    const content = result.map(data => {
        const formattedNgaySinh = new Date(data.NgaySinh).toLocaleDateString('en-GB');
        return `<li class="list-none rounded-sm py-4 cursor-pointer hover:bg-blue-50" onclick="selectItem('${data.id}')">
        <div className='w-full h-full space-y-4'>
            <div className='flex justify-center translate-x-6'>
                <h2 className='w-full text-lg font-bold'>
                <span>Tên BHXH:</span>
                <span>${data.name}</span>
                </h2>
            </div>

            <div className='space-y-1'>
                <div className='flex gap-2'>
                    <span>Mã BHXH:</span>
                    <span>${data.id}</span>
                </div>

                <div className='flex gap-2'>
                    <span>Ngày sinh:</span>
                    <span>${formattedNgaySinh}</span>
                </div>
            </div>
        </li>`;
    });
    resultsBox.innerHTML = `<ul class="bg-gray-200 rounded-lg px-3 overflow-y-scroll max-h-[100px]">${content.join('')}</ul>`;
}

function selectItem(name) {
    inputBox.value = name;
    resultsBox.innerHTML = ''; // Clear the results box after selection
}