export function PrintFormatter(data) {
    var str = "";
    data.itemsList.forEach(element => {
        str += element.name + " " + element.quantity + " " + element.quantityType + "\n";
    });
    return str;
}