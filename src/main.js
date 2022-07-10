const str = `Ще не вмерла Україна, і слава, і воля.
             Ще нам, браття молодії, усміхнеться доля. 
             Згинуть наші вороженьки, як роса на сонці. 
             Запануєм і ми, браття, у своїй сторонці. 
             Душу й тіло ми положим за нашу свободу. 
             І покажем, і ми, браття, козацького роду.`
const str2 = "і ми"
const getSentense = (someText, searchSentense) => {
    const sentenseArray = someText.split('. ');
    const result = [];
    for(let i = 0; i < sentenseArray.length; i++) {
        if(sentenseArray[i].includes(searchSentense)){
            result.push(sentenseArray[i].trim());
        }
    }
    return result;
}

console.log(getSentense(str, str2));






const factory = new Promise((res) => {
    const car = {};
    console.log("Створюємо автомобіль");
    res(car);
})

factory.then((car) => {
    return new Promise((res) => {
        car.carFrameRange = {
            length: 3300,
            width: 1500,
            height: 1300 
        } 
        setTimeout(() => {
            console.log(`Каркас створено - ${car}`);
        }, 1000)
        res(car);
    })
})
.then((car) => {
    return new Promise((res) => {
        car.motor = 1.6;
        setTimeout(() => {
            console.log(`Добавлено двигун з силою ${car.motor}`);
        }, 1000);
        res(car);
    })
})
.then((car) => {
    return new Promise((res) => {
        car.undercarriage = "4 колеса";
        setTimeout(() => {
            console.log(`Добавлена ходова частина в виді - ${car.undercarriage}`);
        }, 1000)
        res(car);
    })
})
.then(car => {
    return new Promise( res => {
        car.carSeats = "4 сидіння";
        setTimeout(() => {
            console.log(`В автомобіль добавлено ${car.carSeats}`);
        }, 1000);
        res(car);
    })
})
.then(car => {
    return new Promise (res => {
        car.color = "#ccc";
        setTimeout(() => {
            console.log("Створення автомобіля завершено");
        }, 1000)
        res(car);
    })
})


