const calculatePayCheck = (payAmount, frequency) => {

    var percentage = 0;
    var fica = 0.0765;

    if (payAmount <= 9525) {
        percentage = 10;
    } else if (payAmount <= 38700) {
        percentage = 12;
    } else if (payAmount <= 82500) {
        percentage = 22;
    } else if (payAmount <= 157500) {
        percentage = 24;
    } else if (payAmount <= 200000) {
        percentage = 32;
    } else if (payAmount <= 500000) {
        percentage = 35;
    } else if (payAmount < 500001) {
        percentage = 37;
    }

    percentage = percentage / 100;
    var difference = payAmount * percentage;
    var takeHome = (payAmount - difference) - (payAmount * fica);
    var takeHomePercentage = (takeHome / payAmount) * 100;
    var array = [
        {type: 'Take-Home', amount: parseInt(takeHome.toFixed(0)), percentage: takeHomePercentage},
        {type: 'Taxes', amount: Math.round(difference), percentage: percentage * 100},
        {type: 'FICA', amount: Math.round(payAmount * fica), percentage: fica * 100}
    ]

    for (let i = 0; i<array.length; i++) {
        var type = array[i];
        if (frequency === 'daily') {
            type.amount = (type.amount / 52) / 5;
        } else if (frequency === 'bi-weekly') {
            type.amount = type.amount / 26
        }
        else if (frequency === 'weekly') {
            type.amount = type.amount / 52
        }
        else if (frequency === 'monthly') {
            type.amount = type.amount / 12
        }
        type.amount = Math.round(type.amount);
    }

    return array;

};

export default calculatePayCheck;