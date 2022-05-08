let ourCanvas = $("#ourChart");

const chartElement = new Chart(ourCanvas, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Fact data',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderWidth: 1,
                borderRadius: 7,
                borderColor: 'rgba(54, 162, 235, 0.9)'
            },
            {
                label: 'Predict data',
                data: [],
                backgroundColor: 'rgba(255,223,0,0.4)',
                borderWidth: 1,
                borderRadius: 7,
                borderColor: 'rgba(255,223,0,0.9)'
            }
        ]
    }
});


function getData()
{
    $.ajax({
        url: '/get_data',
        type: 'POST',
        dataType: 'json',
        data: {
            key: '8jdfsd98sdfsd87'
        },
        success: function (data) {
            let years = [];
            let fact_data = [];
            let predict_data = [];
            for (let idx in data) {
                years.push(data[idx]['dt']);
                fact_data.push(data[idx]['income_fact']);
                predict_data.push(data[idx]['income_prediction']);
            }
            chartElement.data.labels = years;
            chartElement.data.datasets[0].data = fact_data;
            chartElement.data.datasets[1].data = predict_data;
            chartElement.update();
        },
        error: function(jqxhr, status, errorMsg) {
            console.log('Ошибка при взаимодействии с сервером: '+errorMsg);
        }
    });
}

// Код, который выполняется после того, как страница загрузилась
$(function() {
    getData();
    setInterval(
        () => {
            getData();
        },
        1 * 1000
    );

});