function createMundusTable() {
	var header = 
        "<table>" +
        "    <tr>" +
        "        <th>Level</th>" +
        "        <th>The Lady</br> The Lover</th>" +
        "        <th>The Mage</br> The Tower</th>" +
        "        <th>The Lord</th>" +
        "        <th>The Apprentice</br> The Warrior</th>" +
        "    </tr>";
	var body = "";

	for (var i = 1; i <= 50; i++) {
    	body += "<tr>";
        body += "<td>" + i + "</td>";
        body += "<td>" + 30 * i + "</td>";
        body += "<td>" + 20 * i + "</td>";
        body += "<td>" + Math.floor(20 * i * 1.1) + "</td>";
        body += "<td>" + Math.floor(2.54 * i) + "</td>";
        body += "</tr>";
    }

	for (var i = 1; i <= 16; i++) {
    	var vr = i + 50;
    	body += "<tr>";
        body += "<td>VR" + i + "</td>";
        body += "<td>" + 30 * vr + "</td>";
        body += "<td>" + 20 * vr + "</td>";
        body += "<td>" + Math.floor(20 * vr * 1.1) + "</td>";
        body += "<td>" + Math.floor(2.54 * vr) + "</td>";
        body += "</tr>";
    }
    
    var footer = "</table>";
    document.getElementById('mundus-table').innerHTML = header + body + footer;
}