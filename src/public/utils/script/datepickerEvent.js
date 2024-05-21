    
    
    // Set default value for the Ngày sinh input field
    // document.getElementById('date-birth').value = '';

    function logNgaySinhAndAlert() {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateInput = document.getElementById('date-birth');
        const userDateTime = new Date(dateInput.value);
        const deviceTimeZone = new Date().toLocaleString('en-US', { timeZone: userTimeZone, timeZoneName: 'short' });

        const convertdeviceTimeZone = deviceTimeZone.slice(26, 32)
        const convertdeviceTimeZone_Hour = parseInt(convertdeviceTimeZone.slice(0, 2))
        const convertdeviceTimeZone_Minute = parseInt(convertdeviceTimeZone.slice(3, 6))

        const date1 = new Date('2023-05-21');
        const date2 = new Date('2024-06-01');
        
        if (date1 > date2) {
            console.log('Ngày 1 lớn hơn Ngày 2');
            console.log('data1: ' + date1);
            console.log('data2: ' + date2);
        } else if (date1 < date2) {
            console.log('Ngày 1 nhỏ hơn Ngày 2');
            console.log('data1: ' + date1);
            console.log('data2: ' + date2);
        } else {
            console.log('Ngày 1 bằng Ngày 2');
            console.log('data1: ' + date1);
            console.log('data2: ' + date2);
        }

        // Convert to seconds with DeviceTimeZome
        const deviceTimeZoneSeconds = convertdeviceTimeZone_Hour * 60 * 60 + convertdeviceTimeZone_Minute * 60

        // Convert to seconds with VietNamTimeZone
        
        if (userTimeZone !== 'Asia/Saigon') {
            // SaiGon Format
            const saigonDateTime = userDateTime.toLocaleString('en-US', { timeZone: 'Asia/Saigon' });
            const sgYear = String(saigonDateTime.slice(5, 9));
            console.log('Saigon Year:', sgYear);

            
            const sgMonth = String(saigonDateTime.slice(0, 1));
            console.log('Saigon Month:', sgMonth);
            
            const sgDay = String(saigonDateTime.slice(2, 4));
            console.log('Saigon Day:', sgDay);
            const sgHours = String(saigonDateTime.slice(11, 12));
            const sgMinutes = String(saigonDateTime.slice(13, 15));
            const checkDayOrNightTime = String(saigonDateTime.slice(2, 4));
            
            // Giờ vấn đề sẽ là, nếu tháng từ 10-12 thì sẽ lỗi, ta sẽ cho vòng lặp if kép nha
            let formattedDateTimeSGISO;
            if (sgMonth === '1') {
                let sgMonthToCheckifMonthIsTwoNumber = String(saigonDateTime.slice(0, 2));
            
                if (sgMonthToCheckifMonthIsTwoNumber === '10' || sgMonthToCheckifMonthIsTwoNumber === '11' || sgMonthToCheckifMonthIsTwoNumber === '12') {
                    formattedDateTimeSGISO = `${sgYear}-${sgMonthToCheckifMonthIsTwoNumber}-${sgDay}T${sgHours}:${sgMinutes}`;
                } else {
                     formattedDateTimeSGISO = `${sgYear}-0${sgMonth}-${sgDay}T${sgHours}:${sgMinutes}`;
                }
                console.log('Saigon Date Time convert with month > 10:', formattedDateTimeSGISO);
                console.log('Saigon Date Time:', saigonDateTime);
            } else {
                formattedDateTimeSGISO = `${sgYear}-0${sgMonth}-${sgDay}T${sgHours}:${sgMinutes}`;
                console.log('Saigon Date Time convert with month < 10:', formattedDateTimeSGISO);
                console.log('Saigon Date Time:', saigonDateTime);
            }

            // DatePicker input format
            const year = userDateTime.getFullYear();
            const month = String(userDateTime.getMonth() + 1).padStart(2, '0');
            const day = String(userDateTime.getDate()).padStart(2, '0');
            const hours = String(userDateTime.getHours()).padStart(2, '0');
            const minutes = String(userDateTime.getMinutes()).padStart(2, '0');
            const formattedDateTimeISO = `${year}-${month}-${day}T${hours}:${minutes}`;

            console.log('User Date Time SGISO:', userTimeZone);
            console.log('User Converted Date Time:', formattedDateTimeISO);
            console.log('deviceTimeZone:', deviceTimeZone);
            console.log('convertdeviceTimeZone_Hour:', convertdeviceTimeZone_Hour);
            console.log('convertdeviceTimeZone_Minute:', convertdeviceTimeZone_Minute);
            // Use the formattedDateTimeISO value as needed
            dateInput.value = formattedDateTimeISO; // Update the input field value after submission
        }
        alert('Submit thành công!');
    }

    document.querySelector('button.bg-blue-800').addEventListener('click', function(event) {
        event.preventDefault();
        logNgaySinhAndAlert();
    });

    dateInput.addEventListener('input', function() {
        if (this.value.length === 2 && this.value[0] === '0') {
            this.value = this.value[1];
        }
    });

    